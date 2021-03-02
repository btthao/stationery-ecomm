import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyB5d1C6h0kubVLHmA1nCdJP8DGf_kD_x5o",
  authDomain: "stationery-ecomm.firebaseapp.com",
  databaseURL: "https://stationery-ecomm-default-rtdb.firebaseio.com",
  projectId: "stationery-ecomm",
  storageBucket: "stationery-ecomm.appspot.com",
  messagingSenderId: "920045107496",
  appId: "1:920045107496:web:09477662a3ed6464c4781d",
  measurementId: "G-80GQWVWB76",
});

const auth = firebase.auth();

export { auth };
