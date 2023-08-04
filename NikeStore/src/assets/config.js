// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { EmailAuthProvider , getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyAyrcheqop3PZB6k_jU1DEuGEDE1ao9Ta4",
  authDomain: "nikestore-d13b6.firebaseapp.com",
  projectId: "nikestore-d13b6",
  storageBucket: "nikestore-d13b6.appspot.com",
  messagingSenderId: "483878945731",
  appId: "1:483878945731:web:b3acf98a4d1fe78e1a3376",
  measurementId: "G-0V54RQJD2G"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth()
const emailProvider = new EmailAuthProvider();
const db = getFirestore(app);

export { db, emailProvider, auth };
