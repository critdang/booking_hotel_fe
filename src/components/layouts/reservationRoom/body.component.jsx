import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import {
  Typography,
  Grid,
  Button,
  Divider,
  CardActions,
  List,
  ListItem,
  IconButton,
  Card,
  CardContent,
  CardMedia,
  Stepper,
  Step,
  StepButton,
  DialogContent,
  DialogContentText,
  Dialog,
  DialogTitle,
  useMediaQuery,
  ListItemText,
  ListItemButton,
  Collapse,
} from '@mui/material';
import * as React from 'react';
import moment from 'moment';
import { useSearchParams } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import '../../../assets/css/payment/payment.css';
import { TfiCheck } from 'react-icons/tfi';
import CloseIcon from '@mui/icons-material/Close';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Mousewheel, Keyboard, Autoplay } from 'swiper';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { toastAlertFail, toastAlertSuccess } from './../../../utils/helperFn';
import axios from 'axios';
import * as API from '../../../constants/api';

const theme = createTheme();
const initialState = {
  From: moment(new Date()).format('MM/DD/YYYY'),
  To: moment(new Date()).add(1, 'days').format('MM/DD/YYYY'),
  room: '1 Room',
  numberOfGuests: '1 Adult',
};
const iconAmenities = {
  'Free parking':
    'https://www.hilton.com/modules/assets/svgs/amenities/freeParking.svg',
  'Free WiFi':
    'https://www.hilton.com/modules/assets/svgs/amenities/freeWifi.svg',
  'Non-smoking rooms':
    'https://www.hilton.com/modules/assets/svgs/amenities/nonSmoking.svg',
  Concierge:
    'https://www.hilton.com/modules/assets/svgs/amenities/concierge.svg',
  'Fitness center':
    'https://www.hilton.com/modules/assets/svgs/amenities/fitnessCenter.svg',
  'On-site restaurant':
    'https://www.hilton.com/modules/assets/svgs/amenities/dining.svg',
  'EV Charging':
    'https://www.hilton.com/modules/assets/svgs/amenities/evCharging.svg',
  'Executive lounge':
    'https://www.hilton.com/modules/assets/svgs/amenities/executiveLounge.svg',
  'Outdoor pool':
    'https://www.hilton.com/modules/assets/svgs/amenities/outdoorPool.svg',
  'Room service':
    'https://www.hilton.com/modules/assets/svgs/amenities/roomService.svg',
  'Business center':
    'https://www.hilton.com/modules/assets/svgs/amenities/businessCenter.svg',
  'Meeting rooms':
    'https://www.hilton.com/modules/assets/svgs/amenities/meetingRooms.svg',
  'Pet not allowed':
    'https://www.hilton.com/modules/assets/svgs/amenities/petsNotAllowed.svg',
};
const imageSources = [
  'https://www.hilton.com/im/en/DADDVHI/9210517/daddv-guest-room-river-view-king-bed.jpg?impolicy=crop&cw=5360&ch=3046&gravity=NorthWest&xposition=0&yposition=223&rw=760&rh=432',
  'https://www.hilton.com/im/en/DADDVHI/9210522/daddv-guest-room-river-view-twin-bed.jpg?impolicy=crop&cw=5390&ch=3063&gravity=NorthWest&xposition=0&yposition=165&rw=760&rh=432',
];

