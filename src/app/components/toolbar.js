import React, { Component } from "react";
import { connect } from "react-redux";
import jsyaml from "../../../node_modules/js-yaml/dist/js-yaml.js";
import { initialize } from "redux-form";
import { notify, clearNotifications } from "../store/notifications";
import copy from "copy-to-clipboard";
import Display from "./display";
const APP_FORM = "appForm";
function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    notify: (type, data) => dispatch(notify(type, data)),
    initialize: (name, data) => dispatch(initialize(name, data))
  };
}

@connect(
  mapStateToProps,
  mapDispatchToProps
)
export default class Toolbar extends Component {
  constructor(props) {
    super(props);
    this.load = this.load.bind(this);
    this.reset = this.reset.bind(this);
  }

  download(data) {
    const blob = new Blob([data], {
      type: "text/yaml;charset=utf-8;"
    });
    let blobURL = window.URL.createObjectURL(blob);
    let tempLink = document.createElement("a");
    tempLink.href = blobURL;
    tempLink.setAttribute("download", "pubbliccode.yml");
    tempLink.click();
  }

  // download_schema(data) {
  //   const blob = new Blob([data], {
  //     type: "text/json;charset=utf-8;"
  //   });
  //   let blobURL = window.URL.createObjectURL(blob);
  //   let tempLink = document.createElement("a");
  //   tempLink.href = blobURL;
  //   tempLink.setAttribute("schema", "schema.json");
  //   tempLink.click();
  // }

  // old_load(e) {
  //   e.preventDefault();
  //   console.log("FORM LOAD", e);
  //   let yaml = this.refs._load_yaml.value;

  //   try {
  //     let formData = jsyaml.load(yaml);
  //     this.setState({ formData, yaml });
  //   } catch (e) {
  //     console.error(e);
  //     this.setState({ error: e });
  //   }
  // }


  load(files) {
    console.log("LOAD", files);
    const reader = new FileReader();
    const that = this;
    let { onLoad } = this.props;
    reader.onload = function() {
      let yaml = reader.result;
      // console.log("yaml", yaml);
      let formData = jsyaml.load(yaml);
      // console.log("formData", formData);
      // that.setState({ formData, yaml, id });
      onLoad(formData, yaml);
      that.reset(formData);
    };
    reader.readAsText(files[0]);
  }

  reset(data) {
    if (!data) {
      data = this.props.initialValues;
    }
    console.log("RESET", data);
    this.props.initialize(APP_FORM, data);
  }

  render() {
    let { yaml } = this.props;
    return (
      <div className="toolbar">
        <h3>Toolbar</h3>

        <div className="form from-group">
          <label>Load yaml</label>
          <input
            type="file"
            className="form-control btn btn-primary"
            onChange={e => this.load(e.target.files)}
          />
        </div>
        <hr />
        <button className="btn btn-primary" onClick={() => this.reset()}>
          Reset
        </button>

        <button className="btn btn-primary" onClick={() => copy(yaml)}>
          Copy to clipboard
        </button>

        <button className="btn btn-primary" onClick={() => this.download(yaml)}>
          Download yaml
        </button>

        <hr />
        <h4>YAML</h4>
        <pre style={{ color: "black" }}>
          <code style={{ color: "black" }}>{yaml}</code>
        </pre>
        <hr />
      </div>
    );
  }
}
