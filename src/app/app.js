import React, { Component } from "react";
import { render } from "react-dom";

import store from "./redux_store";
import { Provider } from "react-redux";

import Index from "./components/index";
import "bootstrap/dist/css/bootstrap.min.css";
// import 'bootstrap-italia/dist/css/bootstrap.min.css';
//import "../assets/styles/app.scss";
import "../asset/style.scss";
export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <header>
            <nav className="navbar navbar-md fixed-top white">
              <div className="container">
                <a className="navbar-brand md">
                  <span className="inline">Public Code Editor</span>
                </a>
              </div>
            </nav>
          </header>

          <div className="home">
            <Index />
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
      </Provider>
    );
  }
}

render(<App />, document.getElementById("app"));
