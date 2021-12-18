import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
import { Login, Signup } from "./components/AuthForm";
import Home from "./components/Home";
import { me } from "./store";
import { Create } from "./components/Create/Create";

import { About } from "./components/Site/About";
import { Work } from "./components/Site/Work";
import { Contact } from "./components/Site/Contact";
import { CV } from "./components/Site/CV";

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn } = this.props;

    return (
      <div>
        {isLoggedIn ? (
          <Switch>
            <Route exact path="/" component={Create} />
            <Route exact path="/home" component={Create} />
            <Route exact path="/:username" component={Work} data={this.props} />
            <Route exact path="/:username/work" component={Work} />
            <Route exact path="/:username/about" component={About} />
            <Route exact path="/:username/cv" component={CV} />
            <Route exact path="/:username/contact" component={Contact} />
          </Switch>
        ) : (
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/:username" component={Work} data={this.props} />
            <Route exact path="/:username/work" component={Work} />
            <Route exact path="/:username/about" component={About} />
            <Route exact path="/:username/cv" component={CV} />
            <Route exact path="/:username/contact" component={Contact} />
          </Switch>
        )}
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
    },
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));
