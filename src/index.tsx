import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import firebase from 'firebase/app';

import App from './App';
import FirebaseApp from './FirebaseApp';
import { ThemeContext } from './contexts';
import novelshelfTheme from './theme';
import firebaseConfig from './firebase-config';
import reportWebVitals from './reportWebVitals';

import 'semantic-ui-css/semantic.min.css';
import './index.css';

firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <BrowserRouter>
    <FirebaseApp>
      <ThemeContext.Provider value={novelshelfTheme}>
        <App />
      </ThemeContext.Provider>
    </FirebaseApp>
  </BrowserRouter>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
