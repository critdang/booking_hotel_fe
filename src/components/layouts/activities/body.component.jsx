import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const theme = createTheme();
const trafficData = {
  'Share A Room': `Im a paragraph. Click here to add your own text and edit me.
  It’s easy. Just click “Edit Text” or double click me to add
  your own content and make changes to the font.`,
  'Share A Ride': `Im a paragraph. Click here to add your own text and edit me.`,
  'Share A Meal': `Im a paragraph. Click here to add your own text and edit me.`,
  'Share A Skill': `Im a paragraph. Click here to add your own text and edit me.`,
};

export default function BodyActivities() {
  const theme = useTheme();
  const mobileActivities = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <main>
        <Container maxWidth="xl" disableGutters>
          {/* End hero unit */}
          <Grid container>
            {/* Start - activity one */}
            <Grid
              item
              xs={12}
              sm={6}
              md={3}
              sx={{ display: 'flex', flexDirection: 'row' }}
            >
              <img
                src="https://static.wixstatic.com/media/94e66f_b84645289285487faade733d1569f4df~mv2_d_4288_2848_s_4_2.jpeg/v1/fill/w_345,h_615,al_t,q_80,usm_0.66_1.00_0.01/94e66f_b84645289285487faade733d1569f4df~mv2_d_4288_2848_s_4_2.webp"
                alt="img"
                width="100%"
              ></img>
            </Grid>
            <Grid item xs={12} sm={6} md={3} sx={{ p: 2 }}>
              {mobileActivities ? (
                <>
                  <Typography variant="h1" color="primary" textAlign="center">
                    01
                  </Typography>
                  <Typography variant="h4" gutterBottom textAlign="center">
                    {Object.keys(trafficData)[0]}
                  </Typography>
                  <Typography variant="body1" textAlign="center">
                    {trafficData['Share A Room']}
                  </Typography>
                </>
              ) : (
                <>
                  <Typography variant="h1" color="primary">
                    01
                  </Typography>
                  <Typography variant="h4" gutterBottom>
                    {Object.keys(trafficData)[0]}
                  </Typography>
                  <Typography variant="body1">
                    {trafficData['Share A Room']}
                  </Typography>
                </>
              )}
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              md={3}
              sx={{ display: 'flex', flexDirection: 'row' }}
            >
              <img
                src="https://static.wixstatic.com/media/94e66f_b84645289285487faade733d1569f4df~mv2_d_4288_2848_s_4_2.jpeg/v1/fill/w_345,h_615,al_t,q_80,usm_0.66_1.00_0.01/94e66f_b84645289285487faade733d1569f4df~mv2_d_4288_2848_s_4_2.webp"
                alt="img"
                width="100%"
              ></img>
            </Grid>
            <Grid item xs={12} sm={6} md={3} sx={{ p: 2 }}>
              {mobileActivities ? (
                <>
                  <Typography variant="h1" color="primary" textAlign="center">
                    02
                  </Typography>
                  <Typography variant="h4" gutterBottom textAlign="center">
                    {Object.keys(trafficData)[1]}
                  </Typography>
                  <Typography variant="body1" textAlign="center">
                    {trafficData['Share A Room']}
                  </Typography>
                </>
              ) : (
                <>
                  <Typography variant="h1" color="primary">
                    02
                  </Typography>
                  <Typography variant="h4" gutterBottom>
                    {Object.keys(trafficData)[1]}
                  </Typography>
                  <Typography variant="body1">
                    {trafficData['Share A Room']}
                  </Typography>
                </>
              )}
            </Grid>
            {/* End - activity one */}
            {/* Start - activity two */}
            {mobileActivities ? (
              <>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={3}
                  sx={{ display: 'flex', flexDirection: 'row' }}
                >
                  <img
                    src="https://static.wixstatic.com/media/94e66f_b84645289285487faade733d1569f4df~mv2_d_4288_2848_s_4_2.jpeg/v1/fill/w_345,h_615,al_t,q_80,usm_0.66_1.00_0.01/94e66f_b84645289285487faade733d1569f4df~mv2_d_4288_2848_s_4_2.webp"
                    alt="img"
                    width="100%"
                  ></img>
                </Grid>
                <Grid item xs={12} sm={6} md={3} sx={{ p: 2 }}>
                  {mobileActivities ? (
                    <>
                      <Typography
                        variant="h1"
                        color="primary"
                        textAlign="center"
                      >
                        03
                      </Typography>
                      <Typography variant="h4" gutterBottom textAlign="center">
                        {Object.keys(trafficData)[2]}
                      </Typography>
                      <Typography variant="body1" textAlign="center">
                        {trafficData['Share A Room']}
                      </Typography>
                    </>
                  ) : (
                    <>
                      <Typography variant="h1" color="primary">
                        03
                      </Typography>
                      <Typography variant="h4" gutterBottom>
                        {Object.keys(trafficData)[2]}
                      </Typography>
                      <Typography variant="body1">
                        {trafficData['Share A Room']}
                      </Typography>
                    </>
                  )}
                </Grid>

                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={3}
                  sx={{ display: 'flex', flexDirection: 'row' }}
                >
                  <img
                    src="https://static.wixstatic.com/media/94e66f_b84645289285487faade733d1569f4df~mv2_d_4288_2848_s_4_2.jpeg/v1/fill/w_345,h_615,al_t,q_80,usm_0.66_1.00_0.01/94e66f_b84645289285487faade733d1569f4df~mv2_d_4288_2848_s_4_2.webp"
                    alt="img"
                    width="100%"
                  ></img>
                </Grid>
                <Grid item xs={12} sm={6} md={3} sx={{ p: 2 }}>
                  {mobileActivities ? (
                    <>
                      <Typography
                        variant="h1"
                        color="primary"
                        textAlign="center"
                      >
                        04
                      </Typography>
                      <Typography variant="h4" gutterBottom textAlign="center">
                        {Object.keys(trafficData)[3]}
                      </Typography>
                      <Typography variant="body1" textAlign="center">
                        {trafficData['Share A Room']}
                      </Typography>
                    </>
                  ) : (
                    <>
                      <Typography variant="h1" color="primary">
                        04
                      </Typography>
                      <Typography variant="h4" gutterBottom>
                        {Object.keys(trafficData)[3]}
                      </Typography>
                      <Typography variant="body1">
                        {trafficData['Share A Room']}
                      </Typography>
                    </>
                  )}
                </Grid>
              </>
            ) : (
              <>
                <Grid item xs={12} sm={6} md={3} sx={{ p: 2 }}>
                  {mobileActivities ? (
                    <>
                      <Typography
                        variant="h1"
                        color="primary"
                        textAlign="center"
                      >
                        01
                      </Typography>
                      <Typography variant="h4" gutterBottom textAlign="center">
                        {Object.keys(trafficData)[0]}
                      </Typography>
                      <Typography variant="body1" textAlign="center">
                        {trafficData['Share A Room']}
                      </Typography>
                    </>
                  ) : (
                    <>
                      <Typography variant="h1" color="primary">
                        01
                      </Typography>
                      <Typography variant="h4" gutterBottom>
                        {Object.keys(trafficData)[0]}
                      </Typography>
                      <Typography variant="body1">
                        {trafficData['Share A Room']}
                      </Typography>
                    </>
                  )}
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={3}
                  sx={{ display: 'flex', flexDirection: 'row' }}
                >
                  <img
                    src="https://static.wixstatic.com/media/94e66f_b84645289285487faade733d1569f4df~mv2_d_4288_2848_s_4_2.jpeg/v1/fill/w_345,h_615,al_t,q_80,usm_0.66_1.00_0.01/94e66f_b84645289285487faade733d1569f4df~mv2_d_4288_2848_s_4_2.webp"
                    alt="img"
                    width="100%"
                  ></img>
                </Grid>
                <Grid item xs={12} sm={6} md={3} sx={{ p: 2 }}>
                  {mobileActivities ? (
                    <>
                      <Typography
                        variant="h1"
                        color="primary"
                        textAlign="center"
                      >
                        04
                      </Typography>
                      <Typography variant="h4" gutterBottom textAlign="center">
                        {Object.keys(trafficData)[3]}
                      </Typography>
                      <Typography variant="body1" textAlign="center">
                        {trafficData['Share A Room']}
                      </Typography>
                    </>
                  ) : (
                    <>
                      <Typography variant="h1" color="primary">
                        04
                      </Typography>
                      <Typography variant="h4" gutterBottom>
                        {Object.keys(trafficData)[3]}
                      </Typography>
                      <Typography variant="body1">
                        {trafficData['Share A Room']}
                      </Typography>
                    </>
                  )}
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={3}
                  sx={{ display: 'flex', flexDirection: 'row' }}
                >
                  <img
                    src="https://static.wixstatic.com/media/94e66f_b84645289285487faade733d1569f4df~mv2_d_4288_2848_s_4_2.jpeg/v1/fill/w_345,h_615,al_t,q_80,usm_0.66_1.00_0.01/94e66f_b84645289285487faade733d1569f4df~mv2_d_4288_2848_s_4_2.webp"
                    alt="img"
                    width="100%"
                  ></img>
                </Grid>
              </>
            )}

            {/* End - activity two */}
          </Grid>
        </Container>
      </main>
    </ThemeProvider>
  );
}
