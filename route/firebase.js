import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBtvpldzTd42clMTlthx8MW9hwFqAZ2cC0",
  authDomain: "facebook-clone-1fa7b.firebaseapp.com",
  projectId: "facebook-clone-1fa7b",
  storageBucket: "facebook-clone-1fa7b.appspot.com",
  messagingSenderId: "507750692966",
  appId: "1:507750692966:web:3680ab58e3f124aaad55a7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
