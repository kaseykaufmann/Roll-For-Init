import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Form, Field } from "react-final-form";
import { login } from "../../actions";

import "./styles.css";

const reduxField = ({ placeholder, input, meta }) => (
  <div className="input-group mb-3">
    <input {...input} className="form-control" placeholder={placeholder} />
    {meta.error && meta.touched && (
      <span style={{ width: "100%", color: "red" }}>{meta.error}</span>
    )}
  </div>
);

const Login = () => {
  const dispatch = useDispatch();
  const onSubmit = values => {
    dispatch(login(values));
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
          if (!values.email) {
            errors.email = "Required";
          }
          if (!values.password) {
            errors.password = "Required";
          }
          return errors;
        }}
        render={({ handleSubmit, form, submitting, pristine, values }) => (
          <form onSubmit={handleSubmit} className="needs-validation input-form">
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
              {/* <Link to="/dashboard"> */}
              <button
                type="submit"
                disabled={submitting || pristine}
                className="btn btn-lg top-buttons"
              >
                Log In
              </button>
              {/* </Link> */}
            </div>
          </form>
        )}
      />
    </div>
  );
};

export default Login;
