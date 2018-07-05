import React, { Component } from "react";
import { connect } from "react-redux";

function mapStateToProps(state) {
  return {
    appForm: state.form.appForm
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

@connect(
  mapStateToProps,
  mapDispatchToProps
)
export default class Display extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { appForm } = this.props;
    let errorsObj =
      appForm && appForm.syncErrors ? appForm.syncErrors : null;

    let errors = null;

    if (errorsObj) {
      let keys = Object.keys(errorsObj);
      let errors = keys.map(k => {
        return { key: k, value: errorsObj[k] };
      });
    }

    return <div className="bg-primary">{errors && JSON.stringify(errors)}</div>;
  }
}