export default function Body() {
  // [START - DEFAULT CONFIG]
  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);
  const [openAmenitiesModal, setOpenAmenitiesModal] = React.useState(false);
  const [openDesModal, setOpenDesModal] = React.useState(false);
  const handleDesModal = () => {
    setOpenDesModal(!openDesModal);
  };
  const handleClickOpenAmenitiesModal = () => {
    setOpenAmenitiesModal(!openAmenitiesModal);
  };
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  // [END - DEFAULT CONFIG]

  const [searchParams] = useSearchParams();
  const arrival = searchParams.get('arrival');
  const departure = searchParams.get('departure');
  const adults = searchParams.get('adults');
  const kids = searchParams.get('kids');
  let [cursorRoom, setCursorRoom] = useState(0);
  const [rooms, setRooms] = useState();
  const [pickedRoom, setPickedRoom] = useState([]);

  useEffect(() => {
    axios({
      method: 'GET',
      url: `${API.GET_SEARCH}/?arrival=${arrival}&departure=${departure}&adults=${adults}&kids=${kids}`,
    })
      .then((res) => {
        if (res.data.success) {
          setRooms(res.data.message);
        }
      })
      .catch((error) => {
        console.log(
          '🚀 ~ file: body.component.jsx ~ line 156 ~ Body ~ error',
          error
        );
        if (error) {
          return toastAlertFail(error.response.data.message);
        }
      });
  }, []);
  const [activeStep, setActiveStep] = React.useState(0);

  const [completed, setCompleted] = React.useState({});
  // [START - CONFIG STEPS FOR ROOMS]
  const totalSteps = () => {
    if (rooms) {
      return rooms.length;
    }
    return null;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          rooms.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    if (isLastStep()) {
      sessionStorage.setItem('rooms', JSON.stringify(pickedRoom));

      setTimeout(() => navigate('/book/reservation'));
    }
    setActiveStep(newActiveStep);
  };

  // const handleBack = () => {
  //   setActiveStep((prevActiveStep) => prevActiveStep - 1);
  // };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  // const handleReset = () => {
  //   setActiveStep(0);
  //   setCompleted({});
  // };

  // [END - CONFIG STEPS FOR ROOMS]
  useEffect(() => {
    sessionStorage.setItem('rooms', JSON.stringify(pickedRoom));
  }, [pickedRoom]);
  const handlePickRoom = (id, name, price) => {
    setCursorRoom(cursorRoom + 1);
    sessionStorage.setItem('rooms', JSON.stringify(pickedRoom));

    setPickedRoom((element) => [
      ...element,
      {
        roomId: id,
        name,
        price,
      },
    ]);
    handleComplete();
    toastAlertSuccess('Room has been picked');
  };

  // [START] - get selected Destination
  const [selectedBranchHotel, setSelectedBranchHotel] = useState();
  useEffect(() => {
    const dataSelectedBranchHotel = sessionStorage.getItem('selectedBranch');
    let defaultSelectedBranchHotel = null;
    if (dataSelectedBranchHotel) {
      try {
        defaultSelectedBranchHotel = JSON.parse(dataSelectedBranchHotel);
      } catch (error) {
        console.error('Error parsing JSON from sessionStorage:', error);
      }
    }
    if (defaultSelectedBranchHotel) {
      setSelectedBranchHotel(defaultSelectedBranchHotel);
    }
  }, []);

  // [END] - get selected Destination
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <main>
          <Box
            sx={{
              bgcolor: 'background.paper',
              pt: 2,
              pb: 2,
            }}
          >
            <Container maxWidth="xl">
              <Grid container>
                <Grid item xs={12} sm={12} md={8}>
                  <Typography
                    variant="h4"
                    fontWeight="bold"
                    sx={{ borderBottom: '4px solid rgb(0,156,222)' }}
                  >
                    Select a Room
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      mt: 2,
                      display: {
                        xs: 'none',
                        md: 'flex',
                        lg: 'flex',
                        xl: 'flex',
                      },
                    }}
                    className="title_paragraph"
                  >
                    {/* Room {activeStep + 1} of {rooms.length} */}
                  </Typography>
                  <Typography
                    variant="h5"
                    sx={{
                      mt: 2,
                      color: 'rgb(0,156,222)',
                      fontWeight: 'bold',
                      display: {
                        xs: 'flex',
                        md: 'none',
                        lg: 'none',
                        xl: 'none',
                      },
                    }}
                  >
                    {/* Room {activeStep + 1} of {rooms.length} */}
                  </Typography>
                  <Box
                    sx={{
                      width: '100%',
                      display: {
                        xs: 'none',
                        md: 'block',
                        lg: 'block',
                        xl: 'block',
                      },
                    }}
                  >
                    <Stepper activeStep={activeStep}>
                      {rooms && rooms.length > 1
                        ? rooms.map((label, index) => (
                            <Step key={index} completed={completed[index]}>
                              <StepButton
                                color="inherit"
                                onClick={handleStep(index)}
                              >
                                <Typography>Room {index + 1}</Typography>
                              </StepButton>
                            </Step>
                          ))
                        : null}
                    </Stepper>
                    <div>
                      {allStepsCompleted() ? (
                        <React.Fragment></React.Fragment>
                      ) : (
                        <React.Fragment>
                          <Box
                            sx={{
                              display: 'flex',
                              flexDirection: 'row',
                              pt: 2,
                            }}
                          ></Box>
                        </React.Fragment>
                      )}
                    </div>
                  </Box>

                  <Typography variant="body1" sx={{ mt: 2 }} fontWeight="bold">
                    Your stay with Hilton Hotels & Resorts includes
                  </Typography>
                  <Grid container sx={{ mt: 1 }}>
                    <Grid item xs={6} sm={3} md={2} display="flex">
                      <TfiCheck />
                      <Typography variant="body2">Free Parking</Typography>
                    </Grid>
                    <Grid item xs={6} sm={3} md={2} display="flex">
                      <TfiCheck />
                      <Typography variant="body2">Free WiFi</Typography>
                    </Grid>
                    <Grid item xs={6} sm={3} md={2} display="flex">
                      <TfiCheck />
                      <Typography variant="body2">Non-smoking rooms</Typography>
                    </Grid>
                    <Grid item xs={6} sm={3} md={2} display="flex">
                      <TfiCheck />
                      <Typography variant="body2">Outdoor pool</Typography>
                    </Grid>
                    <Grid item xs={6} sm={3} md={2} display="flex">
                      <TfiCheck />
                      <Typography variant="body2">Working space</Typography>
                    </Grid>
                  </Grid>
                  <Typography variant="body1" sx={{ m: 2 }}>
                    We found{' '}
                    {rooms && rooms[activeStep] ? rooms[activeStep].length : 0}{' '}
                    for you.
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                  <Grid container spacing={4}>
                    {rooms &&
                      cursorRoom < rooms.length &&
                      rooms[cursorRoom].map(
                        (room, index) => (
                          // items.map((room, index) => (
                          <Grid item xs={12} sm={12} md={6}>
                            <Card
                              sx={{
                                display: 'flex',
                                flexDirection: 'column',
                              }}
                            >
                              <CardMedia
                                component="img"
                                image="https://www.hilton.com/im/en/DADDVHI/9210522/daddv-guest-room-river-view-twin-bed.jpg?impolicy=crop&cw=5390&ch=3063&gravity=NorthWest&xposition=0&yposition=165&rw=760&rh=432"
                                alt="random"
                              />
                              <CardContent sx={{ flexGrow: 1 }}>
                                <Box
                                  display="flex"
                                  alignItems="center"
                                  justifyContent="space-between"
                                >
                                  <Typography
                                    gutterBottom
                                    variant="h6"
                                    fontWeight="bold"
                                  >
                                    {room.name}
                                  </Typography>
                                  <Typography
                                    gutterBottom
                                    variant="h6"
                                    sx={{ color: '#FF5E1F' }}
                                    fontWeight="bold"
                                  >
                                    {room.price}
                                  </Typography>
                                </Box>
                                <Typography
                                  gutterBottom
                                  variant="body2"
                                  textAlign="right"
                                >
                                  / room / night(s)
                                </Typography>
                              </CardContent>
                              <CardActions
                                sx={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                }}
                              >
                                <Button
                                  variant="contained"
                                  fullWidth
                                  // onClick={onClick('increase')}
                                  onClick={() =>
                                    handlePickRoom(
                                      room.id,
                                      room.name,
                                      room.price
                                    )
                                  }
                                  // onClick={() => setPickedRoom(room - 1)}
                                >
                                  Book Now !
                                </Button>
                              </CardActions>

                              <CardActions
                                sx={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                }}
                              >
                                <Button
                                  variant="outlined"
                                  fullWidth
                                  onClick={handleClickOpen}
                                >
                                  View Details
                                </Button>

                                {/* START - MODAL */}
                                <Dialog
                                  fullScreen={fullScreen}
                                  maxWidth="xl"
                                  open={open}
                                  onClose={handleClose}
                                  aria-labelledby="responsive-dialog-title"
                                >
                                  <DialogTitle id="responsive-dialog-title">
                                    <IconButton
                                      aria-label="close"
                                      onClick={handleClose}
                                      sx={{
                                        position: 'absolute',
                                        right: 8,
                                        top: 8,
                                        color: (theme) =>
                                          theme.palette.grey[500],
                                      }}
                                    >
                                      <CloseIcon />
                                    </IconButton>
                                  </DialogTitle>
                                  <DialogContent>
                                    <DialogContentText
                                      sx={{ color: 'rgba(0,0,0,1)' }}
                                    >
                                      <>
                                        <Grid container>
                                          <Grid
                                            item
                                            xs={12}
                                            sm={12}
                                            md={6}
                                            align="center"
                                            mt={2}
                                          >
                                            <Typography
                                              variant="h5"
                                              sx={{
                                                backgroundColor: '#f3f3f3',
                                                color: 'black',
                                              }}
                                              fontWeight="bold"
                                            >
                                              KING GUEST ROOM OCEAN VIEW
                                            </Typography>
                                            <div className="swiper-container">
                                              <Swiper
                                                cssMode={true}
                                                autoplay={{
                                                  delay: 3000,
                                                  disableOnInteraction: false,
                                                }}
                                                navigation={true}
                                                pagination={true}
                                                mousewheel={true}
                                                keyboard={true}
                                                modules={[
                                                  Navigation,
                                                  Pagination,
                                                  Mousewheel,
                                                  Keyboard,
                                                  Autoplay,
                                                ]}
                                                spaceBetween={0}
                                                slidesPerView={1}
                                                className="mySwiper"
                                                breakpoints={{
                                                  1024: {
                                                    slidesPerView: 1,
                                                  },
                                                  768: {
                                                    slidesPerView: 1,
                                                  },
                                                }}
                                              >
                                                {imageSources.map((imgSrc) => (
                                                  <SwiperSlide>
                                                    <div key={imgSrc}>
                                                      <img
                                                        src={imgSrc}
                                                        alt="img"
                                                        style={{
                                                          width: '100%',
                                                        }}
                                                        // sizes="(max-width: 300px) 300px, (max-width: 600px) 600px, (max-width: 900px) 900px, (max-width: 1200px) 1200px"
                                                      />
                                                    </div>
                                                  </SwiperSlide>
                                                ))}
                                              </Swiper>
                                            </div>
                                            {openDesModal ? (
                                              <Typography
                                                variant="body1"
                                                textAlign="left"
                                                sx={{ my: 2 }}
                                              >
                                                Han River view, 43-inch HDTV,
                                                chaise lounge, bathtub and
                                                shower
                                                <br /> Located through 5th -
                                                12th floor, the guest rooms
                                                offer beautiful views of Han
                                                River. Comfortably appointed
                                                with the Vietnamese-inspired
                                                décor, the guest room features a
                                                king-sized bed.
                                                <br /> Modern comforts include a
                                                43-inch HDTV, a chaise lounge,
                                                mini-bar, WiFi access (fees
                                                apply), and a digital alarm
                                                clock. Elegantly divided from
                                                the bedroom, the bathroom
                                                features spacious and creative
                                                designs including a rain shower
                                                as well a free-standing bathtub.
                                                Sleeps 2. <br />
                                                An extra bed for a third guest
                                                may be available for a fee and
                                                upon request.{' '}
                                                <Button
                                                  sx={{
                                                    border: 'none',
                                                    backgroundColor: 'white',
                                                    textDecoration: 'underline',
                                                    textTransform: 'none',
                                                    p: 0,
                                                  }}
                                                  onClick={() =>
                                                    handleDesModal()
                                                  }
                                                >
                                                  Read less
                                                </Button>
                                              </Typography>
                                            ) : (
                                              <Typography
                                                variant="body1"
                                                textAlign="left"
                                                sx={{ my: 2 }}
                                              >
                                                Han River view, 43-inch HDTV,
                                                chaise lounge, bathtub and
                                                shower <br />
                                                Located through 5th - 12th
                                                floor, the guest rooms offer
                                                beautiful views of Han River.
                                                Comfortably ...
                                                <Button
                                                  sx={{
                                                    border: 'none',
                                                    backgroundColor: 'white',
                                                    textDecoration: 'underline',
                                                    textTransform: 'none',
                                                    p: 0,
                                                  }}
                                                  onClick={() =>
                                                    handleDesModal()
                                                  }
                                                >
                                                  {' '}
                                                  Read more
                                                </Button>
                                              </Typography>
                                            )}

                                            <Button
                                              variant="contained"
                                              size="medium"
                                              onClick={() =>
                                                handlePickRoom(
                                                  room.id,
                                                  room.name,
                                                  room.price
                                                )
                                              }
                                            >
                                              Book Now
                                            </Button>
                                          </Grid>
                                          <Grid item xs={12} sm={12} md={6}>
                                            <Container>
                                              <Typography variant="body1">
                                                Hotel Amenities
                                              </Typography>
                                              <Divider sx={{ my: 2 }} />
                                              <Typography>
                                                <div className="swiper-container">
                                                  <Swiper
                                                    cssMode={true}
                                                    navigation={true}
                                                    keyboard={true}
                                                    modules={[
                                                      Navigation,
                                                      Pagination,
                                                      Mousewheel,
                                                      Keyboard,
                                                    ]}
                                                    spaceBetween={0}
                                                    slidesPerView={6}
                                                    className="mySwiper"
                                                    breakpoints={{
                                                      1024: {
                                                        slidesPerView: 6,
                                                      },
                                                      768: {
                                                        slidesPerView: 5,
                                                      },
                                                    }}
                                                  >
                                                    {Object.keys(
                                                      iconAmenities
                                                    ).map((key, index) => (
                                                      <SwiperSlide>
                                                        <div
                                                          key={index}
                                                          style={{
                                                            display: 'flex',
                                                            alignItems:
                                                              'center',
                                                            justifyContent:
                                                              'center',
                                                          }}
                                                        >
                                                          <img
                                                            src={
                                                              iconAmenities[key]
                                                            }
                                                            alt="img"
                                                            style={{
                                                              width: '50%',
                                                            }}
                                                            // sizes="(max-width: 300px) 300px, (max-width: 600px) 600px, (max-width: 900px) 900px, (max-width: 1200px) 1200px"
                                                          />
                                                        </div>
                                                        <Typography
                                                          variant="body2"
                                                          textAlign="center"
                                                        >
                                                          {key}
                                                        </Typography>
                                                      </SwiperSlide>
                                                    ))}
                                                  </Swiper>
                                                </div>
                                              </Typography>
                                              <Divider sx={{ my: 2 }} />
                                              <Typography variant="body1">
                                                Room Highlights
                                              </Typography>
                                              <List
                                                sx={{
                                                  listStyleType: 'disc',
                                                  pl: 2,
                                                  '& .MuiListItem-root': {
                                                    display: 'list-item',
                                                  },
                                                }}
                                                // sx={{
                                                //   padding: 0,
                                                //   listStyleType: 'disc',
                                                //   display: 'list-item',
                                                // }}
                                              >
                                                <Grid container>
                                                  <Grid item xs={6}>
                                                    <ListItem
                                                      sx={{ padding: 0 }}
                                                    >
                                                      Sleeps 3
                                                    </ListItem>
                                                    <ListItem
                                                      sx={{ padding: 0 }}
                                                    >
                                                      Separate bathtub
                                                    </ListItem>
                                                    <ListItem
                                                      sx={{ padding: 0 }}
                                                    >
                                                      Hairdryer
                                                    </ListItem>
                                                    <ListItem
                                                      sx={{ padding: 0 }}
                                                    >
                                                      Iron
                                                    </ListItem>
                                                  </Grid>
                                                  <Grid item xs={6}>
                                                    <ListItem
                                                      sx={{ padding: 0 }}
                                                    >
                                                      Bathroom amenities
                                                    </ListItem>
                                                    <ListItem
                                                      sx={{ padding: 0 }}
                                                    >
                                                      Separate bathtub and
                                                      shower
                                                    </ListItem>
                                                    <ListItem
                                                      sx={{ padding: 0 }}
                                                    >
                                                      Hairdryer
                                                    </ListItem>
                                                  </Grid>
                                                </Grid>
                                              </List>
                                            </Container>
                                            <Container>
                                              <List
                                                sx={{
                                                  width: '100%',
                                                  maxWidth: '100%',
                                                  bgcolor: 'background.paper',
                                                }}
                                                component="nav"
                                              >
                                                <Divider sx={{ my: 1 }} />

                                                <ListItemButton
                                                  onClick={
                                                    handleClickOpenAmenitiesModal
                                                  }
                                                >
                                                  <ListItemText
                                                    primary={
                                                      <Typography
                                                        type="body1"
                                                        sx={{
                                                          color: '#104C97',
                                                          fontWeight: 'bold',
                                                        }}
                                                      >
                                                        See our full list of
                                                        amenities
                                                      </Typography>
                                                    }
                                                  />
                                                  {openAmenitiesModal ? (
                                                    <ExpandLess
                                                      sx={{ color: '#104C97' }}
                                                    />
                                                  ) : (
                                                    <ExpandMore
                                                      sx={{ color: '#104C97' }}
                                                    />
                                                  )}
                                                </ListItemButton>
                                                <Divider sx={{ my: 1 }} />

                                                <Collapse
                                                  in={openAmenitiesModal}
                                                  timeout="auto"
                                                  unmountOnExit
                                                >
                                                  <List
                                                    component="div"
                                                    disablePadding
                                                  >
                                                    <ListItemText
                                                      sx={{ pl: 4 }}
                                                    >
                                                      <List
                                                        sx={{
                                                          listStyleType: 'disc',
                                                          pl: 2,
                                                          '& .MuiListItem-root':
                                                            {
                                                              display:
                                                                'list-item',
                                                            },
                                                        }}
                                                      >
                                                        <ListItem
                                                          sx={{ padding: 0 }}
                                                        >
                                                          Sleeps 3
                                                        </ListItem>
                                                        <ListItem
                                                          sx={{ padding: 0 }}
                                                        >
                                                          Separate bathtub
                                                        </ListItem>
                                                        <ListItem
                                                          sx={{ padding: 0 }}
                                                        >
                                                          Hairdryer
                                                        </ListItem>
                                                        <ListItem
                                                          sx={{ padding: 0 }}
                                                        >
                                                          Iron
                                                        </ListItem>
                                                        <ListItem
                                                          sx={{ padding: 0 }}
                                                        >
                                                          Bathroom amenities
                                                        </ListItem>
                                                        <ListItem
                                                          sx={{ padding: 0 }}
                                                        >
                                                          Separate bathtub and
                                                          shower
                                                        </ListItem>
                                                        <ListItem
                                                          sx={{ padding: 0 }}
                                                        >
                                                          Hairdryer
                                                        </ListItem>
                                                      </List>
                                                    </ListItemText>
                                                  </List>
                                                </Collapse>
                                              </List>
                                            </Container>
                                          </Grid>
                                        </Grid>
                                      </>
                                    </DialogContentText>
                                  </DialogContent>
                                </Dialog>

                                {/* END - MODAL */}
                              </CardActions>
                              <Typography variant="body2" align="center">
                                <span style={{ fontWeight: 'bold' }}>
                                  Plus 5.00%
                                </span>{' '}
                                service charge per stay, plus tax
                              </Typography>
                            </Card>
                          </Grid>
                        )
                        // ))
                      )}
                  </Grid>
                  <ToastContainer />
                </Grid>
                <Grid item xs={12} sm={12} md={1}></Grid>
                {/* START - SIDEBAR OVERALL  */}
                <Grid item xs={12} sm={12} md={3}>
                  <Box>
                    <img
                      src="https://www.hilton.com/im/en/DADDVHI/9210432/daddv-the-sail-2.jpg?impolicy=crop&cw=5428&ch=2822&gravity=NorthWest&xposition=0&yposition=88&rw=750&rh=390"
                      style={{ width: '100%', borderRadius: '10px' }}
                    ></img>
                    <Typography variant="h6" fontWeight="bold">
                      Hilton {selectedBranchHotel?.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ textDecoration: 'underline' }}
                    >
                      {selectedBranchHotel?.address}
                    </Typography>
                  </Box>
                  <Card sx={{ mt: 2 }}>
                    <CardContent>
                      <Typography variant="h6" fontWeight="bold">
                        Hilton {selectedBranchHotel?.name}
                      </Typography>
                      {pickedRoom &&
                        pickedRoom.map((room, index) => (
                          <>
                            <Divider orientation="horizontal" flexItem />
                            <Grid container sx={{ py: 2 }}>
                              <Grid item xs={6} sm={6} md={6}>
                                <Typography
                                  variant="sub1"
                                  gutterBottom
                                  className="main_paragraph"
                                >
                                  Room {index + 1}
                                </Typography>
                              </Grid>
                              <Grid item xs={6} sm={6} md={6} align="right">
                                <Typography
                                  variant="sub1"
                                  gutterBottom
                                  className="main_paragraph"
                                >
                                  2,250,000.00₫
                                </Typography>
                              </Grid>
                              <Grid item xs={6} sm={6} md={6}>
                                <Typography variant="body2" gutterBottom>
                                  {room ? room.roomName : null}
                                </Typography>
                              </Grid>
                              <Grid item xs={6} sm={6} md={6} align="right">
                                <Typography variant="body2" gutterBottom>
                                  1 x ₫2250000.00
                                </Typography>
                              </Grid>
                            </Grid>
                            <Divider orientation="horizontal" flexItem />
                          </>
                        ))}

                      <Divider orientation="horizontal" flexItem />
                      {pickedRoom.length > 0 && (
                        <Grid container sx={{ py: 2 }}>
                          <Grid item xs={6} sm={6} md={6}>
                            <Typography variant="body1">
                              Total room charges
                            </Typography>
                          </Grid>
                          <Grid item xs={6} sm={6} md={6} align="right">
                            <Typography variant="body1">
                              2,250,000.00₫
                            </Typography>
                          </Grid>
                          <Grid item xs={6} sm={6} md={6}>
                            <Typography variant="body1">Total fees</Typography>
                          </Grid>
                          <Grid item xs={6} sm={6} md={6} align="right">
                            <Typography variant="body1">112,500.00₫</Typography>
                          </Grid>
                          <Grid item xs={6} sm={6} md={6}>
                            <Typography variant="body1">Total taxes</Typography>
                          </Grid>
                          <Grid item xs={6} sm={6} md={6} align="right">
                            <Typography variant="body1">189,000.00₫</Typography>
                          </Grid>
                        </Grid>
                      )}
                      <Divider orientation="horizontal" flexItem />
                      <Grid
                        container
                        sx={{ py: 2 }}
                        display="flex"
                        justifyContent="space-between"
                      >
                        <Grid item xs={6} sm={6} md={6}>
                          <Typography variant="body1" fontWeight="bold">
                            Total for stay:
                          </Typography>
                        </Grid>
                        <Grid item xs={6} sm={6} md={6}>
                          <Typography
                            variant="body1"
                            fontWeight="bold"
                            align="right"
                          >
                            0₫
                          </Typography>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
                {/* END - SIDEBAR OVERALL  */}
              </Grid>
            </Container>
          </Box>
        </main>
      </ThemeProvider>
    </>
  );
}
