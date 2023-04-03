import * as React from 'react';
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { CircularProgress } from '@material-ui/core';
import { ThemeProvider, useTheme } from '@mui/material/styles';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import {
  Collapse,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useMediaQuery,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// import required modules
import { Navigation, Pagination, Mousewheel, Keyboard, Autoplay } from 'swiper';
import { useCart } from '../../../context/cart/cart.provider';
import axios from 'axios';
import * as API from '../../../constants/api';
import { toastAlertFail } from '../../../utils/helperFn';
import { useNavigate, useSearchParams } from 'react-router-dom';
import moment from 'moment';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import Review from './room-review';
import { makeStyles } from '@material-ui/core/styles';
const imageSources = [
  'https://media-cdn.tripadvisor.com/media/photo-s/17/61/79/7f/pub-area.jpg',
  'https://media-cdn.tripadvisor.com/media/photo-m/1280/15/06/b9/7c/overview.jpg',
  'https://media-cdn.tripadvisor.com/media/photo-m/1280/15/06/3b/38/group-table.jpg',
  'https://media-cdn.tripadvisor.com/media/photo-m/1280/17/61/79/25/for-domestic-and-foreign.jpg',
];

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

const useStyles = makeStyles((theme) => ({
  loading: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },
}));
export default function RoomBody() {
  const classes = useStyles();
  const navigate = useNavigate();

  // [START - useContext]
  const { dispatch } = useCart();
  // [END - useContext]
  const dataUser = JSON.parse(localStorage.getItem('userInfo'));
  const [category, setCategory] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [categoryId, setCategoryId] = useState(1); //chua dung tai sao k dc de default value null
  const [value, setValue] = React.useState();
  const [loading, setLoading] = useState(true);
  let [searchParams, setSearchParams] = useSearchParams();
  // get all categories
  useEffect(() => {
    axios
      .get(API.GET_CATEGORY)
      .then((res) => {
        setCategory(res.data.message);
        const firstItemCate =
          res.data.message[Object.keys(res.data.message)[0]].id;
        setCategoryId(firstItemCate);
        setValue(firstItemCate);
      })
      .catch((error) => {
        if (error) {
          console.log(
            '🚀 ~ file: request-reset.component.jsx ~ line 60 ~ submitLogin ~ error',
            error
          );
          return toastAlertFail(error.response.data.message);
        }
      });
  }, []);

  // get all rooms by category
  useEffect(() => {
    axios
      .get(`${API.GET_ROOM_BY_CATEGORY}/${categoryId}`)
      .then((res) => {
        if (res.data.success) {
          setRooms(res.data.message.rooms);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log(
          '🚀 ~ file: room-body.component.jsx ~ line 124 ~ handleSubmitRoom ~ error',
          error
        );
      });
  }, []);
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

  // config default
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

  // End config default

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // const onClick = (type) => () => dispatch({ type: type });
  const handleBook = (id, price, roomName) => {
    const searchInfo = {
      From: moment(new Date()).format('MM/DD/YYYY'),
      To: moment(new Date()).add(1, 'days').format('MM/DD/YYYY'),
      adults: 1,
      kids: 0,
    };
    sessionStorage.setItem('searchInfo', JSON.stringify(searchInfo));

    if (Object.getOwnPropertyNames(searchParams).length === 0) {
      const rooms = [
        {
          roomId: id,
          price,
          roomName,
        },
      ];

      sessionStorage.setItem('rooms', JSON.stringify(rooms));
    }
    window.scrollTo(0, 0);
    navigate('/book/reservation');
  };

  function handleSubmitRoom(categoryId) {
    axios
      .get(`${API.GET_ROOM_BY_CATEGORY}/${categoryId}`)
      .then((res) => {
        if (res.data.success) {
          setRooms(res.data.message.rooms);
        }
      })
      .catch((error) => {
        console.log(
          '🚀 ~ file: room-body.component.jsx ~ line 124 ~ handleSubmitRoom ~ error',
          error
        );
      });
  }
  return (
    <>
      {loading ? (
        <div className={classes.loading}>
          {' '}
          <CircularProgress />
        </div>
      ) : (
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <main>
            {/* Hero unit */}
            <Box
              sx={{
                bgcolor: 'background.paper',
                pt: 2,
              }}
            >
              {/* START - HEADER */}
              <Container maxWidth="xl">
                <Typography
                  component="h2"
                  variant="h3"
                  align="center"
                  color="text.primary"
                  gutterBottom
                >
                  Rooms and suites at {selectedBranchHotel?.name}
                </Typography>
              </Container>
              {/* END - HEADER */}
            </Box>
            <Container sx={{ py: 5 }} maxWidth="lg">
              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <TabList
                    onChange={handleChange}
                    aria-label="lab API tabs example"
                    centered
                  >
                    {category &&
                      category.map((item) => (
                        <Tab
                          key={item.id}
                          label={item.name}
                          value={item.id}
                          onClick={() => {
                            handleSubmitRoom(item.id);
                          }}
                        />
                      ))}
                  </TabList>
                </Box>
                {category &&
                  category.map((item) => (
                    <TabPanel
                      key={item.id}
                      value={item.id}
                      sx={{ padding: '0', marginTop: '20px' }}
                    >
                      {/* START - CARD ROOM  unit */}
                      <Grid container spacing={4}>
                        {rooms.map((room) => (
                          <Grid item key={room.id} xs={12} sm={6} md={4}>
                            <Card
                              sx={{
                                display: 'flex',
                                flexDirection: 'column',
                              }}
                            >
                              <CardMedia
                                component="img"
                                image="https://the-secret-garden-da-nang.hotelmix.vn/data/Photos/r1536x531/9697/969780/969780292/The-Secret-Garden-Hostel-Da-Nang-Exterior.JPEG"
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
                                  size="small"
                                  sx={{ width: 200 }}
                                  // onClick={onClick('increase')}
                                  onClick={() =>
                                    handleBook(room.id, room.price, room.name)
                                  }
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
                                  size="small"
                                  sx={{ width: 200 }}
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
                                              // onClick={() =>
                                              //   handlePickRoom(
                                              //     1,
                                              //     'King Guest Room River View'
                                              //   )
                                              // }
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
                                            <Container>
                                              <List
                                                sx={{
                                                  width: '100%',
                                                  maxWidth: '100%',
                                                  bgcolor: 'background.paper',
                                                }}
                                                component="nav"
                                              >
                                                {/* [START] REVIEW COMPONENT */}
                                                <Review />
                                                {/* [END] REVIEW COMPONENT */}
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
                            </Card>
                          </Grid>
                        ))}
                      </Grid>
                      {/* END - CARD ROOM  unit*/}
                    </TabPanel>
                  ))}
              </TabContext>
            </Container>
          </main>
        </ThemeProvider>
      )}
    </>
  );
}
