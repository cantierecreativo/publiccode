import React, { Component } from "react";

import Liform from "liform-react";
import { DefaultTheme } from "liform-react";

import Schema from "../contents/schema";

import cleanDeep from "clean-deep";
import jsyaml from "../../../node_modules/js-yaml/dist/js-yaml.js";
import copy from "copy-to-clipboard";

import ReactNotify from "react-notify";
import editorWidget from "./editorWidget";
const myTheme = { ...DefaultTheme, textarea: editorWidget };

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

  log(data) {
    console.log.bind(console, JSON.stringify(data));
  }

  submit(obj) {
    //console.log(data)
    //let obj = cleanDeep(data);
    console.log(obj);
    try {
      let yaml = jsyaml.dump(obj);
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
    this.notify();
    /*
    const blob = new Blob([data], {
      type: "text/json;charset=utf-8;"
    });
    let blobURL = window.URL.createObjectURL(blob);
    let tempLink = document.createElement("a");
    tempLink.href = blobURL;
    tempLink.setAttribute("schema", "schema.json");
    tempLink.click();
    */
  }

  show(message) {
    this.setState({ show: true });
    setTimeout(function() {
      this.setState({ show: false });
    }, 3000);
  }

  notify() {
    //this.refs.notificator.error("Title.", "Msg - body.", duration);
    //this.refs.notificator.info("Title.", "Msg - body.", duration);
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
    return (
      <div className="split-screen">
        <div id="snackbar" ref="snackbar" className={cn}>
          ciaooo
        </div>
        <div className="split-screen--child">
          <Liform
            schema={Schema.schema}
            theme={myTheme}
            initialValues={formData}
            onSubmit={this.submit.bind(this)}
          />
          <div className="spacer">&nbsp;</div>
        </div>
        <div className="split-screen--child">
          <div>{JSON.stringify(error)}</div>
          <form className="form" onSubmit={e => this.load(e)}>
            <textarea ref="_load_yaml" />
            <button className="btn btn-primary" type="submit">
              load yaml
            </button>
          </form>
          <hr />
          <button
            className="btn btn-info"
            onClick={() => this.download_schema(JSON.stringify(Schema.schema))}
          >
            Download schema
          </button>

          <button className="btn btn-info" onClick={() => copy(yaml)}>
            Copy to clipboard
          </button>

          <button className="btn btn-info" onClick={() => this.download(yaml)}>
            Download yaml
          </button>
          <hr />
          <h4>YAML</h4>
          <pre style={{ color: "black" }}>
            <code style={{ color: "black" }}>{yaml}</code>
          </pre>
          <hr />
          <h4>JSON</h4>
          <pre style={{ color: "black" }}>
            <code style={{ color: "black" }}>
              {formData && JSON.stringify(formData)}
            </code>
          </pre>
          <hr />
        </div>

        <ReactNotify ref="notificator" />
      </div>
    );
  }
}
