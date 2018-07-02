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
      error: null,
      id: 0
    };

    this.load = this.load.bind(this);
    this.submit = this.submit.bind(this);
    this.showError = this.showError.bind(this);
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

    console.log(obj);

    return obj;
  }

  submit(data) {
    this.notify();
    console.log("SUBMIT");
    const id = this.state.id + 1;
    data = cleanDeep(data);
    console.log(data);
    try {
      let yaml = jsyaml.dump(data);
      this.setState({ id, yaml, formData: data, error: null });
    } catch (e) {
      console.error(e);
    }
  }

  old_load(e) {
    e.preventDefault();
    console.log("FORM LOAD", e);
    let yaml = this.refs._load_yaml.value;
    try {
      let formData = jsyaml.load(yaml);
      this.setState({ formData, yaml });
    } catch (e) {
      console.error(e);
      this.setState({ error: e });
    }
  }

  load(files) {
    console.log("LOAD", files);
    const reader = new FileReader();
    const that = this;
    const id = this.state.id + 1;
    reader.onload = function() {
      let yaml = reader.result;
      console.log("yaml", yaml);
      let formData = jsyaml.load(yaml);
      console.log("formData", formData);
      that.setState({ formData, yaml, id });
    };
    reader.readAsText(files[0]);
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

  renderForm() {
    let { formData, id } = this.state;
    let initialValues = formData ? formData : Schema.initialValues;
    return (
      <Liform
        key={id}
        className="inline"
        schema={Schema.schema}
        theme={myTheme}
        initialValues={initialValues}
        onSubmit={this.submit}
        onError={this.showError}
      />
    );
  }

  render() {
    let { yaml, show_message, error } = this.state;
    let cn = "";
    if (show_message) {
      cn = "show";
    }

    return (
      <div>
        <ReactNotify ref="notificator" />

        <Display />
        <div className="split-screen">
          <div className="split-screen--child">
            {this.renderForm()}
            <div className="spacer">&nbsp;</div>
          </div>
          <div className="toolbar">
            <h3>Toolbar</h3>

            <form className="form from-group" onSubmit={e => this.old_load(e)}>
              <label>Load yaml</label>
              <input
                type="file"
                className="form-control btn btn-primary"
                onChange={e => this.load(e.target.files)}
              />
              <input
                type="submit"
                className="form-control btn btn-primary"
                value="load"
              />
            </form>
            <hr />
            <button
              className="btn btn-primary"
              onClick={() =>
                this.download_schema(JSON.stringify(Schema.schema))
              }
            >
              Download schema
            </button>

            <button className="btn btn-primary" onClick={() => copy(yaml)}>
              Copy to clipboard
            </button>

            <button
              className="btn btn-primary"
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
