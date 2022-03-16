import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
// import { Login, Signup } from "./components/AuthForm";
import Home from "./components/Home";
import { me } from "./store";
import CreateAbout from "./components/Create/CreateAbout";
import CreateWork from "./components/Create/CreateWork";
import CreateContact from "./components/Create/CreateContact";
import CreateCV from "./components/Create/CreateCV";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Work } from "./components/Site/Work";
import { About } from "./components/Site/About";
import { Contact } from "./components/Site/Contact";
import { CV } from "./components/Site/CV";
import { fetchUserData } from "./store/user";
import CreateSettings from "./components/Create/CreateSettings";

/**
 * COMPONENT
 */
const Routes = () => {
  let user = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(me());
  }, []);

  // useEffect(() => {
  //   user = dispatch(fetchUserData(auth.username));
  // });

  return (
    <div>
      {user.username ? (
        <Switch>
          <Route exact path="/create/in/:username" component={CreateWork} />
          <Route exact path="/" component={CreateWork} />
          <Route exact path="/:username" component={Work} data={user} />
          <Route exact path="/:username/work" component={Work} test={123} />
          <Route exact path="/:username/about" component={About} />
          <Route exact path="/:username/cv" component={CV} />
          <Route exact path="/:username/contact" component={Contact} />
          <Route
            exact
            path="/:username/:collection"
            component={Work}
            test={456}
          />
          <Route
            exact
            path="/create/in/:username/work"
            component={CreateWork}
            user={user}
          />
          <Route
            exact
            path="/create/in/:username/about"
            component={CreateAbout}
            user={user}
          />
          <Route
            exact
            path="/create/in/:username/cv"
            component={CreateCV}
            user={user}
          />
          <Route
            exact
            path="/create/in/:username/contact"
            component={CreateContact}
            user={user}
          />
          <Route
            exact
            path="/create/in/:username/settings"
            component={CreateSettings}
            user={user}
          />
        </Switch>
      ) : (
        <Switch>
          <Route exact path="/" component={Home} displayName="login" />

          <Route exact path="/:username" component={Work} data={user} />
          {/* <Route path="/:username/:collection" component={Work} /> */}
          <Route exact path="/:username/about" component={About} />
          <Route exact path="/:username/cv" component={CV} />
          <Route exact path="/:username/contact" component={Contact} />
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
