import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import helperFn from '../../../utils/helperFn';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import { toastAlertFail, toastAlertSuccess } from '../../../utils/helperFn';
import { useNavigate } from 'react-router-dom';
import * as API from '../../../constants/api';

const theme = createTheme();

export default function RequestReset() {
  const navigate = useNavigate();

  const schema = yup
    .object()
    .shape({
      email: yup.string().required('Email is a required field').email(),
    })
    .required();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const submitRequestReset = (data) => {
    console.log(
      '🚀 ~ file: request-reset.component.jsx ~ line 44 ~ submitLogin ~ data',
      data
    );
    axios
      .post(API.REQUEST_FORGOT_PASSWORD, data)
      .then((res) => {
        if (res.data.success) {
          toastAlertSuccess(res.data.message);
        }
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
  };
  return (
    <form onSubmit={handleSubmit(submitRequestReset)}>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Forgot Password
            </Typography>
            <Box
              // component="form"
              // noValidate
              // onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Box sx={{ fontWeight: 'medium' }}>
                    <Controller
                      control={control}
                      name="email"
                      defaultValue=""
                      render={({ field }) => (
                        <TextField
                          fullWidth
                          id="email"
                          label="Email Address"
                          name="email"
                          autoComplete="email"
                          sx={{ width: '300px' }}
                          {...field}
                        />
                      )}
                    />
                    {errors.password && (
                      <Typography variant="body2" color="red">
                        {errors.password.message}
                      </Typography>
                    )}
                  </Box>
                </Grid>
                <ToastContainer />
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Submit
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link
                    to="/login"
                    variant="body2"
                    style={{ textDecoration: 'none' }}
                  >
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
        {/* <ModalLoading isOpen={loading} /> */}
      </ThemeProvider>
    </form>
  );
}
