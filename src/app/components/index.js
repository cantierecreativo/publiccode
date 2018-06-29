import React, { Component } from "react";
import { connect } from "react-redux";

import Liform from "liform-react";
import { DefaultTheme } from "liform-react";

import Schema from "../contents/schema";

import cleanDeep from "clean-deep";
import jsyaml from "../../../node_modules/js-yaml/dist/js-yaml.js";
import copy from "copy-to-clipboard";

import ReactNotify from "react-notify";
import editorWidget from "./editorWidget";

import Display from "./display";

const myTheme = { ...DefaultTheme, editor: editorWidget };
const jsonData = require("../schema.json");

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      yaml: null,
      formData: null,
      show: true,
      error: null
    };
  }

  componentDidMount() {
    this.getSchema();
  }

  log(data) {
    console.log.bind(console, JSON.stringify(data));
  }

  getSchema() {

     console.log(jsonData);

    let obj = jsyaml.load(JSON.stringify(jsonData));

    console.log( obj);

    return obj;
  }

  submit(data) {
    this.notify();
    console.log("SUBMIT");
    data = cleanDeep(data);
    console.log(data);
    try {
      let yaml = jsyaml.dump(data);
      this.setState({ yaml, formData: data, error: null });
    } catch (e) {
      console.error(e);
    }
  }

  load(e) {
    e.preventDefault();
    let yaml = this.refs._load_yaml.value;
    try {
      let formData = jsyaml.load(yaml);
      this.setState({ formData, yaml });
    } catch (e) {
      console.error(e);
      this.setState({ error: e });
    }
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

  download_schema(data) {
    const blob = new Blob([data], {
      type: "text/json;charset=utf-8;"
    });
    let blobURL = window.URL.createObjectURL(blob);
    let tempLink = document.createElement("a");
    tempLink.href = blobURL;
    tempLink.setAttribute("schema", "schema.json");
    tempLink.click();
  }

  showError(error) {
    this.setState({ show: true });
    setTimeout(function() {
      this.setState({ show: false });
    }, 3000);
  }

  notify() {
    //.error("Title.", "Msg - body.", duration);
    //.info("Title.", "Msg - body.", duration);
    this.refs.notificator.success("Title.", "Msg - body.", 4000);
  }

  onContentStateChange(contentState) {
    console.log("contentState", contentState);
  }

  render() {
    let { yaml, formData, show_message, error } = this.state;
    let cn = "";
    if (show_message) {
      cn = "show";
    }

    console.log("FORMDATA", formData);

    let initialValues = formData ? formData : Schema.initialValues;
    console.log("INITIAL VALUES", initialValues);
    return (
      <div>
        <ReactNotify ref="notificator" />

        <Display />
        <div className="split-screen">
          <div className="split-screen--child">
            <Liform
              className="form-inline"
              schema={Schema.schema}
              theme={myTheme}
              initialValues={initialValues}
              onSubmit={this.submit.bind(this)}
              onError={this.showError.bind(this)}
            />
            <div className="spacer">&nbsp;</div>
          </div>
          <div className="toolbar">
            <h3>Toolbar</h3>

            <form className="form from-group" onSubmit={e => this.load(e)}>
              <label>Load yaml</label>
              <input type="file" className="form-control btn btn-info" />
            </form>
            <hr />
            <button
              className="btn btn-info"
              onClick={() =>
                this.download_schema(JSON.stringify(Schema.schema))
              }
            >
              Download schema
            </button>

            <button className="btn btn-info" onClick={() => copy(yaml)}>
              Copy to clipboard
            </button>

            <button
              className="btn btn-info"
              onClick={() => this.download(yaml)}
            >
              Download yaml
            </button>
            <hr />
            <h4>YAML</h4>
            <pre style={{ color: "black" }}>
              <code style={{ color: "black" }}>{yaml}</code>
            </pre>
            <hr />
          </div>
        </div>
      </div>
    );
  }
}
