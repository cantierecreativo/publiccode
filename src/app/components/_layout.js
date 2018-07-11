import React, { Component } from "react";
//import "bootstrap/dist/css/bootstrap.min.css";
// import 'bootstrap-material-design/dist/css/bootstrap-material-design.min.css';
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
      <div className="container-fluid">
        <ReactNotify ref="notificator" />
        {false && <Header />}
        <div className="main">{this.props.children}</div>
        <Footer />
      </div>
    );
  }
}

/*
    <!-- <link rel="stylesheet" href="node_modules/bootstrap-italia/dist/css/bootstrap-italia.min.css">
    <link rel="stylesheet" href="node_modules/bootstrap-italia/dist/css/italia-icon-font.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.slim.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js"></script>
    <script src="node_modules/bootstrap-italia/dist/js/bootstrap-italia.min.js"></script> -->
*/

/*

<link rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons">

    <link rel="stylesheet"
        href="https://unpkg.com/bootstrap-material-design@4.1.1/dist/css/bootstrap-material-design.min.css"
        integrity="sha384-wXznGJNEXNG1NFsbm0ugrLFMQPWswR3lds2VeinahP8N0zJw9VWSopbjv2x7WCvX"
        crossorigin="anonymous">

    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js"
        integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN"
        crossorigin="anonymous" />

    <script src="https://unpkg.com/popper.js@1.12.6/dist/umd/popper.js"
        integrity="sha384-fA23ZRQ3G/J53mElWqVJEGJzU0sTs+SvzG8fXVWP+kJQ1lwFAOkcUOysnlKJC33U"
        crossorigin="anonymous" />

    <script src="https://unpkg.com/bootstrap-material-design@4.1.1/dist/js/bootstrap-material-design.js"
        integrity="sha384-CauSuKpEqAFajSpkdjv3z9t8E7RlpJ1UP0lKM/+NdtSarroVKu069AlsRPKkFBz9"
        crossorigin="anonymous" />

    <script>
        $(document).ready(function() {
            $("body").bootstrapMaterialDesign();
        });

    </script>

*/
