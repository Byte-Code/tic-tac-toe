
import firebase from 'firebase/app';
require('firebase/database');

var config = {
    apiKey: "AIzaSyAu8KeEUs8fQARDbhrHcnOrXDEuoHJdNPg",
    authDomain: "tic-tac-toe-cde6b.firebaseapp.com",
    databaseURL: "https://tic-tac-toe-cde6b.firebaseio.com",
    projectId: "tic-tac-toe-cde6b",
    storageBucket: "",
    messagingSenderId: "755872751196"
};

firebase.initializeApp(config);

export default firebase;