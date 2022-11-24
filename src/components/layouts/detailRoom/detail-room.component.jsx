import {
  List,
  ListItem,
  Modal,
  Box,
  IconButton,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useState } from 'react';
import { Grid } from '@mui/material/Grid';
import { CloseIcon } from '@mui/icons-material/Close';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Container } from '@mui/system';
import { Navigation, Pagination, Mousewheel, Keyboard, Autoplay } from 'swiper';

const raw = `Top premium floors, exclusive Executive Lounge access, ocean and Han River views \n Located through 25th - 27th floor, this executive room offers spectacular ocean and river views.\n Comfortably appointed with the Vietnamese-inspired décor, the guest room features a king-sized bed.`;
const descriptions = raw.split('\n');
const styleModal = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1200,
  bgcolor: 'white',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const imageSources = [
  'https://media-cdn.tripadvisor.com/media/photo-s/17/61/79/7f/pub-area.jpg',
  'https://media-cdn.tripadvisor.com/media/photo-m/1280/15/06/b9/7c/overview.jpg',
  'https://media-cdn.tripadvisor.com/media/photo-m/1280/15/06/3b/38/group-table.jpg',
  'https://media-cdn.tripadvisor.com/media/photo-m/1280/17/61/79/25/for-domestic-and-foreign.jpg',
];

export default function DetailRoom() {
  // config default
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  // End config default
  return (
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
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ color: 'rgba(0,0,0,1)' }}>
          <>
            <Grid container>
              <Grid item xs={12} sm={12} md={6} align="center" mt={2}>
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
                  <Typography variant="body1" textAlign="left" sx={{ my: 2 }}>
                    Han River view, 43-inch HDTV, chaise lounge, bathtub and
                    shower
                    <br /> Located through 5th - 12th floor, the guest rooms
                    offer beautiful views of Han River. Comfortably appointed
                    with the Vietnamese-inspired décor, the guest room features
                    a king-sized bed.
                    <br /> Modern comforts include a 43-inch HDTV, a chaise
                    lounge, mini-bar, WiFi access (fees apply), and a digital
                    alarm clock. Elegantly divided from the bedroom, the
                    bathroom features spacious and creative designs including a
                    rain shower as well a free-standing bathtub. Sleeps 2.{' '}
                    <br />
                    An extra bed for a third guest may be available for a fee
                    and upon request.{' '}
                    <Button
                      sx={{
                        border: 'none',
                        backgroundColor: 'white',
                        textDecoration: 'underline',
                        textTransform: 'none',
                        p: 0,
                      }}
                      onClick={() => handleDesModal()}
                    >
                      Read less
                    </Button>
                  </Typography>
                ) : (
                  <Typography variant="body1" textAlign="left" sx={{ my: 2 }}>
                    Han River view, 43-inch HDTV, chaise lounge, bathtub and
                    shower <br />
                    Located through 5th - 12th floor, the guest rooms offer
                    beautiful views of Han River. Comfortably ...
                    <Button
                      sx={{
                        border: 'none',
                        backgroundColor: 'white',
                        textDecoration: 'underline',
                        textTransform: 'none',
                        p: 0,
                      }}
                      onClick={() => handleDesModal()}
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
                    handlePickRoom(1, 'King Guest Room River View')
                  }
                >
                  Book Now
                </Button>
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <Container>
                  <Typography variant="body1">Hotel Amenities</Typography>
                  <Divider sx={{ my: 2 }} />
                  <Typography>
                    <div className="swiper-container">
                      <Swiper
                        cssMode={true}
                        navigation={true}
                        keyboard={true}
                        modules={[Navigation, Pagination, Mousewheel, Keyboard]}
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
                        {Object.keys(iconAmenities).map((key, index) => (
                          <SwiperSlide>
                            <div
                              key={index}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}
                            >
                              <img
                                src={iconAmenities[key]}
                                alt="img"
                                style={{
                                  width: '50%',
                                }}
                                // sizes="(max-width: 300px) 300px, (max-width: 600px) 600px, (max-width: 900px) 900px, (max-width: 1200px) 1200px"
                              />
                            </div>
                            <Typography variant="body2" textAlign="center">
                              {key}
                            </Typography>
                          </SwiperSlide>
                        ))}
                      </Swiper>
                    </div>
                  </Typography>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="body1">Room Highlights</Typography>
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
                        <ListItem sx={{ padding: 0 }}>Sleeps 3</ListItem>
                        <ListItem sx={{ padding: 0 }}>
                          Separate bathtub
                        </ListItem>
                        <ListItem sx={{ padding: 0 }}>Hairdryer</ListItem>
                        <ListItem sx={{ padding: 0 }}>Iron</ListItem>
                      </Grid>
                      <Grid item xs={6}>
                        <ListItem sx={{ padding: 0 }}>
                          Bathroom amenities
                        </ListItem>
                        <ListItem sx={{ padding: 0 }}>
                          Separate bathtub and shower
                        </ListItem>
                        <ListItem sx={{ padding: 0 }}>Hairdryer</ListItem>
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

                    <ListItemButton onClick={handleClickOpenAmenitiesModal}>
                      <ListItemText
                        primary={
                          <Typography
                            type="body1"
                            sx={{
                              color: '#104C97',
                              fontWeight: 'bold',
                            }}
                          >
                            See our full list of amenities
                          </Typography>
                        }
                      />
                      {openAmenitiesModal ? (
                        <ExpandLess sx={{ color: '#104C97' }} />
                      ) : (
                        <ExpandMore sx={{ color: '#104C97' }} />
                      )}
                    </ListItemButton>
                    <Divider sx={{ my: 1 }} />

                    <Collapse
                      in={openAmenitiesModal}
                      timeout="auto"
                      unmountOnExit
                    >
                      <List component="div" disablePadding>
                        <ListItemText sx={{ pl: 4 }}>
                          <List
                            sx={{
                              listStyleType: 'disc',
                              pl: 2,
                              '& .MuiListItem-root': {
                                display: 'list-item',
                              },
                            }}
                          >
                            <ListItem sx={{ padding: 0 }}>Sleeps 3</ListItem>
                            <ListItem sx={{ padding: 0 }}>
                              Separate bathtub
                            </ListItem>
                            <ListItem sx={{ padding: 0 }}>Hairdryer</ListItem>
                            <ListItem sx={{ padding: 0 }}>Iron</ListItem>
                            <ListItem sx={{ padding: 0 }}>
                              Bathroom amenities
                            </ListItem>
                            <ListItem sx={{ padding: 0 }}>
                              Separate bathtub and shower
                            </ListItem>
                            <ListItem sx={{ padding: 0 }}>Hairdryer</ListItem>
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
  );
}
