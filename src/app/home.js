import React, { Component } from "react";
import SampleForm from "./sampleForm";

import Schema from "./schema";
import cleanDeep from "clean-deep";
import jsyaml from "../../node_modules/js-yaml/dist/js-yaml.js";
import copy from "copy-to-clipboard";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      yaml: null,
      formData: null
    };
  }

  log(data) {
    console.log.bind(console, JSON.stringify(data));
  }

  submit(data) {
    let { formData } = data;
    let obj = cleanDeep(data.formData);
    let yaml = jsyaml.dump(obj);
    this.setState({ yaml, formData });
  }

  load(e) {
    e.preventDefault();
    let yaml = this.refs._load_yaml.value;
    try {
      let formData = jsyaml.load(yaml);
      this.setState({ formData, yaml });
    } catch (e) {
      console.error(e);
    }
  }

  download(data) {
    const blob = new Blob([data], {
      type: "text/yaml;charset=utf-8;"
    });
    var blobURL = window.URL.createObjectURL(blob);
    let tempLink = document.createElement("a");
    tempLink.href = blobURL;
    tempLink.setAttribute("download", "pubbliccode.yml");
    tempLink.click();
  }

  render() {
    let { yaml, formData } = this.state;
    return (
      <div className="container">
        <div className="split-screen">
          <div className="split-screen--child">
            <SampleForm
              schema={Schema.schema}
              uiSchema={Schema.uiSchema}
              submit={this.submit.bind(this)}
              errors={this.log.bind(this)}
              formData={formData}
            />
          </div>
          <div className="split-screen--child">
            <form className="form" onSubmit={e => this.load(e)}>
              <textarea className="form-control" ref="_load_yaml" />
              <button className="btn btn-primary" type="submit">
                load yaml
              </button>
            </form>
            <hr />
            <button className="btn btn-info" onClick={() => copy(yaml)}>
              Copy to clipboard
            </button>
            <button
              className="btn btn-info"
              onClick={() => this.download(yaml)}
            >
              Download
            </button>
            <pre>
              <code>{yaml}</code>
            </pre>
          </div>
        </div>
      </div>
    );
  }
}
