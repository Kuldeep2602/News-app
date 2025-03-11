import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "xxxxxxxxxx", // your firebase api key 
  authDomain: "xxxxxxxx",
  projectId: "xxxx",
  storageBucket: "xxxxxxxx", // Fixed URL
  messagingSenderId: "xxxxxxxxxxx",
  appId: "xxxxxxxxxxx",
  measurementId: "xxxxxxx",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
