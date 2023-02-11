import React, { Component } from "react";
import { HashRouter as Router, Route, NavLink } from "react-router-dom";
import SignUpForm from "../Mypages/SignUpForm";
import SignInForm from "../Mypages/SignInForm";
import Tw from "./typewr";
import "./App1.css";
import Card from "./Card";

const App1=()=>  {
 
    return (
      <Router basename="/react-auth-ui/">
        <div className="App">
          <div className="appAside" >
            
           <Tw/>
          <Card >
           <h1>
           A real-time code editor platform that enables developers to collaborate on a piece of code simultaneously, with changes being reflected in real-time on all connected devices.This platform often come with a range of tools and features to make coding easier, such as syntax highlighting, version control .
           </h1>
           </Card>
          </div>
          
          <div className="appForm">
            <div className="pageSwitcher">
              <NavLink
                to="/sign-in"
                activeClassName="pageSwitcherItem-active"
                className="pageSwitcherItem"
              >
                Sign In
              </NavLink>
              <NavLink
                exact
                to="/"
                activeClassName="pageSwitcherItem-active"
                className="pageSwitcherItem"
              >
                Sign Up
              </NavLink>
            </div>

            <div className="formTitle">
              <NavLink
                to="/sign-in"
                activeClassName="formTitleLink-active"
                className="formTitleLink"
              >
                Sign In
              </NavLink>{" "}
              or{" "}
              <NavLink
                exact
                to="/"
                activeClassName="formTitleLink-active"
                className="formTitleLink"
              >
                Sign Up
              </NavLink>
            </div>

            <Route exact path="/" component={SignUpForm} />
            <Route path="/sign-in" component={SignInForm} />
          </div>
        </div>
      </Router>
    );
  
}

export default App1;
//