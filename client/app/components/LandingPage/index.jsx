import React from "react";
import { Link } from "react-router-dom";

import "./styles.css";

const LandingPage = () => {
  return (
    <div className="container">
      <div className="filler-space"></div>
      <div className="row align-items-center">
        <div className="col"></div>
        <div className="col-6 logo"></div>
        <div className="col"></div>
      </div>
      <div className="d-grid gap-2">
        <Link to="/create">
          <button type="button" className="btn btn-info btn-lg buttons">
            Create
          </button>
        </Link>
        <Link to="/upload">
          <button type="button" className="btn btn-dark btn-lg buttons">
            Upload
          </button>
        </Link>
      </div>
      <div className="d-grid gap-2">
        <Link to="/login">
          <button type="button" className="btn btn-primary btn-lg buttons">
            Login
          </button>
        </Link>
        <Link to="/signup">
          <button type="button" className="btn btn-secondary btn-lg buttons">
            Sign Up
          </button>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
