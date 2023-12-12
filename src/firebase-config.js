import { initializeApp } from "firebase/app";
import {getFirestore} from '@firebase/firestore';
import { getAuth } from  'firebase/auth'
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAUIGk8R3GaTs_pKzD5_tHmOvq4OdJoMFU",
  authDomain: "goalkeeperdetail.firebaseapp.com",
  // databaseURL: "https://goalkeeperdetail-default-rtdb.firebaseio.com",
  projectId: "goalkeeperdetail",
  storageBucket: "goalkeeperdetail.appspot.com",
  messagingSenderId: "531759585914",
  appId: "1:531759585914:web:5b4e7f14d9602f29b779c3",
  measurementId: "G-M2XZD0K780"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);