import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { render } from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { rootReducer } from "./reducers";

import App from "./components/App/App";
import NotFound from "./components/App/NotFound";
import LandingPage from "./components/LandingPage";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Upload from "./components/Upload";
import Create from "./components/Create";
import DashBoard from "./components/DashBoard";

import "./styles.scss";

const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware));

const store = createStore(rootReducer, composedEnhancer);

render(
  <Provider store={store}>
    <Router>
      <App>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/upload" component={Upload} />
          <Route exact path="/create" component={Create} />
          <Route exact path="/dashboard" component={DashBoard} />
          <Route component={NotFound} />
        </Switch>
      </App>
    </Router>
  </Provider>,
  // eslint-disable-next-line no-undef
  document.getElementById("app")
);
