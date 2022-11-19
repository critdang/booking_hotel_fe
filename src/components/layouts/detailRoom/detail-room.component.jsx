import {
  List,
  ListItem,
  Modal,
  Box,
  IconButton,
  Typography,
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
  const [openModal, setOpenModal] = useState(false);
  const handleCloseModal = () => setOpenModal(false);

  const handleOpenModal = (id) => {
    setOpenModal(true);
  };
  // End config default
  return (
    <Modal
      open={openModal}
      onClose={handleCloseModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      BackdropProps={{
        style: { backgroundColor: 'rgba(0,0,0,0.1)' },
      }}
    >
      <Box sx={styleModal}>
        <Grid container>
          <Grid item xs={12}>
            <IconButton
              aria-label="close"
              onClick={handleCloseModal}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
          </Grid>
          <Grid item xs={7} align="center">
            <Typography
              variant="h6"
              sx={{
                backgroundColor: '#f3f3f3',
                color: 'black',
              }}
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
          </Grid>
          <Grid item xs={5} align="left" sx={{ borderLeft: 0.5 }}>
            <Container>
              <Typography>
                <strong>Description:</strong>{' '}
              </Typography>
              {/* <Typography>
                                    Han River view, 43-inch HDTV, chaise lounge,
                                    bathtub and shower Located through 5th -
                                    12th floor, the guest rooms offer beautiful
                                    views of Han River. Comfortably appointed
                                    with the Vietnamese-inspired décor, the
                                    guest room features a king-sized bed. Modern
                                    comforts include a 43-inch HDTV, a chaise
                                    lounge, mini-bar, WiFi access (fees apply),
                                    and a digital alarm clock. Elegantly divided
                                    from the bedroom, the bathroom features
                                    spacious and creative designs including a
                                    rain shower as well a free-standing bathtub.
                                    Sleeps 2. An extra bed for a third guest may
                                    be available for a fee and upon request.
                                    Check Rates
                                  </Typography> */}
              {
                descriptions &&
                  descriptions.map((des) => {
                    <h1>{des}</h1>;
                  })
                // <h1 variant="body2" color="text.secondary">
                //   {des}
                // </h1>;
              }
              <Typography>
                <strong>Room Highlights</strong>{' '}
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
                <ListItem sx={{ padding: 0 }}>Sleeps 3</ListItem>
                <ListItem sx={{ padding: 0 }}>Separate bathtub</ListItem>
                <ListItem sx={{ padding: 0 }}>Hairdryer</ListItem>
              </List>
            </Container>
            {/* {detailData && (
                                  <Container>
                                    <Typography
                                      variant="h5"
                                      sx={{ color: '#009688' }}
                                    >
                                      Detail product
                                    </Typography>
                                    <Typography>
                                      <strong>Name:</strong>{' '}
                                      {detailData.productDetail.name}
                                    </Typography>
                                    <Typography>
                                      <strong>Price:</strong>{' '}
                                      {detailData.productDetail.price}
                                    </Typography>
                                    <Typography>
                                      <strong>Description:</strong>{' '}
                                      {detailData.productDetail.description}
                                    </Typography>
                                    <Typography>
                                      <strong>Remaining amount:</strong>{' '}
                                      {detailData.productDetail.amount}
                                    </Typography>
                                    <Button
                                      variant="contained"
                                      onClick={addToCart}
                                    >
                                      Add
                                    </Button>
                                    <Button
                                      variant="outlined"
                                      color="error"
                                      onClick={handleCloseModal}
                                    >
                                      Close
                                    </Button>
                                  </Container>
                                )} */}
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
}
