import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import keys from './config/googleKeys';
import {
  setCurrentUser,
  logoutUser,
  clearCurrentProfile
} from './actions/authActions';

import { Provider } from 'react-redux';
import store from './store.js';

import './App.scss';

import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Footer from './components/layout/Footer';
import Login from './components/user/Login';
import Register from './components/user/Register';
import Account from './components/layout/Account';
import ThankYou from './components/helpers/ThankYou';
import Collection from './components/layout/Collection';

if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    // Clear Profile
    store.dispatch(clearCurrentProfile);
    // Redirect to login
    window.location.href = '/login';
  }
}

const { googleClientID, googleClientSecret } = keys;

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <div className="container">
              <div className="wrapper">
                <Route
                  exact
                  path="/login"
                  component={Login}
                  keys={(googleClientID, googleClientSecret)}
                />
                <Route exact path="/account" component={Account} />
                <Route exact path="/thankyou" component={ThankYou} />
                <Route exact path="/collection" component={Collection} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/" component={Landing} />
              </div>
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
