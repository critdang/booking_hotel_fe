import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Switch
} from "react-router-dom";
import { createContext, useMemo, useState } from 'react';

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
function App() {
  const {signed, loading } = useAuth();
  if (loading) {
    return (
      <div>
        <div>Loading...</div>
      </div>
    );
  }
  return (
      <CartProvider>
          <Router>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/activities" element={<ActivitiesPage />} />
              <Route path="/about" element={<About />} />
              <Route path="/location" element={<Location />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/room" element={<Room />} />
              <Route path="/requestReset" element={<RequestReset />} />
              <Route path="/resetPassword" element={<ResetPassword />} />
              <Route path="/forgotPassword/verify/:tokenId" element={<ForgotPassword />} />
              <Route path="/verify/:tokenId" element={<VerifyUser />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              {signed && <Route path="/profile" element={<Profile />} />}
              {/* Start - Create Order */}
              <Route path="/book/reservation/rooms" element={<ReservationRoom />} />
              <Route path="/book/reservation" element={<CustomerDetail />} />
              <Route path="/book/reservation/payment" element={<Payment />} />
              {/* End - Create Order */}
            </Routes>
          </Router>
    </CartProvider>
  );
}

export default App;
