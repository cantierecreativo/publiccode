import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
// import 'bootstrap-italia/dist/css/bootstrap.min.css';
//import "../../assets/styles/app.scss";
import "../../asset/style.scss";
import ReactNotify from "react-notify";
import { connect } from "react-redux";

@connect(state => {
  return {
    notifications: state.notifications
  };
})
export default class Layout extends Component {
  componentWillReceiveProps(nextProps) {
    if (
      nextProps.notifications &&
      nextProps.notifications != this.props.notifications &&
      nextProps.notifications.item
    ) {
      let n = nextProps.notifications.item;
      let { title, msg, millis } = n;
      this.refs.notificator.success(title, msg, millis);
    }
  }
  render() {
    return (
      <div>
        <ReactNotify ref="notificator" />
        <header>
          <nav className="navbar navbar-md fixed-top white">
            <div className="container">
              <a className="navbar-brand md">
                <span className="inline">PUBLIC-CODE</span>
              </a>
            </div>
          </nav>
        </header>

        <div className="home">{this.props.children}</div>

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
