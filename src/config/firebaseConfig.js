import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBbn7hpxfQcHqIzShu2QPTwvSixwlHey3U",
  authDomain: "alap-b6ff7.firebaseapp.com",
  projectId: "alap-b6ff7",
  storageBucket: "alap-b6ff7.appspot.com",
  messagingSenderId: "92800970549",
  appId: "1:92800970549:web:0c5955226546832530a67c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default firebaseConfig