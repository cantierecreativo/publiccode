import React, { Component } from "react";
import { connect } from "react-redux";

import Schema from "../contents/schema";
import cleanDeep from "clean-deep";
import jsyaml from "../../../node_modules/js-yaml/dist/js-yaml.js";

import renderField from "../myform/renderField";
import buildSyncValidation from "../myform/buildSyncValidation";

import { initialize, submit } from "redux-form";
import { notify, clearNotifications } from "../store/notifications";
import { DefaultTheme } from "../myform";
import myTheme from "../myform/widgets/";
import { reduxForm } from "redux-form";
import compileSchema from "../myform/compileSchema";
import langs from "../contents/langs";
import tags from "../contents/tags";
import _ from "lodash";
import u from "updeep";
import { SubmissionError } from "redux-form";
import Ajv from "ajv";
import validator from "validator";
import Toolbar from "./toolbar";

const jsonData = require("../schema.json");
const APP_FORM = "appForm";
const ajv = new Ajv({
  errorDataPath: "property",
  allErrors: true,
  jsonPointers: false
});
let schema = {};

const mapStateToProps = state => {
  return {
    notifications: state.notifications
  };
};

const mapDispatchToProps = dispatch => {
  return {
    notify: (type, data) => dispatch(notify(type, data)),
    clearNotifications: (type, data) =>
      dispatch(clearNotifications(type, data)),
    initialize: (name, data) => dispatch(initialize(name, data)),
    submit: name => dispatch(submit(name))
  };
};

const getReleases = () => {
  const url =
    "https://api.github.com/repos/publiccodenet/publiccode.yml/contents/version";
  return fetch(url)
    .then(res => res.json())
    .then(data => data.map(d => d.name));
};

@connect(
  mapStateToProps,
  mapDispatchToProps
)
export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      yaml: null,
      formData: null,
      loading: true
    };

    this.submit = this.submit.bind(this);
  }

  async componentDidMount() {
    let versions = await getReleases();
    console.log("VERSIONS", versions);
    this.getSchema(versions);
  }

  getSchema(versions) {
    console.log(versions);
    let customMeta = {
      definitions: {
        descriptionPerLang: {
          properties: {
            longDescription: {
              widget: "editor"
            }
          }
        },
        landingURL: {
          widget: "url"
        },
        releaseDate: {
          widget: "date"
        },
        developmentStatus: {
          widget: "choice-multiple-expanded"
        },
        softwareType: {
          widget: "choice-multiple-expanded"
        }
      }
    };

    let custom_props = {
      publiccodeYamlVersion: {
        type: "array",
        items: {
          type: "string",
          title: "Version",
          enum: versions
        }
      },
      swDescription: {
        type: "array",
        uniqueItems: true,
        items: {
          type: "object",
          properties: {
            language: {
              type: "string",
              title: "Language",
              enum: langs
            },
            description: { $ref: "#/definitions/descriptionPerLang" }
          },
          required: ["language", "description"]
        }
      }
    };

    delete jsonData.$schema;
    delete jsonData.id;

    let data = jsonData;
    //data = Object.assign({}, custom_props, data);
    let custom_field_keys = _.keys(custom_props);
    custom_field_keys.map(k => {
      data.properties[k] = custom_props[k];
    });
    data = u(customMeta, data);

    console.log("DATA", data);
    let obj = jsyaml.load(JSON.stringify(data));

    schema = compileSchema(obj);
    console.log("COMPILED SCHEMA", obj);
    this.setState({ loading: false });
  }

  submit(data) {
    this.notify();
    console.log("SUBMIT");

    data = cleanDeep(data);
    console.log(data);
    //REFORMAT CUSTOM FIELDS DATA
    try {
      let yaml = jsyaml.dump(data);
      this.setState({ yaml, error: null });
    } catch (e) {
      console.error(e);
    }
  }

  onLoad(formData, yaml) {
    console.log("loaded", yaml, formData);
    this.setState({ formData, yaml });
  }

  notify(title = "hey", msg = "ciao", millis = 3000) {
    this.props.notify({ title, msg, millis });
  }

  BaseForm(props) {
    const {
      schema,
      handleSubmit,
      theme,
      error,
      submitting,
      context,
      load,
      pristine
    } = props;

    return (
      <form className="form" onSubmit={handleSubmit}>
        <div>{error && <strong>{error}</strong>}</div>
        {renderField(schema, null, theme || DefaultTheme, "", context)}
        {/*!error && (
          <button
            className="btn btn-primary"
            type="submit"
            disabled={submitting}
          >
            Submit
          </button>
        )*/}
      </form>
    );
  }

  renderForm() {
    const { loading } = this.state;
    if (loading) return <div>Loading...</div>;
    console.log("COMPILED SCHEMA", schema);
    const initialValues = Schema.initialValues;
    const MyForm = reduxForm({
      form: APP_FORM,
      validate: buildSyncValidation(schema),
      initialValues: initialValues
    })(this.BaseForm);

    return (
      <MyForm
        renderFields={renderField}
        formKey={APP_FORM}
        schema={schema}
        theme={myTheme}
        initialValues={initialValues}
        onSubmit={this.submit}
      />
    );
  }

  reset(data) {
    if (!data) {
      data = Schema.initialValues;
    }
    console.log("RESET", data);
    this.props.initialize(APP_FORM, data);
  }

  render() {
    let { yaml } = this.state;
    return (
      <div>
        <div className="split-screen">
          <div className="split-screen--form">
            {this.renderForm()}
          </div>

          <div className="split-screen--toolbar">
            <button
              className="btn btn-primary"
              onClick={() => this.props.submit(APP_FORM)}
            >
              Submit
            </button>
            <Toolbar
              yaml={yaml}
              onLoad={this.onLoad.bind(this)}
              initialValues={Schema.initialValues}
            />
          </div>
        </div>
      </div>
    );
  }
}
