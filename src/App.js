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
import Signup from './pages/signup.page';
import ForgotPassword from './pages/forgot-password/forgotPassword.page';
import VerifyUser from './pages/verify-user.page';
import Profile from './pages/profile.page';
function App() {
  const auth = JSON.parse(localStorage.getItem('userInfo'));
  if(auth) {
    var role = auth ? auth.role : null; 
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

                {role && <Route path="/profile" element={<Profile />} />}
              </Routes>
            </Router>
      </CartProvider>
  );
}

export default App;
