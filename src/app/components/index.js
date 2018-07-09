import React, { Component } from "react";
import { connect } from "react-redux";

import Schema from "../contents/schema";
import cleanDeep from "clean-deep";
import jsyaml from "../../../node_modules/js-yaml/dist/js-yaml.js";

import { initialize } from "redux-form";
import { notify, clearNotifications } from "../store/notifications";

import Liform from "../myform";
import { DefaultTheme } from "../myform";

import myTheme from "../myform/widgets/";
import { reduxForm } from "redux-form";
import renderField from "../myform/renderField";
import processSubmitErrors from "../myform/processSubmitErrors";
import buildSyncValidation from "../myform/buildSyncValidation";
import { setError } from "../myform/buildSyncValidation";
import compileSchema from "../myform/compileSchema";

import langs from "../contents/langs";
import tags from "../contents/tags";

import _ from "lodash";
import u from "updeep";
import { SubmissionError } from "redux-form";
import Ajv from "ajv";

import Toolbar from "./toolbar";
//const myTheme = DefaultTheme;
let schema = {};
const jsonData = require("../schema.json");
const APP_FORM = "appForm";
let ajv = new Ajv({
  errorDataPath: "property",
  allErrors: true,
  jsonPointers: false
});

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
      formData: null,
      loading: true
    };

    this.submit = this.submit.bind(this);
    this.validateForm = this.validateForm.bind(this);
  }

  componentDidMount() {
    this.getSchema();
  }

  getSchema() {
    // console.log(jsonData);
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
    //console.log("SCHEMA", obj);
    this.setState({ loading: false });
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

  notify(title = "hey", msg = "ciao", millis = 3000) {
    this.props.notify({ title, msg, millis });
  }

  onLoad(formData, yaml) {
    console.log("loaded", yaml, formData);
    this.setState({ formData, yaml });
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
    const {
      schema,
      handleSubmit,
      theme,
      error,
      submitting,
      context,
      load,
      pristine,
      reset
    } = props;

    return (
      <div>
        <form className="form" onSubmit={handleSubmit}>
          {renderField(schema, null, theme || DefaultTheme, "", context)}
          <div>{error && <strong>{error}</strong>}</div>
          <button
            className="btn btn-primary"
            type="submit"
            disabled={submitting}
          >
            Submit
          </button>
        </form>
      </div>
    );
  }

  renderForm() {
    const { formData, id, loading } = this.state;

    if (loading) return <div>Loading...</div>;

    console.log("COMPILED SCHEMA", schema);
    const initialValues = Schema.initialValues;
    const validate = this.validateForm;

    const MyForm = reduxForm({
      form: APP_FORM,
      validate: buildSyncValidation(schema, null),
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

  validateForm(values) {
    //console.log("VALIDATE ", values);
    //
    let valid;
    try {
      // valid = ajv.validate(schema, values);
      // console.log("VALID? ", valid);
      // const ajvErrors = ajv.errors;
      // if (ajvErrors) {
      //   let errors = ajvErrors.map((error, index) => {
      //     console.log(index, error);
      //   });
      // }

      valid = buildSyncValidation(schema, null, values);
    } catch (error) {
      console.log(error);
    }
    return valid;
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
            <div className="spacer">&nbsp;</div>
          </div>

          <div className="split-screen--toolbar">
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
