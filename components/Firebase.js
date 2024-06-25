import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDg3Twz0mNOR0X0v3y3Ue0j8Op5mGYKd24",
  authDomain: "mobile-app-native-19fc6.firebaseapp.com",
  projectId: "mobile-app-native-19fc6",
  storageBucket: "mobile-app-native-19fc6.appspot.com",
  messagingSenderId: "910280192515",
  appId: "1:910280192515:web:0dc87093caea732ea25436",
  measurementId: "G-E63FKE4XL0",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
