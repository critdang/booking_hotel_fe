import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import * as API from '../../constants/api';
import { toastAlertFail } from '../../utils/helperFn';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState();

  useEffect(() => {
    async function loadStorageData() {
      const storageUser = localStorage.getItem('token');
      const storageToken = localStorage.getItem('userInfo');

      if (storageUser && storageToken) {
        setUser(JSON.parse(storageUser));
      }
      setLoading(false);
    }

    loadStorageData();
  }, []);

  const Login = async (data) => {
    axios
      .post(API.LOGIN, data, { withCredentials: true })

      .then((res) => {
        console.log('🚀 ~ file: auth.jsx ~ line 31 ~ .then ~ res', res);
        if (res.data.success) {
          setUser(res.data.message.userInfo);
          localStorage.setItem(
            'token',
            JSON.stringify(res.data.message.accessToken)
          );
          localStorage.setItem(
            'userInfo',
            JSON.stringify(res.data.message.userInfo)
          );
        }
      })

      .catch((error) => {
        console.log(
          '🚀 ~ file: login-body.component.jsx ~ line 68 ~ submitLogin ~ error',
          error
        );
        toastAlertFail(error.response.data.message);
      });
  };

  const Logout = () => {
    localStorage.clear();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ signed: !!user, user, loading, Login, Logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
