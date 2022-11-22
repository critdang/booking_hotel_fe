import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Button, Grid } from '@mui/material';
import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import moment from 'moment';
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const theme = createTheme();
const initialState = {
  From: moment(new Date()).format('MM/DD/YYYY'),
  To: moment(new Date()).add(1, 'days').format('MM/DD/YYYY'),
  room: '1 Room',
  adult: '1 Adult',
  kids: '1 Kid',
};

export default function SearchRoom() {
  const navigate = useNavigate();
  let [searchParams, setSearchParams] = useSearchParams();

  const [inputSearch, setInputSearch] = React.useState(initialState);
  const submitSearch = (e) => {
    setSearchParams(inputSearch);
    localStorage.setItem('searchInfo', JSON.stringify(inputSearch));
    navigate('/book/reservation/rooms');
  };
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <main>
          <Box
            sx={{
              bgcolor: 'background.paper',
              pt: 8,
              pb: 6,
            }}
          >
            <Container maxWidth="lg">
              <Grid container>
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={7}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="From"
                      value={inputSearch.From}
                      onChange={(e) => {
                        setInputSearch({
                          ...inputSearch,
                          From: moment(e.$d).format('MM/DD/YYYY'),
                        });
                      }}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                  <Box sx={{ mx: 2 }}> to </Box>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="To"
                      value={inputSearch.To}
                      renderInput={(params) => <TextField {...params} />}
                      onChange={(e) => {
                        setInputSearch({
                          ...inputSearch,
                          To: moment(e.$d).format('MM/DD/YYYY'),
                        });
                      }}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={3}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  {/* <InputLabel id="demo-simple-select-autowidth-label">
                    Age
                  </InputLabel> */}
                  <Select
                    value={inputSearch.room}
                    name="room"
                    onChange={(e) => {
                      setInputSearch({
                        ...inputSearch,
                        [e.target.name]: e.target.value,
                      });
                    }}
                    sx={{ mx: '10px' }}
                  >
                    <MenuItem value={'1 Room'}>1 Room</MenuItem>
                    <MenuItem value={'2 Room'}>2 Room</MenuItem>
                    <MenuItem value={'3 Room'}>3 Room</MenuItem>
                  </Select>
                  <Select
                    value={inputSearch.adult}
                    name="adult"
                    onChange={(e) => {
                      setInputSearch({
                        ...inputSearch,
                        [e.target.name]: e.target.value,
                      });
                    }}
                    sx={{ mx: '10px' }}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={'1 Adult'}>1 Adult</MenuItem>
                    <MenuItem value={'2 Adult'}>2 Adult</MenuItem>
                    <MenuItem value={'3 Adult'}>3 Adult</MenuItem>
                    <MenuItem value={'4 Adult'}>4 Adult</MenuItem>
                    <MenuItem value={'5 Adult'}>5 Adult</MenuItem>
                  </Select>
                  <Select
                    value={inputSearch.kids}
                    name="kid"
                    onChange={(e) => {
                      setInputSearch({
                        ...inputSearch,
                        [e.target.name]: e.target.value,
                      });
                    }}
                    sx={{ mx: '10px' }}
                  >
                    <MenuItem value={'1 Kid'}>1 Kid</MenuItem>
                    <MenuItem value={'2 Kids'}>2 Kids</MenuItem>
                    <MenuItem value={'3 Kids'}>3 Kids</MenuItem>
                    <MenuItem value={'4 Kids'}>4 Kids</MenuItem>
                    <MenuItem value={'5 Kids'}>5 Kids</MenuItem>
                  </Select>
                </Grid>

                <Grid
                  xs={12}
                  sm={12}
                  md={2}
                  item
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Button
                    variant="contained"
                    style={{ height: '35px' }}
                    onClick={submitSearch}
                  >
                    Search
                  </Button>
                </Grid>
              </Grid>
            </Container>
          </Box>
        </main>
      </ThemeProvider>
    </>
  );
}
