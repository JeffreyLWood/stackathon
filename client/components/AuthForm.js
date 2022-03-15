import React from "react";
import { connect } from "react-redux";
import { authenticate } from "../store";
import { Navbar } from "./Navbar";
import { useState } from "react";
import { Link } from "react-router-dom";
/**
 * COMPONENT
 */
const AuthForm = (props) => {
  let { name, displayName, handleSubmit, error } = props;

  return (
    <>
      <Navbar />
      <div className="container auth flex flex-row items-center">
        <div className="h-screen flex items-center w-3/6 p-4">
          <h1>Lets Get Started.</h1>
        </div>
        <div className="w-3/6 space-y-4 flex flex-col justify-center">
          <label htmlFor={name}>
            {displayName}
            {displayName === "Sign Up" ? " for" : " to"} your Selected-Work
            account
          </label>
          <form
            className="flex flex-col space-y-4 bg-white"
            onSubmit={handleSubmit}
            name={name}
          >
            <div className="flex justify-between flex-row">
              <label htmlFor="username">
                <small>Username</small>
              </label>
              <input
                name="username"
                type="text"
                className="border-b-2 mx-4 w-4/6"
              />
            </div>
            <div className="flex justify-between flex-row">
              <label htmlFor="password">
                <small>Password</small>
              </label>
              <input
                name="password"
                type="password"
                className="border-b-2 mx-4 w-4/6"
              />
            </div>
            {displayName === "Sign Up" ? (
              <>
                <div className="flex justify-between flex-row">
                  <label htmlFor="email">
                    <small>Email</small>
                  </label>

                  <input
                    name="email"
                    type="text"
                    className="border-b-2 mx-4 w-4/6"
                  />
                </div>

                <div className="flex justify-between flex-row">
                  <label htmlFor="firstName">
                    <small>First Name</small>
                  </label>
                  <input
                    name="firstName"
                    type="text"
                    className="border-b-2 mx-4 w-4/6"
                  />
                </div>
                <div className="flex justify-between flex-row">
                  <label htmlFor="lastName">
                    <small>Last Name</small>
                  </label>
                  <input
                    name="lastName"
                    type="text"
                    className="border-b-2 mx-4 w-4/6"
                  />
                </div>
              </>
            ) : null}

            <div className="py-10 flex flex-row justify-between">
              <button className="pill" type="submit">
                {displayName}
              </button>
              {displayName === "Sign Up" ? (
                <Link to="/login/in">
                  <button
                    type="button"
                    className="font-xs text-neutral-400 italic"
                  >
                    Have an account already? Login instead.
                  </button>
                </Link>
              ) : (
                <Link to="/signup/in">
                  <button type="button">
                    Don't have an account? SignUp instead.
                  </button>
                </Link>
              )}
            </div>
            {error && error.response && <div> {error.response.data} </div>}
          </form>
        </div>
      </div>
    </>
  );
};

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = (state) => {
  return {
    name: "login",
    displayName: "Login",
    error: state.auth.error,
  };
};

const mapSignup = (state) => {
  return {
    name: "signup",
    displayName: "Sign Up",
    error: state.auth.error,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleSubmit(evt) {
      evt.preventDefault();
      const formName = evt.target.name;
      const username = evt.target.username.value;
      const password = evt.target.password.value;
      const email = evt.target.email?.value;
      const firstName = evt.target.firstName?.value;
      const lastName = evt.target.lastName?.value;
      dispatch(
        authenticate(username, password, email, firstName, lastName, formName)
      );
    },
  };
};

export const Login = connect(mapLogin, mapDispatch)(AuthForm);
export const Signup = connect(mapSignup, mapDispatch)(AuthForm);
export default AuthForm;
