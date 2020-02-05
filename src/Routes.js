import React from "react";
import App from "./App";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

export default function BasicExample() {
  return (
    <Router>
      <Switch>
        <Route path="/">
          <App />
        </Route>
        <Route path="/login_spotify">
          <div />
        </Route>
        <Route path="/login_mastodon">
          <div />
        </Route>
      </Switch>
    </Router>
  );
}
