import React, { Component } from "react";
import { render } from "react-dom";
import Home from "./home";
import "../assets/styles/style.css";

export default class App extends Component {
  render() {
    return <Home />;
  }
}

render(<App />, document.getElementById("app"));
