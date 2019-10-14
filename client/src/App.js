import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
import { clearCurrentProfile } from './actions/profileActions';
import { Provider } from 'react-redux';
import store from './store';

import PrivateRoute from './components/common/PrivateRoute';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';
import CreateProfle from './components/create-profile/CreateProfile';

import './App.css';

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

    // clear user profile
    store.dispatch(clearCurrentProfile());

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
            {/* All private routes are wrapped in Switch to prevent redirect issues */}
            <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/create-profile" component={CreateProfle} />
            </Switch>
          </div>
          <Footer />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
