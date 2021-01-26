import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { render } from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import App from "./components/App/App";
import NotFound from "./components/App/NotFound";
import LandingPage from "./components/LandingPage";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Upload from "./components/Upload";
import Create from "./components/Create";

render(
  <Router>
    <App>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/upload" component={Upload} />
        <Route exact path="/create" component={Create} />
        <Route component={NotFound} />
      </Switch>
    </App>
  </Router>,
  // eslint-disable-next-line no-undef
  document.getElementById("app")
);
