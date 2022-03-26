import React from "react";
import { connect } from "react-redux";
import { authenticate, me, oauth } from "../store";
import { Navbar } from "./Navbar";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GoogleLogin } from "react-google-login";

/**
 * COMPONENT
 */
export default function AuthForm(props) {
  let mapLogin = useSelector((state) => state.auth.mapLogin);
  let mapSignup = useSelector((state) => state.auth.mapSignup);
  let { name, displayName, error, setDisplayName } = props;
  const dispatch = useDispatch();

  let [invalid, setInvalid] = useState(false);
  let [unique, setUnique] = useState(true);
  let formName = displayName === "Sign Up" ? "signup" : "login";

  let [state, setState] = useState({
    username: "",
    password: "",
    email: "",
    firstName: "",
    lastName: "",
  });

  const changeHandler = (evt) => {
    evt.preventDefault();
    setUnique(true);
    setState({ ...state, [evt.target.name]: evt.target.value });
  };

  const submitHandler = (evt) => {
    evt.preventDefault();

    // if (/[^a-zA-Z]/.test(state.username)) {
    //   setInvalid(true);
    //   return;
    // }
    try {
      dispatch(authenticate(state, formName));
    } catch (error) {
      setUnique(false);
    }
  };

  //Google
  const handleLogin = async (googleData) => {
    const res = await fetch("/auth/google", {
      method: "POST",
      body: JSON.stringify({
        token: googleData.tokenId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    window.localStorage.setItem("TOKEN", data.token);
    dispatch(oauth());
  };

  return (
    <section
      id="auth"
      className="h-screen w-screen auth flex flex-col items-center sm:flex-row"
    >
      <div className="h-1/6 flex items-center w-screen sm:w-2/6 sm:h-screen sm:p-4">
        <span className="mt-10 text-4xl mx-auto font-semibold">
          Lets Get Started.
        </span>
      </div>

      <div className="w-4/6  bg-neutral-50 space-y-4  h-full flex  items-center ">
        <div className="w-3/6 mx-auto h-3/6 bg-white border-t-1 flex items-center flex-col justify-center rounded-md drop-shadow-lg border-l-2 border-r-2">
          <span className="text-lg">
            {" "}
            Create a beautiful website for your work
          </span>
          <span>
            <GoogleLogin
              className="mx-auto my-4 border-2"
              clientId={process.env.CLIENT_ID}
              buttonText="Continue with Google"
              onSuccess={handleLogin}
              onFailure={handleLogin}
              cookiePolicy={"single_host_origin"}
            />
          </span>
        </div>
      </div>
    </section>
  );
}

{
  /*  <div className="h-5/6 space-y-2 flex flex-col justify-center sm:w-3/6 sm:space-y-4">
         <span>
          <label htmlFor={displayName} className="text-sm sm:text-lg">
            {displayName === "Sign Up"
              ? "Sign up to create a beautiful website for your work."
              : "Login to your Selected-Work account"}
          </label>
        </span>
        <form
          className="flex flex-col space-y-4 bg-white p-2"
          onSubmit={submitHandler}
          name={displayName}
        >
          {displayName === "Sign Up" ? (
            <>
              <div className="flex justify-between flex-row">
                <label htmlFor="firstName">
                  <small>First Name</small>
                </label>
                <input
                  onChange={changeHandler}
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
                  onChange={changeHandler}
                  name="lastName"
                  type="text"
                  className="border-b-2 mx-4 w-4/6"
                />
              </div>
              <div className="flex justify-between flex-row">
                <label htmlFor="email">
                  <small>Email</small>
                </label>

                <input
                  onChange={changeHandler}
                  name="email"
                  type="text"
                  className="border-b-2 mx-4 w-4/6"
                />
              </div>
            </>
          ) : null}
          <div className="flex justify-between flex-row">
            <label htmlFor="username">
              <small>Username / Site Url</small>
            </label>
            <input
              onChange={changeHandler}
              name="username"
              placeholder=""
              type="text"
              value={
                state.username
                  ? state.username
                  : state.firstName.toLowerCase() + state.lastName.toLowerCase()
              }
              className="border-b-2 mx-4 w-4/6"
            />
          </div>
          <label htmlFor="username" className="italic text-neutral-400">
            {displayName === "Sign Up" ? (
              <small>{`Your site url will be www.selected-work.com/${
                state.username
                  ? state.username
                  : state.firstName.toLowerCase() + state.lastName.toLowerCase()
              }`}</small>
            ) : null}
          </label>
          <div className="flex justify-between flex-row">
            <label htmlFor="password">
              <small>Password</small>
            </label>
            <input
              onChange={changeHandler}
              name="password"
              type="password"
              className="border-b-2 mx-4 w-4/6"
            />
          </div>

          <div className="py-10 flex flex-col sm:flex-row justify-between">
            <button className="pill" type="submit">
              {displayName}
            </button>{" "}
            {invalid
              ? "Invalid username. Only a-z letters are allowed, no spaces or special characters"
              : null}
            {!unique ? "Username is taken already. Please try another." : null}
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
        </form> */
}
