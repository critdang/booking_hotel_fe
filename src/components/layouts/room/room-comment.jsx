import { Grid, Box } from '@mui/material';
import { Badge } from '@material-ui/core';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import { Typography } from '@mui/material';
import { Avatar } from '@material-ui/core';

const RoomComment = ({ comments }) => {
  console.log(
    '🚀 ~ file: room-comment.jsx:7 ~ RoomComment ~ comments:',
    comments
  );
  return (
    <>
      {comments &&
        Object.entries(comments).map(([key, comment]) => (
          <Grid
            container
            spacing={5}
            sx={{ display: 'flex', alignItems: 'center' }}
          >
            <Grid item xs={1}>
              <Avatar
                // src={review.avatar}
                alt={comment.userEmail}
                style={{ marginRight: '1rem' }}
              />
            </Grid>
            <Grid item xs={8}>
              <Typography variant="subtitle1">{comment.comment}</Typography>
              <Typography variant="caption">{comment.userEmail}</Typography>
            </Grid>
          </Grid>
        ))}
    </>
  );
};

export default RoomComment;
