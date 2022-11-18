import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useParams } from 'react-router-dom';
import helperFn from '../../../utils/helperFn';
import { ToastContainer } from 'react-toastify';
import { toastAlertFail, toastAlertSuccess } from '../../../utils/helperFn';
import * as yup from 'yup';
import axios from 'axios';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as API from '../../../constants/api';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Casa 3
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function UpdatePassword() {
  const navigate = useNavigate();
  let { tokenId } = useParams();

  const [confirmPassword, setConfirmPassword] = React.useState();

  const schema = yup
    .object()
    .shape({
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

  const submitForgotPassword = (data) => {
    if (confirmPassword.confirmPassword !== data.password) {
      return toastAlertFail('Passwords must match');
    }
    axios
      .post(`${API.BASE_URL}/resetPassword/${tokenId}`, data)
      .then((res) => {
        if (res.data.success) {
          toastAlertSuccess(res.data.message);
          setTimeout(() => navigate('/login'), 4000);

          // if (res.data.data.type === 2) navigate('/admin/products');
        }
      })
      .catch((error) => {
        console.log(
          '🚀 ~ file: forgot-password-body.component.jsx ~ line 90 ~ submitForgotPassword ~ error',
          error
        );
        if (error) {
          return toastAlertFail(
            'This email is expired. Please use the latest email'
          );
        }
      });
  };
  return (
    <form onSubmit={handleSubmit(submitForgotPassword)}>
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
              Update Password
            </Typography>
            <Box noValidate sx={{ mt: 1, width: '100%' }}>
              <Box>
                <Controller
                  control={control}
                  name="password"
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="password"
                      label="Password"
                      name="password"
                      type="password"
                      autoComplete="password"
                      autoFocus
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
              <Box>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  id="confirmPassword"
                  autoComplete="confirm-password"
                  onChange={(e) =>
                    setConfirmPassword({
                      ...confirmPassword,
                      [e.target.name]: e.target.value,
                    })
                  }
                />
              </Box>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Update Password
              </Button>
              <ToastContainer />
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </ThemeProvider>
    </form>
  );
}
