import React, { Component } from "react";
import { render } from "react-dom";
import Home from "./components/home";

// import '../asset/style.scss';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap';

import "../assets/styles/app.scss";

export default class App extends Component {
  render() {
    return (
      <div>
        <header>
          <nav className="navbar navbar-md fixed-top white">
            <div className="container">
              <a className="navbar-brand md">
                <span className="inline">Pubblicode</span>
              </a>
            </div>
          </nav>
        </header>

        <div className="home">
          <Home />
        </div>

        <footer className="black pos-rlt">
          <div className="footer dk">
            <div className="p-a-md">
              <div className="row footer-bottom">
                <div className="col-sm-8">
                  <small className="text-muted" />
                </div>
                <div className="col-sm-4">
                  <div className="text-sm-right text-xs-left">
                    <strong />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}

render(<App />, document.getElementById("app"));
