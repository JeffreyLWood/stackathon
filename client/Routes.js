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
import Navbar from "./components/Templates/Navbar";
import Footer from "./components/Templates/Footer";
import About from "./components/Templates/About";
import Contact from "./components/Templates/Contact";
import CV from "./components/Templates/CV";
import { fetchUserData, fetchUserDataDomain } from "./store/user";
import CreateSettings from "./components/Create/CreateSettings";
import { TransitionGroup, Transition } from "react-transition-group";
import { gsap } from "gsap";
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
        //Find user profile from custom domain
        setCustom(true);
        dispatch(fetchUserDataDomain(domain));
      }
    }
    load();
  }, []);
  const play = (node) => {
    const timeline = new gsap.timeline({ paused: true });
    const els = node.querySelectorAll(".stagger");

    timeline.to(els, {
      opacity: 1,
      duration: 1,
      stagger: 0.1,
      ease: "expo",
      y: -20,
    });

    timeline.play();
  };
  return (
    <div>
      {custom ? (
        // Using custom domain, logged in or not
        <>
          <Navbar />
          <Route
            render={({ location }) => (
              <TransitionGroup component={null}>
                <Transition
                  key={location.key}
                  appear={true}
                  onEnter={(node) => play(node)}
                  timeout={{ enter: 1000, exit: 500 }}
                >
                  <Switch location={location}>
                    <Route exact path="/" component={Work} />
                    <Route exact path="/work" component={Work} />
                    <Route exact path="/about" component={About} />
                    <Route exact path="/cv" component={CV} />
                    <Route exact path="/contact" component={Contact} />
                    <Route exact path="/work/:collection" component={Work} />
                  </Switch>
                </Transition>
              </TransitionGroup>
            )}
          />

          <Footer />
        </>
      ) : user.username ? (
        // Logged in, not using custom domain
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
        //Not logged in, not using custom domain
        <>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/:username" component={Work} />
            <Route exact path="/:username/about" component={About} />
            <Route exact path="/:username/cv" component={CV} />
            <Route exact path="/:username/contact" component={Contact} />
            <Route exact path="/:username/work/:collection" component={Work} />
          </Switch>
          <Footer />
        </>
      )}
    </div>
  );
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(Routes);
