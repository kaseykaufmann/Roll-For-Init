import React from "react";
import { Link } from "react-router-dom";
import { Form, Field } from "react-final-form";

import "./styles.css";

const reduxField = props => (
  <div className="input-group mb-3">
    <input
      type="text"
      className="form-control"
      placeholder={props.placeholder}
      required
    />
    <div className="valid-feedback">Looks good!</div>
  </div>
);

const SignUp = () => {
  const onSubmit = values => {
    console.log(values);
  };

  return (
    <div className="container">
      <div className="filler-space"></div>
      <div className="row align-items-center">
        <div className="col"></div>
        <div className="col-6 logo"></div>
        <div className="col"></div>
      </div>
      <Form
        onSubmit={onSubmit}
        // validate={validate}
        render={({ handleSubmit }) => (
          <form
            onSubmit={handleSubmit}
            className="needs-validation input-form"
            noValidate
          >
            <Field
              name="username"
              component={reduxField}
              placeholder="Username"
            />
            <Field name="email" component={reduxField} placeholder="Email" />
            <Field
              name="password"
              component={reduxField}
              placeholder="Password"
            />
            <Field
              name="confirmPassword"
              component={reduxField}
              placeholder="Confirm Password"
            />
            <div className="d-grid gap-2">
              <Link to="/">
                <button type="button" className="btn btn-lg top-buttons">
                  Back
                </button>
              </Link>
              <Link to="/signup">
                <button type="submit" className="btn btn-lg top-buttons">
                  Sign Up
                </button>
              </Link>
            </div>
          </form>
        )}
      />
    </div>
  );
};

export default SignUp;
