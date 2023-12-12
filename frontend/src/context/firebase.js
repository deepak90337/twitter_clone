import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAaXVd0R8klxVANv5f6GCdFp5zc1kSaW28",
  authDomain: "twitter-clone-7ceea.firebaseapp.com",
  projectId: "twitter-clone-7ceea",
  storageBucket: "twitter-clone-7ceea.appspot.com",
  messagingSenderId: "455107894750",
  appId: "1:455107894750:web:6d833079c348517fda114f",
  measurementId: "G-C6ZQMMEEJT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
export default app;
