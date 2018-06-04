import React, { Component } from "react";
import { render } from "react-dom";
import Home from "./components/home";
import "../assets/styles/app.scss";

export default class App extends Component {
  render() {
    return <Home className='black' />;
  }
}

render(<App/>, document.getElementById("app"));
