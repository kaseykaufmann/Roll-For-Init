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
          <span className="input-group-text" id="inputGroup-sizing-default">
            Default
          </span>
          <input
            type="text"
            className="form-control"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-default"
          />
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text" id="inputGroup-sizing-default">
            Default
          </span>
          <input
            type="text"
            className="form-control"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-default"
          />
        </div>
      </div>
      <div className="d-grid gap-2">
        <Link to="/">
          <button type="button" className="btn btn-dark btn-lg buttons">
            Back
          </button>
        </Link>
        <Link to="/signup">
          <button type="button" className="btn btn-info btn-lg buttons">
            Log In
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Login;
