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
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  CardContent,
  CardMedia,
  Card,
  Divider,
  RadioGroup,
  FormControlLabel,
  Radio,
  Modal,
  DialogContentText,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import * as React from 'react';
import moment from 'moment';
import axios from 'axios';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Controller, useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import * as API from '../../../constants/api';

import {
  FaAward,
  FaCcMastercard,
  FaCcVisa,
  FaPercent,
  FaRegCreditCard,
} from 'react-icons/fa';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import '../../../assets/css/payment/payment.css';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { toastAlertFail, toastAlertSuccess } from '../../../utils/helperFn';

const initialState = {
  From: moment(new Date()).format('MM/DD/YYYY'),
  To: moment(new Date()).add(1, 'days').format('MM/DD/YYYY'),
  room: '1 Room',
  numberOfGuests: '1 Adult',
};

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

const styleModal = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1200,
  bgcolor: 'white',
  borderRadius: '25px',
  boxShadow: 24,
  p: 4,
};

export default function Body({ props, setLoading }) {
  // [START - GET ROOMS AND ALTER DATA ]
  const rooms = JSON.parse(sessionStorage.getItem('rooms'));
  let totalRoomCharge = 0;
  rooms.map((room) => (totalRoomCharge += room.price));
  let totalTaxes = totalRoomCharge * 0.08;
  const totalFee = {
    totalRoomCharge: totalRoomCharge,
    totalTaxes,
    totalFees: 0,
    total: totalTaxes + totalRoomCharge,
  };

  // [END - GET ROOMS AND ALTER DATA ]

  // [START - GET SEARCH PARAMS]
  const search = JSON.parse(sessionStorage.getItem('searchInfo'));
  const searchInfo = {
    From: search.From,
    To: search.To,
    rooms: search.room,
    guests: search.adults + search.kids,
  };

  // [END - GET SEARCH PARAMS]

  // Start config
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [openEdit, setOpenEdit] = React.useState(false);
  const TOKEN = JSON.parse(localStorage.getItem('token'));

  const navigate = useNavigate();
  // End config

  // Start config responsive
  const theme = useTheme();
  const mobileView = useMediaQuery(theme.breakpoints.down('sm'));
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  // End config responsive

  const options = [
    { label: 'Lifestyle', value: 'lifestyle' },
    { label: 'Area', value: 'area' },
    { label: 'Random', value: 'random' },
    { label: 'Comedy', value: 'comedy' },
    { label: 'Entertainment', value: 'entertainment' },
  ];
  const [openRules, setOpenRules] = React.useState(false);
  const handleOpenRules = () => setOpenRules(true);
  const handleCloseRules = () => setOpenRules(false);

  const [paymentMethod, setPaymentMethod] = useState('VISA');

  const [err, setErr] = useState(false);
  const schema = yup
    .object()
    .shape({
      cardName: yup.string().required('Please provide your name'),
      cardNumber: yup
        .number()
        .typeError('Card Number must be a number')
        .required('Please provide your card number'),
      expiryDate: yup
        .date()
        .typeError('Expiry Date must be a number')
        .required('Please provide your card date'),
      cardCVV: yup
        .number()
        .typeError('CVV must be a number')
        .required('Please provide your card cvv'),
    })
    .required();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  console.log(
    '🚀 ~ file: body.component.jsx ~ line 140 ~ Body ~ errors',
    errors
  );

  const submitOrder = (rawData) => {
    setLoading(true);
    const searchInfo = JSON.parse(sessionStorage.getItem('searchInfo'));
    const payment = {
      cardName: rawData.cardName,
      cardNumber: rawData.cardNumber,
      expiryDate: rawData.expiryDate,
      cardCVV: rawData.cardCVV,
      paymentMethod: paymentMethod,
    };
    const guestInfo = JSON.parse(sessionStorage.getItem('guestInfo'));
    const data = {
      payment,
      rooms,
      guestInfo,
      searchInfo,
    };
    axios({
      method: 'POST',
      url: API.CREATE_ORDER,
      data,
      headers: { authorization: `Bearer ${TOKEN}` },
    })
      .then((res) => {
        if (res.data.success) {
          // potential call 2 times in deveplopment because of React.StrictMode
          toastAlertSuccess(res.data.message);
          setLoading(false);
          navigate('/');
          // return setTimeout(() => navigate('/'), 3000);
        }
      })
      .catch((error) => {
        if (error) {
          if (
            error.response.data.message ===
            'Your token is expired. Please login again'
          ) {
            navigate('/login');
          }
          setLoading(false);
          return toastAlertFail(error.response.data.message);
        }
      });
    // window.scrollTo(0, 0);
  };

  return (
    <form onSubmit={handleSubmit(submitOrder)}>
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
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        borderBottom: '4px solid rgb(0,156,222)',
                        alignItems: 'center',
                      }}
                    >
                      {mobileView ? (
                        <Typography variant="subtitle1" fontWeight="bold">
                          Payment and Detail Order
                        </Typography>
                      ) : (
                        <Typography variant="h4" fontWeight="bold">
                          Payment and Detail Order
                        </Typography>
                      )}

                      <Box>
                        {mobileView ? (
                          <Button onClick={handleClickOpen} size="small">
                            Review booking{' '}
                          </Button>
                        ) : (
                          ''
                        )}

                        <BootstrapDialog
                          onClose={handleClose}
                          aria-labelledby="customized-dialog-title"
                          open={open}
                        >
                          <BootstrapDialogTitle
                            id="customized-dialog-title"
                            onClose={handleClose}
                          >
                            Review Booking
                          </BootstrapDialogTitle>
                          <DialogContent dividers>
                            <Grid container>
                              <Box display="flex">
                                <Grid
                                  item
                                  xs={3}
                                  sm={3}
                                  md={3}
                                  display="flex"
                                  justifyContent="center"
                                  alignItems="flex-start"
                                >
                                  <img src="https://ik.imagekit.io/tvlk/apr-asset/dgXfoyh24ryQLRcGq00cIdKHRmotrWLNlvG-TxlcLxGkiDwaUSggleJNPRgIHCX6/hotel/asset/67744357-4000x4000-FIT_AND_TRIM-fcee105e087e53ad560519228f0d6ac4.jpeg?_src=imagekit&tr=h-80,q-40,w-80"></img>
                                </Grid>
                                <Grid item xs={9} sm={9} md={9}>
                                  <Typography variant="h6" fontWeight="bold">
                                    The Secret Garden Hostel
                                  </Typography>
                                  <Grid container>
                                    <Grid item xs={4} sm={4} md={4}>
                                      <Typography
                                        variant="subtitle1"
                                        className="title_paragraph"
                                      >
                                        Check-in
                                      </Typography>
                                      <Typography
                                        variant="subtitle2"
                                        sx={{ fontWeight: 600 }}
                                      ></Typography>
                                      <Typography
                                        variant="subtitle2"
                                        sx={{ fontWeight: 600 }}
                                      >
                                        From 14:00
                                      </Typography>
                                    </Grid>
                                    <Grid item xs={4} sm={4} md={4}>
                                      <Typography
                                        variant="subtitle1"
                                        className="title_paragraph"
                                      >
                                        Check-out
                                      </Typography>
                                      <Typography
                                        variant="subtitle2"
                                        sx={{ fontWeight: 600 }}
                                      >
                                        Sunday, 20 November 2022
                                      </Typography>
                                      <Typography
                                        variant="subtitle2"
                                        sx={{ fontWeight: 600 }}
                                      >
                                        Before 12:00
                                      </Typography>
                                    </Grid>
                                    <Grid item xs={4} sm={4} md={4}>
                                      <Typography
                                        variant="subtitle1"
                                        className="title_paragraph"
                                      >
                                        Duration of Stay
                                      </Typography>
                                      <Typography
                                        variant="subtitle2"
                                        sx={{ fontWeight: 600 }}
                                      >
                                        1 night
                                      </Typography>
                                    </Grid>
                                  </Grid>

                                  <Typography
                                    variant="subtitle1"
                                    className="title_paragraph"
                                  >
                                    Guest Name
                                  </Typography>
                                  <Typography
                                    variant="subtitle2"
                                    sx={{ fontWeight: 600 }}
                                  >
                                    huy huy
                                  </Typography>
                                  <Divider
                                    orientation="horizontal"
                                    flexItem
                                    sx={{ my: 3 }}
                                  ></Divider>
                                </Grid>
                              </Box>
                              <Grid
                                item
                                xs={3}
                                sm={3}
                                md={3}
                                display="flex"
                                justifyContent="center"
                                alignItems="flex-start"
                              >
                                <img src="https://ik.imagekit.io/tvlk/generic-asset/dgXfoyh24ryQLRcGq00cIdKHRmotrWLNlvG-TxlcLxGkiDwaUSggleJNPRgIHCX6/hotel/asset/67744357-4000x4000-FIT_AND_TRIM-dc1091244a30e65600427faf145e9451.jpeg?_src=imagekit&tr=h-80,q-40,w-80"></img>
                              </Grid>
                              <Grid item xs={9} sm={9} md={9}>
                                <Typography variant="h7" fontWeight="bold">
                                  Family Room (1 Room)
                                </Typography>
                                <Grid container>
                                  <Grid item xs={6} sm={6} md={6}>
                                    <Typography
                                      variant="subtitle1"
                                      className="title_paragraph"
                                    >
                                      No. of rooms
                                    </Typography>
                                  </Grid>
                                  <Grid item xs={6} sm={6} md={6}>
                                    <Typography
                                      variant="subtitle2"
                                      sx={{ fontWeight: 600 }}
                                    >
                                      1 Room
                                    </Typography>
                                  </Grid>
                                  <Grid item xs={6} sm={6} md={6}>
                                    <Typography
                                      variant="subtitle1"
                                      className="title_paragraph"
                                    >
                                      Special request
                                    </Typography>
                                  </Grid>
                                </Grid>
                              </Grid>
                            </Grid>
                          </DialogContent>
                        </BootstrapDialog>
                      </Box>
                    </Box>

                    <Grid
                      container
                      sx={{
                        borderBottom: '4px solid rgb(0,156,222)',
                        my: 3,
                        border: '1px solid #e0e0e0',
                        borderRadius: '4px',
                        p: 2,
                      }}
                    >
                      <Grid item xs={6} sm={6} md={6}>
                        <Typography
                          variant="h5"
                          fontWeight="bold"
                          sx={{ color: '#104C97' }}
                        >
                          Total for stay
                        </Typography>
                      </Grid>
                      <Grid item xs={6} sm={6} md={6} textAlign="right">
                        <Typography
                          variant="h5"
                          fontWeight="bold"
                          sx={{ color: '#104C97' }}
                        >
                          {totalFee.total}₫
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={12} md={12}>
                        <Button
                          variant="text"
                          size="small"
                          sx={{ p: 0 }}
                          onClick={() => setOpenEdit((prev) => !prev)}
                        >
                          <Typography
                            variant="body2"
                            sx={{ textDecoration: 'underline' }}
                          >
                            {openEdit
                              ? 'Hide price details'
                              : 'Show price details'}
                          </Typography>
                        </Button>
                      </Grid>
                      {/* START - DROPDOWN PRICE DETAIL */}
                      {openEdit ? (
                        rooms.map((room, index) => (
                          <>
                            <Grid item xs={12} sm={12} md={12}>
                              <Divider flexItem sx={{ my: 1 }}></Divider>
                              <Typography
                                variant="body1"
                                gutterBottom
                                fontWeight="bold"
                              >
                                Room {index + 1}
                              </Typography>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12}>
                              <Typography
                                variant="body2"
                                className="title_paragraph"
                              >
                                {room.roomName}
                              </Typography>
                            </Grid>
                            <Grid item xs={6} sm={6} md={6}>
                              <Typography
                                variant="body2"
                                className="title_paragraph"
                              >
                                {searchInfo.From} - {searchInfo.To}
                              </Typography>
                            </Grid>
                            <Grid item xs={6} sm={6} md={6} textAlign="right">
                              <Typography
                                variant="body2"
                                gutterBottom
                                className="title_paragraph"
                              >
                                {room.price}₫
                              </Typography>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12}>
                              <Button variant="text" size="small" sx={{ p: 0 }}>
                                <Typography
                                  variant="body2"
                                  sx={{ textDecoration: 'underline' }}
                                >
                                  Change room
                                </Typography>
                              </Button>
                            </Grid>
                            <Grid item xs={6} sm={6} md={6}>
                              <Typography
                                variant="body1"
                                gutterBottom
                                fontWeight="bold"
                              >
                                Total room charge
                              </Typography>
                            </Grid>
                            <Grid item xs={6} sm={6} md={6} textAlign="right">
                              <Typography
                                variant="body1"
                                gutterBottom
                                fontWeight="bold"
                              >
                                {totalFee.totalRoomCharge}₫
                              </Typography>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12}>
                              <Typography
                                variant="body2"
                                className="title_paragraph"
                              >
                                Service Charge 5.00 % per room, per stay
                              </Typography>
                            </Grid>
                            <Grid item xs={6} sm={6} md={6}>
                              <Typography
                                variant="body1"
                                gutterBottom
                                fontWeight="bold"
                              >
                                Total fees
                              </Typography>
                            </Grid>
                            <Grid item xs={6} sm={6} md={6} textAlign="right">
                              <Typography
                                variant="body1"
                                gutterBottom
                                fontWeight="bold"
                              >
                                {totalFee.totalFees}₫
                              </Typography>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12}>
                              <Typography
                                variant="body2"
                                className="title_paragraph"
                              >
                                8.00 % per room, per night
                              </Typography>
                            </Grid>
                            <Grid item xs={6} sm={6} md={6}>
                              <Typography
                                variant="body1"
                                gutterBottom
                                fontWeight="bold"
                              >
                                Total taxes
                              </Typography>
                            </Grid>
                            <Grid item xs={6} sm={6} md={6} textAlign="right">
                              <Typography
                                variant="body1"
                                gutterBottom
                                fontWeight="bold"
                              >
                                {totalFee.totalTaxes}₫
                              </Typography>
                            </Grid>
                            <Grid
                              item
                              xs={12}
                              sm={12}
                              md={12}
                              textAlign="right"
                            >
                              <Divider flexItem sx={{ my: 2 }}>
                                {' '}
                              </Divider>
                              <Typography
                                variant="body1"
                                gutterBottom
                                fontWeight="bold"
                              >
                                Total for stay: {totalFee.total}₫
                              </Typography>
                            </Grid>
                          </>
                        ))
                      ) : (
                        <>
                          <Grid item xs={6} sm={6} md={6}>
                            <Typography variant="body2" gutterBottom>
                              Total room charge
                            </Typography>
                          </Grid>
                          <Grid item xs={6} sm={6} md={6}>
                            <Typography
                              variant="body2"
                              gutterBottom
                              textAlign="right"
                            >
                              {totalFee.totalRoomCharge}₫
                            </Typography>
                          </Grid>
                          <Grid item xs={6} sm={6} md={6}>
                            <Typography variant="body2" gutterBottom>
                              Total fees
                            </Typography>
                          </Grid>
                          <Grid item xs={6} sm={6} md={6}>
                            <Typography
                              variant="body2"
                              gutterBottom
                              textAlign="right"
                            >
                              {totalFee.totalFees}₫
                            </Typography>
                          </Grid>
                          <Grid item xs={6} sm={6} md={6}>
                            <Typography variant="body2" gutterBottom>
                              Total taxes
                            </Typography>
                          </Grid>
                          <Grid item xs={6} sm={6} md={6}>
                            <Typography
                              variant="body2"
                              gutterBottom
                              textAlign="right"
                            >
                              {totalFee.totalTaxes}₫
                            </Typography>
                          </Grid>
                        </>
                      )}
                    </Grid>
                    {/* END - DROPDOWN PRICE DETAIL */}
                    <Typography variant="body1" gutterBottom>
                      {' '}
                      All fields are required unless marked optional.
                    </Typography>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        borderBottom: '1px solid rgb(0,0,0,0.2)',
                        pb: 1,
                      }}
                    >
                      <FaRegCreditCard
                        style={{ fontSize: '25px', marginRight: '15px' }}
                      />
                      <Typography variant="h6" fontWeight="bold">
                        Payment
                      </Typography>
                    </Box>
                    <FormControl>
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="VISA"
                        name="radio-buttons-group"
                      >
                        <FormControlLabel
                          value="VISA"
                          control={<Radio />}
                          label="VISA"
                          onClick={() => {
                            setPaymentMethod('VISA');
                          }}
                        />
                        {/* START - PAYMENTMETHOD VISA */}
                        {paymentMethod === 'VISA' && (
                          <Grid container>
                            <Grid
                              item
                              xs={12}
                              sm={12}
                              md={12}
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              sx={{
                                py: 2,
                                backgroundColor: 'rgb(247, 249, 250)',
                              }}
                            >
                              <Typography variant="body2" gutterBottom>
                                We accept the following cards to guarantee your
                                booking.
                              </Typography>
                              <FaCcVisa
                                style={{ fontSize: '30px', margin: '0 10px' }}
                              />
                              <FaCcMastercard style={{ fontSize: '30px' }} />
                              <Divider />
                            </Grid>
                            <Grid item xs={12} md={5}>
                              <FormLabel sx={{ color: 'rgba(0,0,0,1)' }}>
                                Credit Card Name
                              </FormLabel>
                              <Box>
                                <Controller
                                  control={control}
                                  name="cardName"
                                  defaultValue=""
                                  render={({ field }) => (
                                    <TextField
                                      margin="normal"
                                      name="cardName"
                                      label="Name"
                                      {...field}
                                      fullWidth
                                    />
                                  )}
                                />
                                {errors.cardName && (
                                  <Typography variant="body2" color="red">
                                    {errors.cardName.message}
                                  </Typography>
                                )}
                              </Box>
                            </Grid>
                            <Grid item xs={12} md={1}></Grid>
                            <Grid item xs={12} md={5}>
                              <FormLabel sx={{ color: 'rgba(0,0,0,1)' }}>
                                Credit Card Number
                              </FormLabel>
                              <Box>
                                <Controller
                                  control={control}
                                  name="cardNumber"
                                  defaultValue=""
                                  render={({ field }) => (
                                    <TextField
                                      margin="normal"
                                      name="cardNumber"
                                      label="16 digit number"
                                      {...field}
                                      fullWidth
                                    />
                                  )}
                                />
                                {errors.cardNumber && (
                                  <Typography variant="body2" color="red">
                                    {errors.cardNumber.message}
                                  </Typography>
                                )}
                              </Box>
                            </Grid>
                            <Grid item xs={12} md={5}>
                              <FormLabel sx={{ color: 'rgba(0,0,0,1)' }}>
                                Expiry date*
                              </FormLabel>
                              <Box>
                                <Controller
                                  control={control}
                                  name="expiryDate"
                                  defaultValue=""
                                  render={({ field }) => (
                                    <TextField
                                      margin="normal"
                                      name="expiryDate"
                                      label="MM/YY"
                                      fullWidth
                                      {...field}
                                    />
                                  )}
                                />
                                {errors.expiryDate && (
                                  <Typography variant="body2" color="red">
                                    {errors.expiryDate.message}
                                  </Typography>
                                )}
                              </Box>
                            </Grid>
                            <Grid item xs={12} md={1}></Grid>
                            <Grid item xs={12} md={5}>
                              <FormLabel sx={{ color: 'rgba(0,0,0,1)' }}>
                                CVV
                              </FormLabel>
                              <Box>
                                <Controller
                                  control={control}
                                  name="cardCVV"
                                  defaultValue=""
                                  render={({ field }) => (
                                    <TextField
                                      margin="normal"
                                      name="cardCVV"
                                      label="Last three digits on sigature strip"
                                      fullWidth
                                      {...field}
                                    />
                                  )}
                                />
                                {errors.cardCVV && (
                                  <Typography variant="body2" color="red">
                                    {errors.cardCVV.message}
                                  </Typography>
                                )}
                              </Box>
                            </Grid>
                          </Grid>
                        )}
                        {/* END - PAYMENTMETHOD VISA */}

                        <FormControlLabel
                          value="stripe"
                          control={<Radio />}
                          label="Stripe"
                          onClick={() => {
                            setPaymentMethod('Stripe');
                          }}
                        />
                      </RadioGroup>
                    </FormControl>
                    <Divider sx={{ my: 2 }} />
                    <Box sx={{ width: '80%' }}>
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        gutterBottom
                      >
                        Guarantee and Cancellation Policy
                      </Typography>
                      <Typography variant="body1" gutterBottom>
                        There is a credit card required for this reservation.
                        Free cancellation before 11:59 PM local hotel time on 16
                        Nov 2022.
                      </Typography>
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        gutterBottom
                      >
                        By clicking "Book Reservation," I agree to the &nbsp;
                        <Button
                          onClick={handleOpenRules}
                          sx={{
                            border: 'none',
                            backgroundColor: 'white',
                            textDecoration: 'underline',
                            textTransform: 'none',
                            p: 0,
                            fontWeight: 'bold',
                            color: '#104C97',
                          }}
                        >
                          {' '}
                          Rules and Restrictions
                        </Button>
                        {/* START - MODEL RULES AND RESTRICTIONS */}
                        <Dialog
                          fullScreen={fullScreen}
                          maxWidth="lg"
                          open={openRules}
                          onClose={handleCloseRules}
                          aria-labelledby="responsive-dialog-title"
                        >
                          <DialogTitle
                            id="responsive-dialog-title"
                            sx={{ backgroundColor: '#009cde' }}
                          >
                            <IconButton
                              aria-label="close"
                              onClick={handleCloseRules}
                              sx={{
                                position: 'absolute',
                                right: 8,
                                top: 8,
                                // color: (theme) => theme.palette.grey[500],
                                color: 'white',
                              }}
                            >
                              <CloseIcon />
                            </IconButton>
                            <Typography
                              variant="h5"
                              fontWeight="bold"
                              textAlign="center"
                              gutterBottom
                              sx={{ mt: 2 }}
                              color="white"
                            >
                              Rules and Restrictions
                            </Typography>
                          </DialogTitle>
                          <DialogTitle id="responsive-dialog-title"></DialogTitle>

                          <DialogContent>
                            <DialogContentText sx={{ color: 'rgba(0,0,0,1)' }}>
                              <>
                                <Grid container spacing={3}>
                                  <Grid item xs={12} sm={12} md={12}></Grid>

                                  <Grid item xs={12} sm={12} md={6}>
                                    <Typography
                                      variant="body2"
                                      sx={{
                                        color: 'black',
                                      }}
                                      textAlign="left"
                                      gutterBottom
                                    >
                                      At check in, the front desk will verify
                                      your check-out date. Rates quoted are
                                      based on check-in date and length of stay.
                                      Should you choose to depart early, price
                                      is subject to change.
                                      <br />
                                      We reserve the right to cancel or modify
                                      reservations where it appears that a
                                      customer has engaged in fraudulent or
                                      inappropriate activity or under other
                                      circumstances where it appears that the
                                      reservations contain or resulted from a
                                      mistake or error.
                                      <br />
                                      Totals listed here are estimated based on
                                      current taxes and exchange rates (if
                                      applicable) and do not include additional
                                      fees/charges that may be incurred during
                                      your stay.
                                    </Typography>
                                  </Grid>
                                  <Grid item xs={12} sm={12} md={6}>
                                    <Box display="flex" alignItems="center">
                                      <FaPercent
                                        style={{
                                          marginRight: '10px',
                                          border: '2px solid black',
                                          borderRadius: '50%',
                                          fontSize: '24px',
                                          padding: '3px',
                                        }}
                                      />

                                      <Typography
                                        variant="body1"
                                        fontWeight="bold"
                                        gutterBottom
                                      >
                                        Taxes
                                      </Typography>
                                    </Box>
                                    <Typography variant="body2" gutterBottom>
                                      8.00 % per room, per night
                                    </Typography>
                                    <Box display="flex" alignItems="center">
                                      <FaAward
                                        style={{
                                          marginRight: '10px',
                                          fontSize: '22px',
                                        }}
                                      />
                                      <Typography
                                        variant="body1"
                                        fontWeight="bold"
                                        gutterBottom
                                      >
                                        Guarantee and Cancellation Policy
                                      </Typography>
                                    </Box>
                                    <Typography variant="body2" gutterBottom>
                                      There is a credit card required for this
                                      reservation. Free cancellation before
                                      11:59 PM local hotel time on 21 Nov 2022.
                                      <br />
                                      If you use a debit/credit card to check
                                      in, a hold may be placed on your card
                                      account for the full anticipated amount to
                                      be owed to the hotel, including estimated
                                      incidentals, through your date of
                                      check-out and such hold may not be
                                      released for 72 hours from the date of
                                      check-out or longer at the discretion of
                                      your card issuer.
                                    </Typography>
                                  </Grid>
                                </Grid>
                              </>
                            </DialogContentText>
                          </DialogContent>
                        </Dialog>
                        {/* END - MODEL RULES AND RESTRICTIONS */}
                        &nbsp;
                        <Button
                          sx={{
                            border: 'none',
                            backgroundColor: 'white',
                            textDecoration: 'underline',
                            textTransform: 'none',
                            p: 0,
                            fontWeight: 'bold',
                            color: '#104C97',
                          }}
                        >
                          {' '}
                          Site Usage Agreement
                        </Button>
                        &nbsp; and agree that Hilton will collect, use, share
                        and transfer my information as set out in Hilton’s
                        Global Privacy Statement
                      </Typography>
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        gutterBottom
                      >
                        California consumers, click here, Opens new tab to learn
                        about Hilton's collection and use of your personal
                        information.
                      </Typography>
                      <Typography variant="body1" gutterBottom>
                        I also agree to the &nbsp;
                        <Button
                          sx={{
                            border: 'none',
                            backgroundColor: 'white',
                            textDecoration: 'underline',
                            textTransform: 'none',
                            p: 0,
                            fontWeight: 'bold',
                            color: '#104C97',
                          }}
                        >
                          {' '}
                          Hilton Honors Program Terms and Conditions.
                        </Button>
                      </Typography>
                    </Box>
                    <ToastContainer />
                    <Button
                      type="submit"
                      size="large"
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                    >
                      Book Reservation
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={12} md={1}></Grid>
                  {/* START - SIDE OVERALL */}
                  <Grid item xs={12} sm={12} md={3}>
                    <Card>
                      <CardMedia
                        component="img"
                        height="200"
                        src="https://www.hilton.com/im/en/DADDVHI/9210432/daddv-the-sail-2.jpg?impolicy=crop&cw=5428&ch=2822&gravity=NorthWest&xposition=0&yposition=88&rw=750&rh=390"
                        image="https://www.hilton.com/im/en/DADDVHI/9210432/daddv-the-sail-2.jpg?impolicy=crop&cw=5428&ch=2822&gravity=NorthWest&xposition=0&yposition=88&rw=750&rh=390"
                        alt="green iguana"
                      />
                      <CardContent>
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
                        <Divider orientation="horizontal" flexItem />

                        <Grid container sx={{ py: 2 }}>
                          <Grid item xs={6} sm={6} md={6}>
                            <Typography
                              variant="body2"
                              gutterBottom
                              className="title_paragraph"
                            >
                              Duration of Stay
                            </Typography>
                          </Grid>
                          <Grid item xs={6} sm={6} md={6}>
                            <Typography variant="body2" gutterBottom>
                              1 night
                            </Typography>
                          </Grid>
                          <Grid item xs={6} sm={6} md={6}>
                            <Typography
                              variant="body2"
                              gutterBottom
                              className="title_paragraph"
                            >
                              Check-in
                            </Typography>
                          </Grid>
                          <Grid item xs={6} sm={6} md={6}>
                            <Typography variant="body2" gutterBottom>
                              {searchInfo.From} (From 14:00)
                            </Typography>
                          </Grid>
                          <Grid item xs={6} sm={6} md={6}>
                            <Typography
                              variant="body2"
                              gutterBottom
                              className="title_paragraph"
                            >
                              Checkout
                            </Typography>
                          </Grid>
                          <Grid item xs={6} sm={6} md={6}>
                            <Typography variant="body2" gutterBottom>
                              {searchInfo.To} (Before 12:00)
                            </Typography>
                          </Grid>
                          <Grid item xs={6} sm={6} md={6}>
                            <Typography
                              variant="body2"
                              gutterBottom
                              className="title_paragraph"
                            >
                              Room type
                            </Typography>
                          </Grid>
                          <Grid item xs={6} sm={6} md={6}>
                            <Typography variant="body2" gutterBottom>
                              Family Room
                            </Typography>
                          </Grid>
                          <Grid item xs={6} sm={6} md={6}>
                            <Typography
                              variant="body2"
                              gutterBottom
                              className="title_paragraph"
                            >
                              No. of rooms
                            </Typography>
                          </Grid>
                          <Grid item xs={6} sm={6} md={6}>
                            <Typography variant="body2" gutterBottom>
                              {searchInfo.rooms > 1
                                ? `${searchInfo.rooms} Rooms`
                                : `${searchInfo.rooms} Room`}
                            </Typography>
                          </Grid>
                          <Grid item xs={6} sm={6} md={6}>
                            <Typography
                              variant="body2"
                              gutterBottom
                              className="title_paragraph"
                            >
                              Total guests
                            </Typography>
                          </Grid>
                          <Grid item xs={6} sm={6} md={6}>
                            <Typography variant="body2" gutterBottom>
                              {searchInfo.guests > 1
                                ? `${searchInfo.guests}  Guests`
                                : `${searchInfo.guests}  Guest`}
                            </Typography>
                          </Grid>
                        </Grid>
                        <Divider orientation="horizontal" flexItem />
                        <Box sx={{ py: 2 }}>
                          <Typography variant="body1" fontWeight="bold">
                            Lead guest
                          </Typography>
                          <Typography variant="body1">Crit dang</Typography>
                        </Box>
                        <Divider orientation="horizontal" flexItem />
                        <Box sx={{ py: 2 }}>
                          <Typography variant="body1" fontWeight="600">
                            Your Information
                          </Typography>
                          <Typography variant="body1">huy huy</Typography>
                          <Typography variant="body1">+841231654</Typography>
                          <Typography variant="body1">hu@gmail.com</Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                  {/* END - SIDE OVERALL */}
                </Grid>
              </Container>
            </Box>
          </main>
        </ThemeProvider>
      </>
    </form>
  );
}
