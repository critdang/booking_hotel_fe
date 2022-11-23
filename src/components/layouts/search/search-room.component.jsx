import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import {
  Button,
  ButtonGroup,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  FormLabel,
  Grid,
  IconButton,
  Typography,
} from '@mui/material';
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
import useMediaQuery from '@mui/material/useMediaQuery';
import CloseIcon from '@mui/icons-material/Close';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { useState } from 'react';

const theme = createTheme();
const initialState = {
  From: moment(new Date()).format('MM/DD/YYYY'),
  To: moment(new Date()).add(1, 'days').format('MM/DD/YYYY'),
  room: '1 Room',
  adult: '1 Adult',
  kids: '1 Kid',
};

export default function SearchRoom() {
  // [START - CONFIG SEARCH MODAL]
  const [openSearch, setOpenSearch] = useState(false);
  const theme = useTheme();
  const fullScreenSearch = useMediaQuery(theme.breakpoints.down('md'));

  const handleClickOpenSearch = () => {
    setOpenSearch(true);
  };

  const handleCloseSearch = () => {
    setOpenSearch(false);
  };
  // [END - CONFIG SEARCH MODAL]

  // [START - CONFIG SEARCH ROOM]
  const [room, setRoom] = useState(1);
  // [END - CONFIG SEARCH ROOM]
  const navigate = useNavigate();
  let [searchParams, setSearchParams] = useSearchParams();

  const [inputSearch, setInputSearch] = React.useState(initialState);
  const submitSearch = (e) => {
    setSearchParams(inputSearch);
    sessionStorage.setItem('searchInfo', JSON.stringify(inputSearch));
    navigate({
      pathname: '/book/reservation/rooms',
      search: `?From=${inputSearch.From}&To=${inputSearch.To}&room=${inputSearch.room}&adult=${inputSearch.adult}&kids=${inputSearch.kids}`,
    });
  };
  const [counter, setCounter] = React.useState(0);

  const handleIncrementKids = () => {
    setCounter(counter + 1);
  };

  const handleDecrementKids = () => {
    setCounter(counter - 1);
  };
  const displayCounter = counter > 0;

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
                  {/* START - OTHERS */}
                  <Button variant="outlined" onClick={handleClickOpenSearch}>
                    2 rooms, 2 guests
                  </Button>
                  <Dialog
                    fullWidth={true}
                    fullScreen={fullScreenSearch}
                    maxWidth="xs"
                    open={openSearch}
                    onClose={handleCloseSearch}
                    sx={{
                      '& .css-m9glnp-MuiPaper-root-MuiDialog-paper': {
                        height: 'auto',
                      },
                    }}
                  >
                    <DialogTitle id="responsive-dialog-title">
                      <IconButton
                        aria-label="close"
                        onClick={handleCloseSearch}
                        sx={{
                          position: 'absolute',
                          right: 8,
                          top: 8,
                          // color: (theme) => theme.palette.grey[500],
                        }}
                      >
                        <CloseIcon />
                      </IconButton>
                      <Typography
                        variant="h6"
                        fontWeight="bold"
                        textAlign="center"
                        gutterBottom
                        sx={{ mt: 2 }}
                      >
                        Rooms and Guests
                      </Typography>
                      <Divider orientation="horizontal" flexItem />
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText sx={{ color: 'rgba(0,0,0,1)' }}>
                        <>
                          <Typography>{room}</Typography>
                          <Grid container spacing="2">
                            <Grid
                              item
                              xs={4}
                              sm={4}
                              md={4}
                              display="flex"
                              flexDirection="column"
                            >
                              <Typography variant="body1" fontWeight="bold">
                                Rooms
                              </Typography>
                              <Box>
                                {Array.from(Array(room)).map((item, index) => (
                                  <Typography
                                    variant="body2"
                                    sx={{ mt: 1, mb: 1 }}
                                  >
                                    Room {index + 1}
                                  </Typography>
                                ))}
                              </Box>
                            </Grid>
                            <Grid
                              item
                              xs={4}
                              sm={4}
                              md={4}
                              display="flex"
                              flexDirection="column"
                              alignItems="center"
                              justifyContent="center"
                            >
                              <Typography variant="body1" fontWeight="bold">
                                Adults(18+)
                              </Typography>
                              {Array.from(Array(room)).map((item, index) => (
                                <Box
                                  display="flex"
                                  alignItems="center"
                                  justifyContent="center"
                                >
                                  {displayCounter ? (
                                    <IconButton
                                      color="primary"
                                      onClick={handleDecrementKids}
                                    >
                                      <RemoveCircleOutlineIcon />
                                    </IconButton>
                                  ) : (
                                    <IconButton
                                      disabled
                                      color="primary"
                                      onClick={handleDecrementKids}
                                    >
                                      <RemoveCircleOutlineIcon />
                                    </IconButton>
                                  )}
                                  <Typography
                                    variant="body1"
                                    textAlign="center"
                                  >
                                    {counter}
                                  </Typography>

                                  <IconButton
                                    color="primary"
                                    onClick={handleIncrementKids}
                                  >
                                    <AddCircleOutlineIcon />
                                  </IconButton>
                                </Box>
                              ))}
                            </Grid>
                            <Grid
                              item
                              xs={4}
                              sm={4}
                              md={4}
                              display="flex"
                              flexDirection="column"
                              alignItems="center"
                              justifyContent="center"
                            >
                              <Typography variant="body1" fontWeight="bold">
                                Kids
                              </Typography>
                              <Box
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                              >
                                {displayCounter ? (
                                  <IconButton
                                    color="primary"
                                    onClick={handleDecrementKids}
                                  >
                                    <RemoveCircleOutlineIcon />
                                  </IconButton>
                                ) : (
                                  <IconButton
                                    disabled
                                    color="primary"
                                    onClick={handleDecrementKids}
                                  >
                                    <RemoveCircleOutlineIcon />
                                  </IconButton>
                                )}
                                <Typography variant="body1" textAlign="center">
                                  {counter}
                                </Typography>

                                <IconButton
                                  color="primary"
                                  onClick={handleIncrementKids}
                                >
                                  <AddCircleOutlineIcon />
                                </IconButton>
                              </Box>
                            </Grid>
                          </Grid>
                          <Divider orientation="horizontal" flexItem />
                          <Grid container>
                            <Grid
                              item
                              xs={12}
                              sm={12}
                              md={12}
                              display="flex"
                              alignItems="center"
                            >
                              <IconButton color="primary" sx={{ pl: 0 }}>
                                <AddCircleOutlineIcon />
                              </IconButton>
                              <Button
                                sx={{
                                  border: 'none',
                                  backgroundColor: 'white',
                                  textDecoration: 'none',
                                  color: 'black',
                                  textTransform: 'none',
                                  p: 0,
                                  fontWeight: 'bold',
                                }}
                                onClick={() => setRoom(room + 1)}
                              >
                                Add Room
                              </Button>
                            </Grid>
                          </Grid>
                          <Divider orientation="horizontal" flexItem />
                          <Button
                            sx={{
                              border: 'none',
                              backgroundColor: 'white',
                              textDecoration: 'underline',
                              textTransform: 'none',
                              p: 0,
                            }}
                          >
                            Book 10 or more rooms with group booking
                          </Button>
                        </>
                      </DialogContentText>
                    </DialogContent>
                  </Dialog>
                  {/* END - OTHERS */}

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
