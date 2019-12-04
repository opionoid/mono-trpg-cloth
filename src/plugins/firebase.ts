import * as firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBCl1mcwdRc36uGtkPOPOBNp1qLj5bUQQU",
  authDomain: "mono-trpg-cloth.firebaseapp.com",
  databaseURL: "https://mono-trpg-cloth.firebaseio.com",
  projectId: "mono-trpg-cloth",
  storageBucket: "mono-trpg-cloth.appspot.com",
  messagingSenderId: "1035110927213",
  appId: "1:1035110927213:web:3946d42512b6b5ed546864",
  measurementId: "G-02NB4BDHKQ"
};
firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore();

export default firestore;
