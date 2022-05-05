import React, { Component, Fragment } from "react";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
// import { Login, Signup } from "./components/AuthForm";
import Home from "./components/Home";
import { me } from "./store";
import CreateAbout from "./components/Create/CreateAbout";
import CreateWork from "./components/Create/CreateWork";
import CreateContact from "./components/Create/CreateContact";
import CreateCV from "./components/Create/CreateCV";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Work from "./components/Templates/Work";
import { About } from "./components/Templates/1/About";
import { Contact } from "./components/Templates/1/Contact";
import { CV } from "./components/Templates/1/CV";
import { fetchUserData } from "./store/user";
import CreateSettings from "./components/Create/CreateSettings";

/**
 * COMPONENT
 */
const Routes = () => {
  let user = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      dispatch(me());
    } catch (error) {
      console.log(error);
    }
  }, []);

  let domain = window.location.hostname;
  let username = window.location.pathname.split("/")[1];
  let [custom, setCustom] = useState(false);

  useEffect(() => {
    async function load() {
      if (domain === "selected-work.com" || domain === "localhost") {
        if (username) {
          dispatch(fetchUserData(username));
        } else {
          return;
        }
      } else {
        setCustom(true);
        //Find user profile from custom domain
        let customUser = await fetch(`/api/users/custom/${domain}`, {
          method: "GET",
        });
        customUser = await customUser.json();
        dispatch(fetchUserData(customUser.username));
      }
    }
    load();
  }, []);

  return (
    <div>
      {custom ? (
        <Switch>
          <Route exact path="/" component={Work} />
          <Route exact path="/work" component={Work} />
          <Route exact path="/about" component={About} />
          <Route exact path="/cv" component={CV} />
          <Route exact path="/contact" component={Contact} />
          <Route exact path="/work/:collection" component={Work} />
        </Switch>
      ) : user.username ? (
        <Switch>
          <Route exact path="/create/in/:username" component={CreateWork} />
          <Route exact path="/" component={CreateWork} />
          <Route exact path="/:username" component={Work} />
          <Route exact path="/:username/work" component={Work} />
          <Route exact path="/:username/about" component={About} />
          <Route exact path="/:username/cv" component={CV} />
          <Route exact path="/:username/contact" component={Contact} />
          <Route exact path="/:username/work/:collection" component={Work} />
          <Route
            exact
            path="/create/in/:username/work"
            component={CreateWork}
          />
          <Route
            exact
            path="/create/in/:username/about"
            component={CreateAbout}
          />
          <Route exact path="/create/in/:username/cv" component={CreateCV} />
          <Route
            exact
            path="/create/in/:username/contact"
            component={CreateContact}
          />
          <Route
            exact
            path="/create/in/:username/settings"
            component={CreateSettings}
          />
        </Switch>
      ) : (
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/:username" component={Work} />
          <Route exact path="/:username/about" component={About} />
          <Route exact path="/:username/cv" component={CV} />
          <Route exact path="/:username/contact" component={Contact} />
          <Route exact path="/:username/work/:collection" component={Work} />
        </Switch>
      )}
    </div>
  );
};

/**
 * CONTAINER
 */
// const mapState = (state) => {
//   return {
//     // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
//     // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
//     isLoggedIn: !!state.auth.id,
//   };
// };

// const mapDispatch = (dispatch) => {
//   return {
//     loadInitialData() {
//       dispatch(me());
//     },
//   };
// };

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(Routes);
