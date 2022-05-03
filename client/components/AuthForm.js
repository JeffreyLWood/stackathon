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
    try {
      dispatch(authenticate(state, "login"));
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

    window.localStorage.setItem("token", data.token);
    dispatch(oauth());
  };

  return (
    <section
      id="auth"
      className="h-screen w-screen auth flex flex-col items-center sm:flex-row"
    >
      <div className="h-2/6 flex items-center w-screen sm:w-2/6 sm:h-screen sm:p-4">
        <span className="mt-20 sm:mt-0 text-5xl mx-auto font-semibold">
          Lets Get Started.
        </span>
      </div>

      <div className="w-screen h-4/6 space-y-4 flex flex-col sm:bg-neutral-50 sm:w-4/6 sm:h-screen justify-center">
        <div className="p-5 w-5/6 sm:w-3/6 mx-auto h-2/6 border-4 border-stone-800 flex items-center flex-col justify-center">
          <span className="text-lg text-stone-900">
            Create a beautiful website for your work
          </span>
          <span>
            <GoogleLogin
              className="mx-auto my-4 border-2 border-stone-900 "
              clientId={process.env.CLIENT_ID}
              buttonText="Continue with Google"
              onSuccess={handleLogin}
              onFailure={handleLogin}
              cookiePolicy={"single_host_origin"}
            />
          </span>
        </div>
        <div className="p-5 space-y-4 w-5/6 sm:w-3/6 mx-auto h-2/6 border-4 border-stone-800 flex flex-col justify-center">
          <span className="text-lg w-full text-center text-stone-900">
            Continue with Email Instead
          </span>
          <form className="flex flex-col space-y-6" onSubmit={submitHandler}>
            <span className="flex flex-row space-between space-x-4">
              <label htmlFor="email" />
              Email
              <input
                className="border-b-2 w-full border-stone-800 bg-neutral-50 mx-2"
                name="email"
                type="text"
                onChange={changeHandler}
              />
            </span>
            <span className="flex flex-row space-between space-x-4">
              <label htmlFor="password" />
              Password
              <input
                className="border-b-2 w-full border-stone-800 bg-neutral-50 mx-2"
                name="password"
                type="password"
                onChange={changeHandler}
              />
            </span>
            <button type="submit" className="pill">
              Submit
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
