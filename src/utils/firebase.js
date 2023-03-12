// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  // apiKey: "AIzaSyA1f8PjRFiYsCaF8jgASmPyB1xtehWsHoI",
  // authDomain: "luxury-hotel-7c64b.firebaseapp.com",
  // databaseURL: "https://luxury-hotel-7c64b-default-rtdb.asia-southeast1.firebasedatabase.app",
  // projectId: "luxury-hotel-7c64b",
  // storageBucket: "luxury-hotel-7c64b.appspot.com",
  // messagingSenderId: "23210719245",
  // appId: "1:23210719245:web:96eeaf17681308c2397d44"
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export default firebase.database();