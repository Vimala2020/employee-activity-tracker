import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyD0CzvCd7P2FL93hcCWds2kkG3IX1ZIW98",
  authDomain: "employee-attendance-dd8b5.firebaseapp.com",
  projectId: "employee-attendance-dd8b5",
  storageBucket: "employee-attendance-dd8b5.appspot.com",
  messagingSenderId: "361620545985",
  appId: "1:361620545985:web:8b4edd431e0dedb8a64f40"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export default app