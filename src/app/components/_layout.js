import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
// import 'bootstrap-italia/dist/css/bootstrap.min.css';
//import "../../assets/styles/app.scss";
import "../../asset/style.scss";
import ReactNotify from "react-notify";
import { connect } from "react-redux";
import Header from "./_header";
import Footer from "./_footer";

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
        <Header />
        <div className="home">{this.props.children}</div>
        <Footer />
      </div>
    );
  }
}
