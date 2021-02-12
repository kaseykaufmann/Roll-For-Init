import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Form, Field } from "react-final-form";
import { signUp } from "../../actions";

import "./styles.css";

const reduxField = ({ placeholder, input, meta }) => (
  <div className="input-group mb-3">
    <input {...input} className="form-control" placeholder={placeholder} />
    {meta.error && meta.touched && (
      <span style={{ width: "100%", color: "red" }}>{meta.error}</span>
    )}
  </div>
);

const SignUp = () => {
  const dispatch = useDispatch();
  const onSubmit = values => {
    dispatch(signUp(values));
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
        validate={values => {
          const errors = {};
          if (!values.username) {
            errors.username = "Required";
          }
          if (!values.email) {
            errors.email = "Required";
          }
          if (!values.password) {
            errors.password = "Required";
          }
          if (!values.confirmPassword) {
            errors.confirmPassword = "Required";
          } else if (values.confirmPassword !== values.password) {
            errors.confirmPassword = "Password Do Not Match";
          }
          return errors;
        }}
        render={({ handleSubmit, form, submitting, pristine, values }) => (
          <form onSubmit={handleSubmit} className="needs-validation input-form">
            <Field
              type="text"
              name="username"
              component={reduxField}
              placeholder="Username"
            />
            <Field
              type="text"
              name="email"
              component={reduxField}
              placeholder="Email"
            />
            <Field
              type="password"
              name="password"
              component={reduxField}
              placeholder="Password"
            />
            <Field
              type="password"
              name="confirmPassword"
              component={reduxField}
              placeholder="Confirm Password"
            />
            <div className="d-grid gap-2">
              <Link to="/">
                <button
                  type="button"
                  onClick={form.reset}
                  className="btn btn-lg top-buttons"
                  disabled={submitting}
                >
                  Back
                </button>
              </Link>
              <button
                type="submit"
                disabled={submitting || pristine}
                className="btn btn-lg top-buttons"
              >
                Sign Up
              </button>
            </div>
          </form>
        )}
      />
    </div>
  );
};

export default SignUp;
