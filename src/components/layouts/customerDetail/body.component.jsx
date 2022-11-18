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

const theme = createTheme();
const initialState = {
  From: moment(new Date()).format('MM/DD/YYYY'),
  To: moment(new Date()).add(1, 'days').format('MM/DD/YYYY'),
  room: '1 Room',
  numberOfGuests: '1 Adult',
};

export default function Body() {
  const navigate = useNavigate();

  let [searchParams, setSearchParams] = useSearchParams();

  const [inputSearch, setInputSearch] = React.useState(initialState);
  const submitSearch = (e) => {
    setSearchParams(inputSearch);
  };
  const [err, setErr] = useState(false);
  const schema = yup
    .object()
    .shape({
      email: yup.string().required('Email is a required field').email(),
      password: yup
        .string()
        .required('Password is a required field')
        .max(32)
        .min(6),
    })
    .required();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
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
                  <Container maxWidth="xl">
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
                        First name
                      </FormLabel>
                      <Box>
                        <Controller
                          control={control}
                          name="fullName"
                          defaultValue=""
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
                        {errors.email && (
                          <Typography variant="body2" color="red">
                            {errors.email.message}
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
                          defaultValue=""
                          render={({ field }) => (
                            <TextField
                              margin="normal"
                              name="email"
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
                          defaultValue=""
                          render={({ field }) => (
                            <TextField
                              margin="normal"
                              name="phone"
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
                          defaultValue=""
                          render={({ field }) => (
                            <TextField
                              margin="normal"
                              name="address"
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
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
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
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}></Grid>
                    <Grid item xs={12} sm={12} md={6}>
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
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}></Grid>
                    <Grid item xs={12} sm={12} md={6}>
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
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={() => {
                          window.scrollTo(0, 0);
                          navigate('/book/reservation/payment');
                        }}
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
                      50 Bach Dang St, Hai Chau District 550000 Da Nang, Vietnam
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Container>
          </Box>
        </main>
      </ThemeProvider>
    </>
  );
}
