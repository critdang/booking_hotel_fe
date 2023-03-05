import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import room1 from '../../../assets/img/room1.jpg';
import room2 from '../../../assets/img/room2.jpg';
import room3 from '../../../assets/img/room3.jpg';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link, Navigate } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Paper } from '@mui/material';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
  paper: {
    // padding: theme.spacing(2),
    textAlign: 'center',
    // color: theme.palette.text.secondary,
    color: '#fff',
    position: 'relative',
    cursor: 'pointer',
    '&:hover $text': {
      // top: '-20px',
      bottom: '40px',
    },
  },
  image: {
    width: '100%',
    height: 'auto',
  },
  text: {
    position: 'absolute',
    bottom: '20px',
    width: '100%',
    transition: 'all .3s ease-out',
  },
}));
const cards = [1, 2, 3, 4];
const theme = createTheme();
export default function AllRoom2() {
  const classes = useStyles();
  const [isHover, setIsHover] = React.useState(false);

  const styleText = {
    position: 'absolute',
    color: 'white',
    fontSize: '30px',
    left: '50%',
    transform: 'translateX(-50%)',
    textAlign: 'center',
    bottom: isHover ? '25%' : '8px',
    transition: isHover ? `0.5s ease` : 'none',
  };

  const styleBox = {
    opacity: isHover ? '0.7' : '1',
    postition: 'relative',
    transition: isHover ? `0.5s ease` : 'none',
  };
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <main>
        <Box
          sx={{
            bgcolor: '#f1f1f1',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h3"
              align="center"
              color="text.primary"
              gutterBottom
            >
              All Room
            </Typography>
            <Typography
              variant="body1"
              align="center"
              color="text.secondary"
              paragraph
            >
              Something short and leading about the collection below—its
              contents, the creator, etc. Make it short and sweet, but not too
              short so folks don&apos;t simply skip over it entirely.
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Link
                to="/room"
                style={{ textDecoration: 'none', color: 'black' }}
              >
                <Button variant="outlined">Go to Dorm & Rooms</Button>
              </Link>
            </Stack>
          </Container>
          <Container sx={{ py: 3 }} maxWidth="xl">
            <Grid container spacing={4}>
              {/* {cards.map((card, index) => (
                <>
                  <Grid item key={index} xs={12} sm={6} md={3}>
                    <a href="/">
                      <div>
                        <div style={{ position: 'relative' }}>
                          <img
                            src="https://t-cf.bstatic.com/xdata/images/hotel/max1280x900/213801629.jpg?k=572257cc4fc5062868248e9d125bfa6436d0c6e27114d9bea87cc842bb3b9cb2&o=&hp=1"
                            width="100%"
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                            style={styleBox}
                          />
                          <div style={styleText}>Your text</div>
                        </div>
                      </div>
                    </a>
                  </Grid>
                </>
              ))} */}
              {[...Array(4)].map((_, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <Link to={'/room'}>
                    <div className={classes.paper}>
                      <img
                        src={`https://picsum.photos/400/400?random=${index}`}
                        alt="placeholder"
                        className={classes.image}
                      />
                      <Typography
                        variant="h5"
                        component="h3"
                        className={classes.text}
                      >
                        Image {index + 1}
                      </Typography>
                    </div>
                  </Link>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>
      </main>
    </ThemeProvider>
  );
}
