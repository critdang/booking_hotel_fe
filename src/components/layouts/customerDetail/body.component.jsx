import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import {
  Typography,
  Grid,
  Button,
  TextField,
  FormControl,
  FormLabel,
  Stepper,
  Step,
  StepLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
import * as React from 'react';
import moment from 'moment';
import { useSearchParams } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Controller, useForm } from 'react-hook-form';
import { useState } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import FormControlLabel from '@mui/material/FormControlLabel';
import { toastAlertFail, toastAlertSuccess } from '../../../utils/helperFn';
import axios from 'axios';
import * as API from '../../../constants/api';

const theme = createTheme();
const initialState = {
  From: moment(new Date()).format('MM/DD/YYYY'),
  To: moment(new Date()).add(1, 'days').format('MM/DD/YYYY'),
  room: '1 Room',
  numberOfGuests: '1 Adult',
};
const steps = ['Choose room', 'Fill information', 'Payment and Overall order'];

export default function Body() {
  const [activeStep, setActiveStep] = React.useState(1);
  const navigate = useNavigate();
  const dataUser = JSON.parse(localStorage.getItem('userInfo'));
  const [userInfo, setUserInfo] = useState(dataUser);
  let [searchParams, setSearchParams] = useSearchParams();

  const [inputSearch, setInputSearch] = React.useState(initialState);
  const submitSearch = (e) => {
    setSearchParams(inputSearch);
  };
  const [err, setErr] = useState(false);
  const schema = yup
    .object()
    .shape({
      fullName: yup.string().required('Full name is a required field'),
      email: yup.string().required('Email is a required field').email(),
      phone: yup.number().required('Phone is a required field'),
      address: yup.string().required('Address is a required field'),
      gender: yup.string(),
    })
    .required();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const submitGuest = (data) => {
    sessionStorage.setItem('guestInfo', JSON.stringify(data));
    window.scrollTo(0, 0);
    navigate('/book/reservation/payment');
  };
  return (
    <form onSubmit={handleSubmit(submitGuest)}>
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
                    <Container maxWidth="xl">
                      <Box
                        sx={{
                          width: '100%',
                          my: 2,
                          display: { xs: 'block', md: 'none', lg: 'none' },
                        }}
                      >
                        <Stepper activeStep={activeStep}>
                          {steps.map((label, index) => {
                            const stepProps = {};
                            const labelProps = {};
                            return (
                              <Step key={label} {...stepProps}>
                                <StepLabel {...labelProps}>{label}</StepLabel>
                              </Step>
                            );
                          })}
                        </Stepper>
                      </Box>
                      <Typography
                        variant="h4"
                        fontWeight="bold"
                        sx={{ borderBottom: '4px solid rgb(0,156,222)' }}
                      >
                        Guest Details
                      </Typography>
                      <Grid item xs={12} sm={12} md={6}>
                        <FormLabel
                          sx={{ color: 'rgba(0,0,0,1)', fontWeight: 'bold' }}
                        >
                          Full name
                        </FormLabel>
                        <Box>
                          <Controller
                            control={control}
                            name="fullName"
                            defaultValue={userInfo.fullName}
                            render={({ field }) => (
                              <TextField
                                margin="normal"
                                name="fullName"
                                autoFocus
                                {...field}
                                fullWidth
                              />
                            )}
                          />
                          {errors.fullName && (
                            <Typography variant="body2" color="red">
                              {errors.fullName.message}
                            </Typography>
                          )}
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={12} md={6}></Grid>
                      <Grid item xs={12} sm={12} md={6}>
                        <FormLabel
                          sx={{ color: 'rgba(0,0,0,1)', fontWeight: 'bold' }}
                        >
                          Email
                        </FormLabel>
                        <Box>
                          <Controller
                            control={control}
                            name="email"
                            defaultValue={userInfo.email}
                            render={({ field }) => (
                              <TextField
                                margin="normal"
                                name="email"
                                {...field}
                                fullWidth
                              />
                            )}
                          />
                          {errors.email && (
                            <Typography variant="body2" color="red">
                              {errors.email.message}
                            </Typography>
                          )}
                          {err && (
                            <Typography variant="body2" color="red">
                              Username or password is incorrect
                            </Typography>
                          )}
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={12} md={6}>
                        <FormLabel
                          sx={{ color: 'rgba(0,0,0,1)', fontWeight: 'bold' }}
                        >
                          Phone
                        </FormLabel>
                        <Box>
                          <Controller
                            control={control}
                            name="phone"
                            defaultValue={userInfo.phone}
                            render={({ field }) => (
                              <TextField
                                margin="normal"
                                name="phone"
                                {...field}
                                fullWidth
                              />
                            )}
                          />
                          {errors.phone && (
                            <Typography variant="body2" color="red">
                              {errors.phone.message}
                            </Typography>
                          )}
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={12} md={6}></Grid>
                      <Grid item xs={12} sm={12} md={6}>
                        <FormLabel
                          sx={{ color: 'rgba(0,0,0,1)', fontWeight: 'bold' }}
                        >
                          Address
                        </FormLabel>
                        <Box>
                          <Controller
                            control={control}
                            name="address"
                            defaultValue={userInfo.address}
                            render={({ field }) => (
                              <TextField
                                margin="normal"
                                name="address"
                                {...field}
                                fullWidth
                              />
                            )}
                          />
                          {errors.address && (
                            <Typography variant="body2" color="red">
                              {errors.address.message}
                            </Typography>
                          )}
                        </Box>
                      </Grid>
                      {/* <Grid item xs={12} sm={12} md={6}>
                      <FormLabel
                        sx={{ color: 'rgba(0,0,0,1)', fontWeight: 'bold' }}
                      >
                        Coutry/Region
                      </FormLabel>
                      <Box>
                        <Controller
                          control={control}
                          name="country"
                          defaultValue=""
                          render={({ field }) => (
                            <TextField
                              margin="normal"
                              name="country"
                              {...field}
                              fullWidth
                            />
                          )}
                        />
                        {errors.password && (
                          <Typography variant="body2" color="red">
                            {errors.password.message}
                          </Typography>
                        )}
                        {err && (
                          <Typography variant="body2" color="red">
                            Username or password is incorrect
                          </Typography>
                        )}
                      </Box>
                    </Grid> */}
                      {/* <Grid item xs={12} sm={12} md={6}>
                      <FormLabel
                        sx={{ color: 'rgba(0,0,0,1)', fontWeight: 'bold' }}
                      >
                        City
                      </FormLabel>
                      <Box>
                        <Controller
                          control={control}
                          name="city"
                          defaultValue=""
                          render={({ field }) => (
                            <TextField
                              margin="normal"
                              name="city"
                              {...field}
                              fullWidth
                            />
                          )}
                        />
                        {errors.password && (
                          <Typography variant="body2" color="red">
                            {errors.password.message}
                          </Typography>
                        )}
                        {err && (
                          <Typography variant="body2" color="red">
                            Username or password is incorrect
                          </Typography>
                        )}
                      </Box>
                    </Grid> */}
                      {/* <Grid item xs={12} sm={12} md={6}>
                      <FormLabel
                        sx={{ color: 'rgba(0,0,0,1)', fontWeight: 'bold' }}
                      >
                        State
                      </FormLabel>
                      <Box>
                        <Controller
                          control={control}
                          name="state"
                          defaultValue=""
                          render={({ field }) => (
                            <TextField
                              margin="normal"
                              name="state"
                              {...field}
                              fullWidth
                            />
                          )}
                        />
                        {errors.password && (
                          <Typography variant="body2" color="red">
                            {errors.password.message}
                          </Typography>
                        )}
                        {err && (
                          <Typography variant="body2" color="red">
                            Username or password is incorrect
                          </Typography>
                        )}
                      </Box>
                    </Grid> */}
                      <Grid item xs={12} sm={12} md={6}>
                        <FormControl style={{ width: '100%' }}>
                          <Typography sx={{ fontWeight: 'bold' }}>
                            Gender
                          </Typography>
                          <Controller
                            control={control}
                            name="gender"
                            defaultValue={userInfo.gender}
                            render={({ field }) => (
                              <RadioGroup
                                style={{
                                  display: 'flex',
                                  flexDirection: 'row',
                                }}
                                {...field}
                              >
                                <FormControlLabel
                                  value="female"
                                  control={<Radio />}
                                  label="Female"
                                />
                                <FormControlLabel
                                  value="male"
                                  control={<Radio />}
                                  label="Male"
                                />
                                <FormControlLabel
                                  value="other"
                                  control={<Radio />}
                                  label="Other"
                                />
                              </RadioGroup>
                            )}
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={12} md={6}>
                        <Button
                          type="submit"
                          fullWidth
                          variant="contained"
                          sx={{ mt: 3, mb: 2 }}
                          onClick={submitGuest}
                        >
                          Continue payment
                        </Button>
                      </Grid>
                    </Container>
                    <ToastContainer />
                  </Grid>
                  <Grid item xs={12} sm={12} md={1}></Grid>
                  <Grid item xs={12} sm={12} md={3}>
                    <Box>
                      <img
                        src="https://www.hilton.com/im/en/DADDVHI/9210432/daddv-the-sail-2.jpg?impolicy=crop&cw=5428&ch=2822&gravity=NorthWest&xposition=0&yposition=88&rw=750&rh=390"
                        style={{ width: '100%', borderRadius: '10px' }}
                      ></img>
                      <Typography variant="h6" fontWeight="bold">
                        Hilton Da Nang
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ textDecoration: 'underline' }}
                      >
                        50 Bach Dang St, Hai Chau District 550000 Da Nang,
                        Vietnam
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        width: '100%',
                        mt: 2,
                        display: { xs: 'none', md: 'block', lg: 'block' },
                      }}
                    >
                      <Stepper activeStep={activeStep} orientation="vertical">
                        {steps.map((label, index) => {
                          const stepProps = {};
                          const labelProps = {};
                          return (
                            <Step key={label} {...stepProps}>
                              <StepLabel {...labelProps}>
                                {label}
                                {label == 'Choose room' && (
                                  <div>
                                    <Button
                                      sx={{
                                        border: 'none',
                                        backgroundColor: 'white',
                                        textDecoration: 'underline',
                                        textTransform: 'none',
                                        p: 0,
                                      }}
                                      onClick={() => {
                                        window.scrollTo(0, 0);
                                        navigate('/book/reservation/rooms');
                                      }}
                                    >
                                      Edit room
                                    </Button>
                                  </div>
                                )}
                              </StepLabel>
                            </Step>
                          );
                        })}
                      </Stepper>
                    </Box>
                  </Grid>
                </Grid>
              </Container>
            </Box>
          </main>
        </ThemeProvider>
      </>
    </form>
  );
}
