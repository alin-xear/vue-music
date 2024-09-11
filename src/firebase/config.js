import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAfclNG9DOpjusmm7YzpLVaOTkAL5NiZCY",
  authDomain: "muso-ninjas-1b10c.firebaseapp.com",
  projectId: "muso-ninjas-1b10c",
  storageBucket: "muso-ninjas-1b10c.appspot.com",
  messagingSenderId: "863657382701",
  appId: "1:863657382701:web:ff4ed9afd6b4fa1fd6f9a4",
};

// init firebase
firebase.initializeApp(firebaseConfig);

// init services
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();
const projectStorage = firebase.storage();

//timestamp
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { projectFirestore, projectAuth, timestamp, projectStorage };
