import React from "react";
import { connect } from "react-redux";
import { authenticate } from "../store";
import { Navbar } from "./Navbar";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

/**
 * COMPONENT
 */
export default function AuthForm(props) {
  let mapLogin = useSelector((state) => state.auth.mapLogin);
  let mapSignup = useSelector((state) => state.auth.mapSignup);
  let { name, displayName, error, setDisplayName } = props;
  const dispatch = useDispatch();

  const submitHandler = (evt) => {
    evt.preventDefault();
    const formName = displayName === "Sign Up" ? "signup" : "login";
    const username = evt.target.username.value;
    const password = evt.target.password.value;
    const email = evt.target.email?.value;
    const firstName = evt.target.firstName?.value;
    const lastName = evt.target.lastName?.value;
    dispatch(
      authenticate(username, password, email, firstName, lastName, formName)
    );
  };

  return (
    <section className="container auth flex flex-row items-center">
      <div className="h-screen flex items-center w-3/6 p-4">
        <h1>Lets Get Started.</h1>
      </div>
      <div className="w-3/6 space-y-4 flex flex-col justify-center">
        <label htmlFor={displayName}>
          {displayName}
          {displayName === "Sign Up" ? " for" : " to"} your Selected-Work
          account
        </label>
        <form
          className="flex flex-col space-y-4 bg-white"
          onSubmit={submitHandler}
          name={displayName}
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
              <button
                type="button"
                className="font-xs text-neutral-400 italic"
                onClick={() => {
                  setDisplayName("Login");
                }}
              >
                Have an account already? Login instead.
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setDisplayName("Sign Up");
                }}
              >
                Don't have an account? Sign Up instead.
              </button>
            )}
          </div>
          {mapSignup && <div> {mapSignup.error.response.data} </div>}
        </form>
      </div>
    </section>
  );
}
