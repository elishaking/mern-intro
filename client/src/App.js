import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
import { Provider } from 'react-redux';
import store from './store';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';

import './App.css';
import { decode } from 'punycode';

// Check for Auth Token
if (localStorage.jwtToken) {
  // Set the Auth Token Header
  setAuthToken(localStorage.jwtToken);

  // Decode token and get user info and exp
  const decodedUserData = jwt_decode(localStorage.jwtToken);

  // Set user (call setCurrentUser action using store.dispatch)
  store.dispatch(setCurrentUser(decodedUserData));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decodedUserData.exp < currentTime) {
    // logout user
    store.dispatch(logoutUser());

    // Redirect to login
    window.location.href = '/login';
  }
}

function App() {
  return (
    <Provider store={store} >
      <Router>
        <div className="App">
          <Navbar />
          <Route exact path="/" component={Landing} />
          <div className="container">
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
          </div>
          <Footer />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
