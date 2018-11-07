import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './reducers/reducers';
import GameContainers from './containers/GameContainers'
import { compose } from 'redux';
import { reactReduxFirebase } from 'react-redux-firebase';
import firebase from 'firebase';

//Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDmpg2u0UDZ43r6L6yKRqzbOYMnleq7DDI",
  authDomain: "trisreact.firebaseapp.com",
  databaseURL: "https://trisreact.firebaseio.com",
  projectId: "trisreact",
  storageBucket: "trisreact.appspot.com",
  messagingSenderId: "652776064586"
}
firebase.initializeApp(firebaseConfig);

//React-redux-firebase options
const config = {
  userProfile: 'users', // firebase root where user profiles are stored
  enableLogging: false, // enable/disable Firebase's database logging
}
  
//Add redux Firebase to compose
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, config)
)(createStore);

//Create store with reducers and initial state
const store = createStoreWithFirebase(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(
  <Provider store ={store}>
    <GameContainers />
  </Provider>, 
  document.getElementById("root")
);


  