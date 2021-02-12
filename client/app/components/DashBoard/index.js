import React from "react";
import { Link } from "react-router-dom";

export const DashBoard = props => {
  return (
    <div className="container">
      <h1 className="display-1 text-center text-light title">
        DashBoard
        <Link to="/login">
          <button
            type="button"
            className="btn btn-outline-danger log-out-button"
          >
            Log Out
          </button>
        </Link>
      </h1>
    </div>
  );
};

export default DashBoard;
