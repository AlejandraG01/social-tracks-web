import React from 'react'
import App from './App'
import LoginSpotify from './LoginSpotify'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import LoginMastodon from './LoginMastodon';

export default function BasicExample() {
    return (
      <Router>
          <Switch>
            <Route exact path="/">
              <App />
            </Route>
            <Route path="/login_spotify">
              <LoginSpotify />
            </Route>
            <Route path="/login_mastodon">
              <LoginMastodon />
            </Route>
          </Switch>
      </Router>
    );
  }