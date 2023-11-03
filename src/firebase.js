import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "<< YOUR FIREBASE API KEY GOES HERE >>",
  authDomain: "<< YOUR FIREBASE AUTH DOMAIN GOES HERE >>", 
  projectId: "<< YOUR FIREBASE PROJECT ID GOES HERE >>",
  storageBucket: "<< YOUR FIREBASE STORAGE BUCKET GOES HERE >>",
  messagingSenderId: "<< YOUR MESSAGE SENDER ID GOES HERE >>",
  appId: "<< YOUR FIREBASE APP ID GOES HERE >>"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); //

export { //
    db
}