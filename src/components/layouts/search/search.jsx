import { useState, useEffect } from 'react';
import * as API from '../../../constants/api';
import axios from 'axios';
import { toastAlertFail } from '../../../utils/helperFn';
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@mui/material/Box';

export default function Search({
  selectedBranchHotel,
  handleBranchHotel,
  branches,
}) {
  return (
    <FormControl fullWidth>
      <InputLabel>Select Destination</InputLabel>
      <Select
        value={selectedBranchHotel ? selectedBranchHotel.id : ''}
        label="Select Hotel"
        onChange={(event) => handleBranchHotel(event.target.value)}
      >
        {branches ? (
          branches.map((branch) => (
            <MenuItem key={branch.id} value={branch.id}>
              {branch.name}
            </MenuItem>
          ))
        ) : (
          <CircularProgress />
        )}
      </Select>
    </FormControl>
  );
}
