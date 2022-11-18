import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import {
  Typography,
  Grid,
  Button,
  Divider,
  useMediaQuery,
  TextField,
} from '@mui/material';
import * as React from 'react';
import moment from 'moment';
import { useSearchParams } from 'react-router-dom';
import { FaCalendarAlt, FaTimes, FaUserFriends } from 'react-icons/fa';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { useTheme } from '@mui/material/styles';

const theme = createTheme();
const initialState = {
  From: moment(new Date()).format('MM/DD/YYYY'),
  To: moment(new Date()).add(1, 'days').format('MM/DD/YYYY'),
  room: '1 Room',
  numberOfGuests: '1 Adult',
};

export default function SearchInfo() {
  const [openEdit, setOpenEdit] = React.useState(false);
  const handleClose = () => setOpenEdit(false);
  // End config
  // Start config responsive
  const theme = useTheme();
  const mobileView = useMediaQuery(theme.breakpoints.down('sm', 'md'));
  // End config responsive
  let [searchParams, setSearchParams] = useSearchParams();

  const [inputSearch, setInputSearch] = React.useState(initialState);
  const submitSearch = (e) => {
    setSearchParams(inputSearch);
  };
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <main>
          {mobileView ? (
            <>
              <Box
                sx={{
                  bgcolor: 'background.paper',
                  pt: 2,
                  pb: 2,
                  borderTop: '1px solid #e0e0e0',
                  borderBottom: '1px solid #e0e0e0',
                }}
              >
                <Container maxWidth="md">
                  <Grid
                    container
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Grid item xs={6} sm={6} md={6}>
                      <Typography variant="h6" fontWeight="bold">
                        Your stay
                      </Typography>
                    </Grid>
                    <Grid item xs={6} sm={6} md={6}>
                      <Button
                        size="small"
                        sx={{ float: 'right' }}
                        onClick={() => setOpenEdit((prev) => !prev)}
                      >
                        Edit stay
                      </Button>
                    </Grid>

                    <Grid
                      item
                      xs={12}
                      sm={12}
                      md={12}
                      display="flex"
                      alignItems="center"
                    >
                      <FaCalendarAlt
                        style={{ fontSize: '20px', marginRight: '10px' }}
                      />
                      <Typography variant="body2">
                        Fri, Nov 18 – Sat, Nov 19, 2022
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sm={12}
                      md={12}
                      display="flex"
                      alignItems="center"
                    >
                      <FaUserFriends
                        style={{ fontSize: '20px', marginRight: '10px' }}
                      />
                      <Typography variant="body2">
                        2 rooms for 3 adults and 1 kid
                      </Typography>
                    </Grid>
                  </Grid>
                </Container>
              </Box>
              {/* START - DROPDOWN MENU */}
              {openEdit && (
                <Box
                  sx={{
                    bgcolor: '#f8f8f8',
                    pt: 2,
                    pb: 2,
                    borderTop: '1px solid #e0e0e0',
                    borderBottom: '1px solid #e0e0e0',
                  }}
                >
                  <Container maxWidth="md">
                    <>
                      <Box>
                        <Grid
                          container
                          display="flex"
                          justifyContent="space-between"
                          alignItems="center"
                        >
                          <Grid
                            item
                            xs={12}
                            sm={12}
                            md={12}
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                          >
                            <Typography
                              variant="h6"
                              fontWeight="bold"
                              gutterBottom
                            >
                              Edit stay
                            </Typography>
                            <FaTimes
                              fontSize="25px"
                              onClick={handleClose}
                              cursor="pointer"
                            />
                          </Grid>
                          <Grid item xs={6} sm={6} md={6}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DatePicker
                                label="From"
                                value="2021-08-18"
                                renderInput={(params) => (
                                  <TextField {...params} />
                                )}
                              />
                            </LocalizationProvider>
                          </Grid>
                          <Grid item xs={6} sm={6} md={6}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DatePicker
                                label="To"
                                value="2021-08-18"
                                renderInput={(params) => (
                                  <TextField {...params} />
                                )}
                              />
                            </LocalizationProvider>
                          </Grid>
                          <Grid item xs={6} sm={6} md={6}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DatePicker
                                label="From"
                                value="2021-08-18"
                                renderInput={(params) => (
                                  <TextField {...params} />
                                )}
                              />
                            </LocalizationProvider>
                          </Grid>
                          <Grid item xs={6} sm={6} md={6}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DatePicker
                                label="From"
                                value="2021-08-18"
                                renderInput={(params) => (
                                  <TextField {...params} />
                                )}
                              />
                            </LocalizationProvider>
                          </Grid>
                          <Button variant="contained" fullWidth>
                            Update
                          </Button>
                        </Grid>
                      </Box>
                      {/* END - MOBILE SEARCH */}
                    </>
                  </Container>
                </Box>
              )}
              {/* END - DROPDOWN MENU */}
            </>
          ) : (
            // START - COMPUTER SEARCH
            <Box
              sx={{
                bgcolor: 'background.paper',
                pt: 2,
                pb: 2,
                borderTop: '1px solid #e0e0e0',
                borderBottom: '1px solid #e0e0e0',
              }}
            >
              <Container maxWidth="md">
                <Grid container>
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-evenly',
                      alignItems: 'center',
                    }}
                  >
                    <Box
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Typography variant="h6" fontWeight="bold">
                        {' '}
                        Your stay
                      </Typography>

                      <FaCalendarAlt
                        style={{ fontSize: '20px', margin: '0px 10px' }}
                      />

                      <Typography variant="body1">
                        Thu, Nov17 - Fri, Nov 18,2022
                        <span style={{ opacity: '55%' }}> (1 night)</span>
                      </Typography>
                    </Box>
                    <Divider orientation="vertical" variant="middle" flexItem />
                    <Box
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <FaUserFriends
                        style={{ fontSize: '20px', margin: '0px 10px' }}
                      />
                      <Typography variant="body1">1 Room, 1 Adult</Typography>
                    </Box>
                    <Divider orientation="vertical" variant="middle" flexItem />

                    <Button variant="outlined" size="small">
                      Edit Stay
                    </Button>
                  </Grid>
                </Grid>
              </Container>
            </Box>
            // END - COMPUTER SEARCH
          )}
        </main>
      </ThemeProvider>
    </>
  );
}
