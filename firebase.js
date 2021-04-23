import * as firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';

var firebaseConfig = {
    apiKey: "AIzaSyCZF3da58C5M0mzBVOtzkfUlV9zySur5bs",
    authDomain: "mobiledev-chat.firebaseapp.com",
    projectId: "mobiledev-chat",
    storageBucket: "mobiledev-chat.appspot.com",
    messagingSenderId: "891962163562",
    appId: "1:891962163562:web:a6521e6a8dd639d4872513",
    measurementId: "G-412DVCNJH9"
};

let app;
if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig);
}else{
    app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();
export{db,auth};