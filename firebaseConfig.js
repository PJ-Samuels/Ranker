import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: process.env.APIKEY,
  authDomain: "video-game-rater.firebaseapp.com",
  projectId: "video-game-rater",
  storageBucket: "video-game-rater.appspot.com",
  messagingSenderId: "1079176086963",
  appId: process.env.APPID,
  measurementId: "G-4NG3DTL7K8"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
// const analytics = getAnalytics(app);
export { db };

