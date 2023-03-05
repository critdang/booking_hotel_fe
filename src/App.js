import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Switch
} from "react-router-dom";
import { useState,useEffect } from "react";

import HomePage from './pages/home.page';
import ActivitiesPage from './pages/activities.page';
import About from './pages/about.page';
import Location from './pages/location.page';
import Cart from './pages/cart.page';
import Room from './pages/room.page'
import CartProvider from './context/cart/cart.provider';
import RequestReset from './pages/forgot-password/requestReset.page'
import ResetPassword from './pages/forgot-password/reset-password.page'
import Login from './pages/login.page';
import ReservationRoom from './pages/createOrder/reservation-room.page';
import ForgotPassword from './pages/forgot-password/forgotPassword.page';
import VerifyUser from './pages/verify-user.page';
import Profile from './pages/profile.page';
import Signup from './pages/signup.page';
import Payment from './pages/createOrder/payment.page';
import { useAuth } from "./context/auth/auth";
import CustomerDetail from './components/layouts/customerDetail';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  loading: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
}));
function App() {
  const classes = useStyles();
  const {signed, setSigned } = useAuth();
  const [loading, setLoading] = useState(false);
  
  return (
      <CartProvider>
        {loading && <div className={classes.loading}> <CircularProgress /> </div>} {/* Show loading spinner if loading is true */}
          <Router>
            <Routes>
              <Route path="/" element={<HomePage setLoading={setLoading}/>} />
              <Route path="/activities" element={<ActivitiesPage setLoading={setLoading}/>} />
              <Route path="/about" element={<About setLoading={setLoading}/>} />
              <Route path="/location" element={<Location setLoading={setLoading}/>} />
              <Route path="/cart" element={<Cart setLoading={setLoading}/>} />
              <Route path="/room" element={<Room setLoading={setLoading}/>} />
              <Route path="/requestReset" element={<RequestReset setLoading={setLoading}/>} />
              <Route path="/resetPassword" element={<ResetPassword setLoading={setLoading}/>} />
              <Route path="/forgotPassword/verify/:tokenId" element={<ForgotPassword setLoading={setLoading}/>} />
              <Route path="/verify/:tokenId" element={<VerifyUser setLoading={setLoading}/>} />
              <Route path="/login" element={<Login setLoading={setLoading}/>} />
              <Route path="/signup" element={<Signup setLoading={setLoading}/>} />
              {signed && <Route path="/profile" element={<Profile setLoading={setLoading}/>} />}
              {/* Start - Create Order */}
              <Route path="/book/reservation/rooms/" element={<ReservationRoom setLoading={setLoading}/>} />
              <Route path="/book/reservation" element={<CustomerDetail setLoading={setLoading}/>} />
              <Route path="/book/reservation/payment" element={<Payment setLoading={setLoading}/>} />
              {/* End - Create Order */}
            </Routes>
          </Router>
    </CartProvider>
  );
}

export default App;
