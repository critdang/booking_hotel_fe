import { Avatar, GridList, GridListTile, Typography } from '@material-ui/core';
import { useState, useEffect } from 'react';
import { Grid, Box } from '@mui/material';
import { getDatabase, ref, push, set } from 'firebase/database';
import { initializeApp } from 'firebase/app';
import db from '../../../utils/firebase';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import { Badge } from '@material-ui/core';
import RoomComment from './room-comment';
const useStyles = makeStyles((theme) => ({
  loading: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },
}));

const Review = ({ roomName }) => {
  const classes = useStyles();
  const [reviews, setReviews] = useState([]);

  console.log('🚀 ~ file: room-review.jsx:27 ~ Review ~ reviews:', reviews);
  const [likes, setLikes] = useState([]);
  const [name, setName] = useState('test');
  const [text, setText] = useState('');
  const [branchId, setBranch] = useState(1);
  // const [roomId, setRoomId] = useState();
  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState(null);
  const [comment, setComment] = useState('');
  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };
  const [selectedReview, setSelectedReview] = useState(null);

  useEffect(() => {
    let filteredReviews;
    const reviewsRef = db.ref('Post');
    reviewsRef.on('value', (snapshot) => {
      const reviewsData = [];

      snapshot.forEach((childSnapshot) => {
        const review = childSnapshot.val();
        reviewsData.push(review);
      });
      filteredReviews = reviewsData.filter(
        (item) => item.roomName === roomName
      );

      setReviews(filteredReviews);

      setLoading(false);
    });

    return () => {
      reviewsRef.off();
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const db = getDatabase();
    const reviewsRef = ref(db, 'post');
    const newReviewRef = push(reviewsRef);

    set(newReviewRef, {
      // roomId: roomId,
      name: name,
      text: text,
      branchId: branchId,
      timestamp: Date.now(),
    });

    setText('');
  };

  return (
    <>
      <Typography variant="h6">Reviews</Typography>
      {loading ? (
        <div className={classes.loading}>
          {' '}
          <CircularProgress />
        </div>
      ) : (
        <>
          {reviews.map((review) => (
            <Box style={{ display: 'flex', alignItems: 'center' }} my={3}>
              <Grid
                container
                spacing={2}
                sx={{ display: 'flex', alignItems: 'center' }}
              >
                <Grid item xs={1}>
                  <Avatar
                    // src={review.avatar}
                    alt={review.userEmail}
                    style={{ marginRight: '1rem' }}
                  />
                </Grid>
                <Grid item xs={8}>
                  <Typography variant="body1" style={{ fontWeight: '600' }}>
                    {review.userEmail}
                  </Typography>
                  <Typography variant="body2">{review.content}</Typography>
                  <Typography
                    variant="body2"
                    style={{ textDecoration: 'italic' }}
                  >
                    <i>
                      At {review.branchName}, {review.roomName}
                    </i>
                  </Typography>
                  <GridList cellHeight={160} cols={3}>
                    {/* {review.images.map((image) => ( */}
                    <GridListTile key={review.postImageUrl}>
                      <img
                        src={review.postImageUrl}
                        alt={review.postImageUrl}
                      />
                    </GridListTile>
                    {/* ))} */}
                  </GridList>{' '}
                  <Grid container spacing={2}>
                    <Grid item xs={5}>
                      {review?.Like ? (
                        <Badge
                          style={{ marginTop: '10px' }}
                          badgeContent={Object.keys(review.Like).length}
                          color="primary"
                        >
                          <ThumbUpOutlinedIcon style={{ fontSize: '20px' }} />
                        </Badge>
                      ) : (
                        <ThumbUpOutlinedIcon style={{ fontSize: '20px' }} />
                      )}
                    </Grid>
                    <Grid item xs={7}>
                      {review?.Comments ? (
                        <Badge
                          style={{ marginTop: '10px' }}
                          badgeContent={Object.keys(review.Comments).length}
                          color="primary"
                          onClick={() => setSelectedReview(review.id)}
                        >
                          <ChatOutlinedIcon style={{ fontSize: '20px' }} />
                        </Badge>
                      ) : (
                        <ChatOutlinedIcon style={{ fontSize: '20px' }} />
                      )}
                    </Grid>
                  </Grid>
                  {selectedReview && (
                    <RoomComment comments={review?.Comments} />
                  )}
                </Grid>
                <Grid item xs={3}>
                  <Typography variant="subtitle2" style={{ textAlign: 'end' }}>
                    {review.reviewDate}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          ))}
          {/* <form onSubmit={handleSubmit}>
            <Grid
              container
              spacing={2}
              alignItems="center"
              justifyContent="center"
            >
              <Grid item xs={7}>
                <TextField
                  label="Leave a review"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  multiline
                  fullWidth
                  style={{ marginBottom: '1rem' }}
                />
              </Grid>
              <Grid item xs={3}>
                <input
                  accept="image/*"
                  type="file"
                  id="image-input"
                  style={{ display: 'none' }}
                  onChange={handleImageChange}
                />
                <label htmlFor="image-input">
                  <Button
                    variant="contained"
                    color="default"
                    component="span"
                    startIcon={<CloudUploadIcon />}
                  >
                    Upload Image
                  </Button>
                </label>
              </Grid>
              <Grid item xs={2}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  style={{ marginLeft: '1rem' }}
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form> */}
        </>
      )}
    </>
  );
};

export default Review;
