import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import { toastAlertFail, toastAlertSuccess } from '../../../utils/helperFn';
import * as API from '../../../constants/api';
import {
  Card,
  CardContent,
  CardMedia,
  FormControl,
  FormControlLabel,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const theme = createTheme();

export default function RequestReset() {
  const TOKEN = localStorage.getItem('token');

  const dataUser = JSON.parse(localStorage.getItem('userInfo'));
  const [userInfo, setUserInfo] = useState(dataUser);
  const [selectedFile, setSelectedFile] = useState();
  const [confirmPassword, setConfirmPassword] = React.useState();

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const [values, setValues] = React.useState({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  });
  // open/hide password input
  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const schema = yup
    .object()
    .shape({
      email: yup.string().required('Email is a required field').email(),
      fullName: yup.string(),
      phone: yup.string(),
      address: yup.string(),
      birthday: yup.date(),
    })
    .required();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const submitProfile = (data) => {
    axios({
      method: 'put',
      url: API.EDIT_PROFILE,
      data,
      headers: { authorization: `Bearer ${TOKEN}` },
      withCredentials: true,
    })
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
  const uploadAvatar = async () => {
    const formData = new FormData();
    formData.append('avatar', selectedFile);
    // const config = {
    //   headers: {
    //     'content-type': 'multipart/form-data',
    //   },
    // };
    // const result = await axios.put(API.UPLOAD_AVATAR, formData, config);
    // console.log(
    //   '🚀 ~ file: profile-body.component.jsx ~ line 126 ~ uploadAvatar ~ result',
    //   result
    // );
    await axios({
      method: 'put',
      url: API.UPLOAD_AVATAR,
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((res) => {
        console.log(
          '🚀 ~ file: profile-body.component.jsx ~ line 126 ~ uploadAvatar ~ res',
          res
        );
        return toastAlertSuccess(res.data.message);
      })
      .catch((error) => console.log(error));
  };
  return (
    <form onSubmit={handleSubmit(submitProfile)}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <ThemeProvider theme={theme}>
          <Container
            maxWidth="md"
            sx={{
              py: 5,
            }}
          >
            {/* End hero unit */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'end',
              }}
            >
              <div
                style={{
                  boxSizing: 'border-box',
                  padding: '0px',
                  margin: '0px',
                }}
              >
                <Typography variant="h6" gutterBottom>
                  Edit Profile
                </Typography>
                <Grid container wrap sx={{ display: 'flex' }}>
                  <React.Fragment>
                    <Grid container spacing={3} sm={12}>
                      <Grid item xs={12} sm={6} md={6}>
                        <Card
                          sx={{
                            maxWidth: 345,
                            marginLeft: '20px',
                            maxHeight: '345px',
                          }}
                        >
                          <CardMedia
                            component="img"
                            height="200"
                            // image="http://placehold.it/"
                            // src={!selectedFile ? userInfo.avatar : avatar}
                            src="https://static.zara.net/photos///2022/I/T/2/p/0857/431/712/2/w/1247/0857431712_15_1_1.jpg?ts=1658928471883"
                            // alt={data.user.avatar}
                          />

                          <CardContent>
                            {/* <CardActions>
                            <Input type="file" sx={{ focused: 'true' }}></Input>
                          </CardActions> */}
                            <Box textAlign="center">
                              <Button
                                variant="contained"
                                component="label"
                                onChange={uploadAvatar}
                              >
                                Upload File
                                <input
                                  type="file"
                                  hidden
                                  name="avatar"
                                  id="avatar"
                                  className="form-control"
                                  onChange={(e) =>
                                    setSelectedFile(e.target.files[0])
                                  }
                                />
                              </Button>
                            </Box>
                          </CardContent>
                        </Card>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Controller
                          control={control}
                          name="email"
                          defaultValue={userInfo.email}
                          render={({ field }) => (
                            <TextField
                              id="email"
                              name="email"
                              label="Email"
                              fullWidth
                              variant="standard"
                              defaultValue={userInfo.email}
                              {...field}
                            />
                          )}
                        />
                        <Controller
                          control={control}
                          name="fullName"
                          defaultValue={userInfo.fullName}
                          render={({ field }) => (
                            <TextField
                              id="fullName"
                              name="fullName"
                              label="Full name"
                              fullWidth
                              variant="standard"
                              defaultValue={userInfo.fullName}
                              {...field}
                            />
                          )}
                        />
                        <Controller
                          control={control}
                          name="phone"
                          defaultValue={userInfo.phone}
                          render={({ field }) => (
                            <TextField
                              id="phone"
                              name="phone"
                              label="Phone"
                              fullWidth
                              variant="standard"
                              defaultValue={userInfo.phone}
                              {...field}
                            />
                          )}
                        />
                        <Controller
                          control={control}
                          name="address"
                          defaultValue={userInfo.address}
                          render={({ field }) => (
                            <TextField
                              id="address"
                              name="address"
                              label="Address"
                              fullWidth
                              variant="standard"
                              defaultValue={userInfo.address}
                              {...field}
                            />
                          )}
                        />

                        <Box style={{ marginTop: '10px' }}>
                          <Controller
                            control={control}
                            name="birthday"
                            defaultValue={userInfo.birthday}
                            render={({ field }) => (
                              <DatePicker
                                label="birthday"
                                openTo="year"
                                views={['year', 'month', 'day']}
                                renderInput={(params) => (
                                  <TextField {...params} />
                                )}
                                {...field}
                              />
                            )}
                          />
                        </Box>

                        <FormControl style={{ width: '100%' }}>
                          <Typography>Gender</Typography>
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

                        <Button variant="outlined" type="submit">
                          Update Profile
                        </Button>
                      </Grid>
                      <Grid item xs={12} sm={12}></Grid>
                      <Grid item xs={12} sm={12}>
                        <Typography variant="h6" gutterBottom>
                          Change Password User
                        </Typography>
                      </Grid>

                      {/* <Grid item xs={12} sm={6}>
                        <InputLabel htmlFor="standard-adornment-password">
                          Password
                        </InputLabel>
                        <Controller
                          control={control}
                          name="password"
                          render={({ field }) => (
                            <Input
                              id="password"
                              type={values.showPassword ? 'text' : 'password'}
                              name="password"
                              fullWidth
                              variant="standard"
                              {...field}
                              endAdornment={
                                <InputAdornment position="end">
                                  <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                  >
                                    {values.showPassword ? (
                                      <Visibility />
                                    ) : (
                                      <VisibilityOff />
                                    )}
                                  </IconButton>
                                </InputAdornment>
                              }
                            />
                          )}
                        />
                      </Grid> */}
                      <Grid item xs={12} sm={6}>
                        <InputLabel htmlFor="standard-adornment-password">
                          Confirm Password
                        </InputLabel>
                        <Input
                          id="confirmPassword"
                          name="confirmPassword"
                          type={values.showPassword ? 'text' : 'password'}
                          fullWidth
                          variant="standard"
                          onChange={(e) =>
                            setConfirmPassword({
                              ...confirmPassword,
                              [e.target.name]: e.target.value,
                            })
                          }
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                              >
                                {values.showPassword ? (
                                  <Visibility />
                                ) : (
                                  <VisibilityOff />
                                )}
                              </IconButton>
                            </InputAdornment>
                          }
                        />
                      </Grid>
                      <Grid item xs={12} sm={12}>
                        <Button variant="outlined" type="submit">
                          Change Password
                        </Button>
                        <ToastContainer />
                      </Grid>
                    </Grid>
                  </React.Fragment>
                </Grid>
              </div>
            </div>
          </Container>
          {/* <ModalLoading isOpen={loading} /> */}
        </ThemeProvider>
      </LocalizationProvider>
    </form>
  );
}
