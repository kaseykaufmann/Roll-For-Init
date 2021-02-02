import React from "react";
import { Link } from "react-router-dom";

import "./styles.css";

const Login = () => {
  return (
    <div className="container">
      <div className="filler-space"></div>
      <div className="row align-items-center">
        <div className="col"></div>
        <div className="col-6 logo"></div>
        <div className="col"></div>
      </div>
      <div className="input-form">
        <div className="input-group mb-3">
          <input type="text" className="form-control" placeholder="Email" />
        </div>
        <div className="input-group mb-3">
          <input type="text" className="form-control" placeholder="Password" />
        </div>
      </div>
      <div className="d-grid gap-2">
        <Link to="/">
          <button type="button" className="btn btn-lg top-buttons">
            Back
          </button>
        </Link>
        <Link to="/dashboard">
          <button type="button" className="btn btn-lg top-buttons">
            Log In
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Login;
