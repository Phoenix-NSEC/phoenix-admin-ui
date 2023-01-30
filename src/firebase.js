// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyALu0BdcGBFdNcK67Hl5V31LZFD4DSM5tI",
    authDomain: "certificates-phoenix.firebaseapp.com",
    projectId: "certificates-phoenix",
    storageBucket: "certificates-phoenix.appspot.com",
    messagingSenderId: "1018574926639",
    appId: "1:1018574926639:web:dc37e30560ae4dab2da7da",
    measurementId: "G-3QNGQDW2V6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

console.log(analytics)