import React, { Component } from "react";
import { connect } from "react-redux";

import Schema from "../contents/schema";
import cleanDeep from "clean-deep";
import jsyaml from "../../../node_modules/js-yaml/dist/js-yaml.js";
import copy from "copy-to-clipboard";
import Display from "./display";

import { initialize } from "redux-form";
import { notify, clearNotifications } from "../store/notifications";

import Liform from "../myform";
import { DefaultTheme } from "../myform";

import myTheme from "../myform/widgets/";
import { reduxForm } from "redux-form";
import renderFields from "../myform/renderFields";
import renderField from "../myform/renderField";
import processSubmitErrors from "../myform/processSubmitErrors";
import buildSyncValidation from "../myform/buildSyncValidation";
import { setError } from "../myform/buildSyncValidation";
import compileSchema from "../myform/compileSchema";

//import Toolbar from "../toolbar";

//const myTheme = DefaultTheme;
const jsonData = require("../schema.json");
const APP_FORM = "appForm";

function mapStateToProps(state) {
  return {
    notifications: state.notifications
  };
}

function mapDispatchToProps(dispatch) {
  return {
    notify: (type, data) => dispatch(notify(type, data)),
    clearNotifications: (type, data) =>
      dispatch(clearNotifications(type, data)),
    initialize: (name, data) => dispatch(initialize(name, data))
  };
}

@connect(
  mapStateToProps,
  mapDispatchToProps
)
export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      yaml: null,
      formData: null
    };

    this.load = this.load.bind(this);
    this.submit = this.submit.bind(this);
    this.showError = this.showError.bind(this);
    this.reset = this.reset.bind(this);
  }

  // componentDidMount() {
  //   //this.getSchema();
  // }

  getSchema() {
    // console.log(jsonData);
    let obj = jsyaml.load(JSON.stringify(jsonData));
    // console.log(obj);
    return obj;
  }

  submit(data) {
    this.notify();
    console.log("SUBMIT");

    data = cleanDeep(data);
    console.log(data);
    try {
      let yaml = jsyaml.dump(data);
      this.setState({ yaml, error: null });
    } catch (e) {
      console.error(e);
    }
  }

  showError(error) {
    this.setState({ show: true });
    setTimeout(function() {
      this.setState({ show: false });
    }, 3000);
  }

  notify(title = "hey", msg = "ciao", millis = 3000) {
    this.props.notify({ title, msg, millis });
  }

  onContentStateChange(contentState) {
    console.log("contentState", contentState);
  }

  // renderForm() {
  //   let { formData, id } = this.state;
  //   let initialValues = formData ? formData : Schema.initialValues;
  //   return (
  //     <Liform
  //       formKey={APP_FORM}
  //       schema={Schema.schema}
  //       theme={myTheme}
  //       initialValues={initialValues}
  //       onSubmit={this.submit}
  //     />
  //   );
  // }

  BaseForm(props) {
    const { schema, handleSubmit, theme, error, submitting, context } = props;
    return (
      <form className="form" onSubmit={handleSubmit}>
        {renderField(schema, null, theme || DefaultTheme, "", context)}
        <div>{error && <strong>{error}</strong>}</div>
        <button className="btn btn-primary" type="submit" disabled={submitting}>
          Submit
        </button>
      </form>
    );
  }

  loaded(formData, yaml) {
    console.log("loaded", yaml, formData);
    this.setState({ formData, yaml });
  }

  renderForm() {
    const { formData, id } = this.state;
    const schema = compileSchema(Schema.schema);

    console.log("COMPILED SCHEMA", schema);
    const initialValues = Schema.initialValues;

    const MyForm = reduxForm({
      form: APP_FORM,
      validate: buildSyncValidation(schema),
      initialValues: initialValues,
      context: { formName: APP_FORM }
    })(this.BaseForm);

    return (
      <MyForm
        renderFields={renderField.bind(this)}
        formKey={APP_FORM}
        schema={schema}
        theme={myTheme}
        initialValues={initialValues}
        onSubmit={this.submit}
      />
    );
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
      data = this.props.schema.initialValues;
    }
    console.log("RESET", data);
    this.props.initialize(APP_FORM, data);
  }

  render() {
    let { yaml, show_message, error } = this.state;
    let cn = show_message ? "show" : "";

    return (
      <div>
        <div className="split-screen">
          <div className="split-screen--form">
            {this.renderForm()}
            <div className="spacer">&nbsp;</div>
          </div>

          <div className="split-screen--toolbar">
            <div className="toolbar">
              <h3>Toolbar</h3>
              <Display />
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
      </div>
    );
  }
}
