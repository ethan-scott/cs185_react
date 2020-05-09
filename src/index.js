import * as React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as firebase from 'firebase';
import firebaseConfig from './firebase.config';
import * as serviceWorker from './serviceWorker';

if(!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

ReactDOM.render(
    <App />,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
