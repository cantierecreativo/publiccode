import React, { Component } from "react";
import { connect } from "react-redux";

function mapStateToProps(state) {
  return {
    pubbliccode: state.form.publiccode
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
    let { pubbliccode } = this.props;
    let errorsObj =
      pubbliccode && pubbliccode.syncErrors ? pubbliccode.syncErrors : null;

    let errors = null;

    if (errorsObj) {
      let keys = Object.keys(errorsObj);
      let errors = keys.map(k => {
        return { key: k, value: errorsObj[k] };
      });
    }

    return <div className="danger-bg">{errors && JSON.stringify(errors)}</div>;
  }
}
