import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  Typography,
} from '@mui/material';
import * as React from 'react';
import moment from 'moment';
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery';
import CloseIcon from '@mui/icons-material/Close';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { useState } from 'react';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import '@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css';
import { Calendar } from '@hassanmojab/react-modern-calendar-datepicker';
import dayjs from 'dayjs';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const initialRoom = [
  {
    adults: 1,
    kids: 0,
  },
];
const useStyles = makeStyles((theme) => ({
  loading: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
}));

export default function SearchRoom() {
  const isXsOrSm = useMediaQuery('(max-width: 960px)'); // Set breakpoint for mobile view
  // [START - CONFIG SEARCH MODAL]
  const classes = useStyles();
  const [openSearch, setOpenSearch] = useState(false);
  const [loading, setLoading] = useState(false);

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
  const [rooms, setRooms] = useState(initialRoom);

  const showSearch = {
    rooms: rooms.length,
    guests: rooms.reduce((acc, cur) => acc + cur.adults + cur.kids, 0),
  };

  // [START - CONFIG CALENDER SEARCH ROOM]
  const defaultFrom = {
    year: dayjs().year(),
    month: dayjs().month(),
    day: dayjs().date(),
  };
  const defaultTo = {
    year: dayjs().year(),
    month: dayjs().month(),
    day: dayjs().add(1, 'day').date(),
  };
  const defaultValue = {
    from: defaultFrom,
    to: defaultTo,
  };

  const [selectedDayRange, setSelectedDayRange] = useState(defaultValue);

  const nextDay = selectedDayRange.from.day + 1;
  const [openCalendar, setOpenCalendar] = useState(false);

  const handleClickOpenCalendar = () => {
    setOpenCalendar(true);
  };

  const handleCloseCalendar = () => {
    setOpenCalendar(false);
  };

  const handleDecrementAdults = (name, index) => (event) => {
    let newArr = rooms.map((item, i) => {
      if (index === i) {
        if (name === 'kids') {
          return { ...item, [name]: item.kids - 1 };
        }
        return { ...item, [name]: item.adults - 1 };
      } else {
        return item;
      }
    });
    setRooms(newArr);
  };

  const handleIncrementAdults = (name, index) => (event) => {
    let newArr = rooms.map((item, i) => {
      if (index === i) {
        if (name === 'kids') {
          return { ...item, [name]: item.kids + 1 };
        }
        return { ...item, [name]: item.adults + 1 };
      } else {
        return item;
      }
    });
    setRooms(newArr);
  };

  const handleAddRoom = () => {
    setRooms([...rooms, { adults: 1, kids: 0 }]);
  };
  // [END - CONFIG SEARCH ROOM]
  const navigate = useNavigate();
  let [searchParams, setSearchParams] = useSearchParams();

  const submitSearch = () => {
    const From = moment(selectedDayRange.from).format('MM-DD-YYYY');

    const To = moment(selectedDayRange.to).format('MM-DD-YYYY');

    var rawAdults = [];
    var rawKids = [];
    // eslint-disable-next-line array-callback-return
    rooms.map((item) => {
      for (var key in item) {
        if (item.hasOwnProperty(key)) {
          if (key === 'adults') {
            rawAdults.push(item[key]);
          }
          if (key === 'kids') {
            rawKids.push(item[key]);
          }
        }
      }
    });
    const adults = rawAdults.join(',');
    const kids = rawKids.join(',');

    const searchInfo = {
      From,
      To,
      adults,
      kids,
    };
    sessionStorage.setItem('searchInfo', JSON.stringify(searchInfo));
    setSearchParams(searchInfo);

    navigate({
      pathname: '/book/reservation/rooms',
      search: `?arrival=${From}&departure=${To}&adults=${adults}&kids=${kids}`,
    });
  };

  return (
    <>
      {loading && (
        <div className={classes.loading}>
          {' '}
          <CircularProgress />{' '}
        </div>
      )}{' '}
      {/* Show loading spinner if loading is true */}
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <main>
          <Box
            sx={{
              bgcolor: 'background.paper',
              pt: 5,
              pb: 5,
            }}
          >
            <Container maxWidth="md">
              <Grid container>
                {/* START - CALENDAR */}
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={3}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  sx={{ mb: 2 }}
                >
                  <Button
                    variant="outlined"
                    sx={{
                      border: 'none',
                      '&:hover': {
                        border: 'none',
                        backgroundColor: 'white',
                      },
                    }}
                    onClick={handleClickOpenCalendar}
                  >
                    <Grid container display="contents" alignItems="center">
                      <Grid item xs={3} sm={3} md={3} mr={isXsOrSm ? 1 : 2}>
                        <Typography
                          variant="h3"
                          sx={{ pr: 2, fontWeight: 600 }}
                        >
                          {selectedDayRange.from == null
                            ? dayjs().date()
                            : selectedDayRange.from.day}
                        </Typography>
                      </Grid>
                      <Grid item xs={3} sm={3} md={3} mr={1}>
                        <Typography
                          variant="body1"
                          fontWeight="bold"
                          sx={{ color: 'black' }}
                        >
                          Nov
                        </Typography>
                        <Typography variant="body1" sx={{ color: 'black' }}>
                          Thu
                        </Typography>
                      </Grid>
                      <Divider orientation="vertical" flexItem />
                      <Grid
                        item
                        xs={3}
                        sm={3}
                        md={3}
                        ml={1}
                        mr={isXsOrSm ? 1 : 2}
                      >
                        <Typography
                          variant="h3"
                          sx={{ pr: 2, fontWeight: 600 }}
                        >
                          {selectedDayRange.to == null
                            ? nextDay
                            : selectedDayRange.to.day}
                        </Typography>
                      </Grid>
                      <Grid item xs={3} sm={3} md={3}>
                        <Typography
                          variant="body1"
                          fontWeight="bold"
                          sx={{ color: 'black' }}
                        >
                          Nov
                        </Typography>
                        <Typography variant="body1" sx={{ color: 'black' }}>
                          Thu
                        </Typography>
                      </Grid>
                    </Grid>
                  </Button>
                  <Dialog
                    fullWidth={true}
                    fullScreen={fullScreenSearch}
                    maxWidth="xs"
                    open={openCalendar}
                    onClose={handleCloseCalendar}
                    sx={{
                      '& .css-m9glnp-MuiPaper-root-MuiDialog-paper': {
                        height: 'auto',
                      },
                    }}
                  >
                    <DialogTitle id="responsive-dialog-title">
                      <IconButton
                        aria-label="close"
                        onClick={handleCloseCalendar}
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
                      <DialogContentText>
                        <>
                          <Box
                            item
                            xs={12}
                            sm={12}
                            md={12}
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                          >
                            <Calendar
                              value={selectedDayRange}
                              onChange={setSelectedDayRange}
                              colorPrimary="#0fbcf9" // added this
                              colorPrimaryLight="rgba(75, 207, 250, 0.4)" // and this
                              shouldHighlightWeekends
                            />
                          </Box>
                        </>
                      </DialogContentText>
                    </DialogContent>
                  </Dialog>
                </Grid>
                {/* END - CALENDAR */}

                {/* START - ROOM */}
                <Grid
                  item
                  xs={6}
                  sm={6}
                  md={3}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  sx={{ mb: 2 }}
                >
                  {/* START - OTHERS */}
                  <Button variant="outlined" onClick={handleClickOpenSearch}>
                    {showSearch.rooms} Rooms, {showSearch.guests} Guests
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
                          <Grid container spacing="2">
                            {rooms.map((room, index) => (
                              <>
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
                                    <Typography variant="body2">{}</Typography>
                                    <>
                                      <Box display="flex" alignItems="center">
                                        {Array(room).length > 1 && (
                                          <IconButton
                                            color="primary"
                                            sx={{ pl: 0 }}
                                          >
                                            <HighlightOffIcon />
                                          </IconButton>
                                        )}

                                        <Typography
                                          variant="body2"
                                          sx={{ py: '10px' }}
                                        >
                                          Room {index + 1}
                                        </Typography>
                                      </Box>
                                    </>
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

                                  <Box
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="center"
                                    sx={{ py: '8px' }}
                                  >
                                    {room.adults > 0 ? (
                                      <IconButton
                                        color="primary"
                                        onClick={handleDecrementAdults(
                                          'adults',
                                          index
                                        )}
                                        sx={{ p: 0 }}
                                      >
                                        <RemoveCircleOutlineIcon
                                          sx={{ p: 0 }}
                                        />
                                      </IconButton>
                                    ) : (
                                      <IconButton
                                        disabled
                                        color="primary"
                                        onClick={handleDecrementAdults(
                                          'adults',
                                          index
                                        )}
                                        sx={{ p: 0 }}
                                      >
                                        <RemoveCircleOutlineIcon
                                          sx={{ p: 0 }}
                                        />
                                      </IconButton>
                                    )}
                                    <Typography
                                      variant="body1"
                                      textAlign="center"
                                      sx={{ mx: 1 }}
                                    >
                                      {room.adults}
                                    </Typography>

                                    <IconButton
                                      color="primary"
                                      onClick={handleIncrementAdults(
                                        'adults',
                                        index
                                      )}
                                      sx={{ p: 0 }}
                                    >
                                      <AddCircleOutlineIcon sx={{ p: 0 }} />
                                    </IconButton>
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
                                    Kids
                                  </Typography>

                                  <Box
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="center"
                                    sx={{ py: '8px' }}
                                  >
                                    {room.kids > 0 ? (
                                      <IconButton
                                        color="primary"
                                        onClick={handleDecrementAdults(
                                          'kids',
                                          index
                                        )}
                                        sx={{ p: 0 }}
                                      >
                                        <RemoveCircleOutlineIcon
                                          sx={{ p: 0 }}
                                        />
                                      </IconButton>
                                    ) : (
                                      <IconButton
                                        disabled
                                        color="primary"
                                        onClick={handleDecrementAdults(
                                          'kids',
                                          index
                                        )}
                                        sx={{ p: 0 }}
                                      >
                                        <RemoveCircleOutlineIcon
                                          sx={{ p: 0 }}
                                        />
                                      </IconButton>
                                    )}
                                    <Typography
                                      variant="body1"
                                      textAlign="center"
                                      sx={{ mx: 1 }}
                                    >
                                      {room.kids}
                                    </Typography>

                                    <IconButton
                                      color="primary"
                                      onClick={handleIncrementAdults(
                                        'kids',
                                        index
                                      )}
                                      sx={{ p: 0 }}
                                    >
                                      <AddCircleOutlineIcon sx={{ p: 0 }} />
                                    </IconButton>
                                  </Box>
                                </Grid>
                              </>
                            ))}
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
                                <AddCircleOutlineIcon onClick={handleAddRoom} />
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
                                onClick={handleAddRoom}
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
                </Grid>
                {/* END - ROOM */}

                {/* START - SPECIAL REQUEST */}
                <Grid
                  item
                  xs={6}
                  sm={6}
                  md={3}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  sx={{ mb: 2 }}
                >
                  {/* START - OTHERS */}
                  <Button variant="outlined" onClick={handleClickOpenSearch}>
                    Special Requests
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
                          <Grid container spacing="2">
                            {rooms.map((room, index) => (
                              <>
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
                                    <Typography variant="body2">{}</Typography>
                                    <>
                                      <Box display="flex" alignItems="center">
                                        {Array(room).length > 1 && (
                                          <IconButton
                                            color="primary"
                                            sx={{ pl: 0 }}
                                          >
                                            <HighlightOffIcon />
                                          </IconButton>
                                        )}

                                        <Typography
                                          variant="body2"
                                          sx={{ py: '10px' }}
                                        >
                                          Room {index + 1}
                                        </Typography>
                                      </Box>
                                    </>
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

                                  <Box
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="center"
                                    sx={{ py: '8px' }}
                                  >
                                    {room.adults > 0 ? (
                                      <IconButton
                                        color="primary"
                                        onClick={handleDecrementAdults(
                                          'adults',
                                          index
                                        )}
                                        sx={{ p: 0 }}
                                      >
                                        <RemoveCircleOutlineIcon
                                          sx={{ p: 0 }}
                                        />
                                      </IconButton>
                                    ) : (
                                      <IconButton
                                        disabled
                                        color="primary"
                                        onClick={handleDecrementAdults(
                                          'adults',
                                          index
                                        )}
                                        sx={{ p: 0 }}
                                      >
                                        <RemoveCircleOutlineIcon
                                          sx={{ p: 0 }}
                                        />
                                      </IconButton>
                                    )}
                                    <Typography
                                      variant="body1"
                                      textAlign="center"
                                      sx={{ mx: 1 }}
                                    >
                                      {room.adults}
                                    </Typography>

                                    <IconButton
                                      color="primary"
                                      onClick={handleIncrementAdults(
                                        'adults',
                                        index
                                      )}
                                      sx={{ p: 0 }}
                                    >
                                      <AddCircleOutlineIcon sx={{ p: 0 }} />
                                    </IconButton>
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
                                    Kids
                                  </Typography>

                                  <Box
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="center"
                                    sx={{ py: '8px' }}
                                  >
                                    {room.kids > 0 ? (
                                      <IconButton
                                        color="primary"
                                        onClick={handleDecrementAdults(
                                          'kids',
                                          index
                                        )}
                                        sx={{ p: 0 }}
                                      >
                                        <RemoveCircleOutlineIcon
                                          sx={{ p: 0 }}
                                        />
                                      </IconButton>
                                    ) : (
                                      <IconButton
                                        disabled
                                        color="primary"
                                        onClick={handleDecrementAdults(
                                          'kids',
                                          index
                                        )}
                                        sx={{ p: 0 }}
                                      >
                                        <RemoveCircleOutlineIcon
                                          sx={{ p: 0 }}
                                        />
                                      </IconButton>
                                    )}
                                    <Typography
                                      variant="body1"
                                      textAlign="center"
                                      sx={{ mx: 1 }}
                                    >
                                      {room.kids}
                                    </Typography>

                                    <IconButton
                                      color="primary"
                                      onClick={handleIncrementAdults(
                                        'kids',
                                        index
                                      )}
                                      sx={{ p: 0 }}
                                    >
                                      <AddCircleOutlineIcon sx={{ p: 0 }} />
                                    </IconButton>
                                  </Box>
                                </Grid>
                              </>
                            ))}
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
                                <AddCircleOutlineIcon onClick={handleAddRoom} />
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
                                onClick={handleAddRoom}
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
                </Grid>
                {/* END - SPECIAL REQUEST */}
                {/* START - SEARCH BUTTOn */}
                <Grid
                  xs={12}
                  sm={12}
                  md={3}
                  item
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  sx={{ mb: 2 }}
                >
                  <Button
                    variant="contained"
                    style={{ height: '35px' }}
                    onClick={submitSearch}
                  >
                    Search Room
                  </Button>
                </Grid>
                {/* END - SEARCH BUTTOn */}
              </Grid>
            </Container>
          </Box>
        </main>
      </ThemeProvider>
    </>
  );
}
