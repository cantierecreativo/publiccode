import React, { Component } from "react";
import RichTextEditor from "react-rte";

export default class MyEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: RichTextEditor.createEmptyValue()
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange(value) {
    console.log(value);
    this.setState({ value });
    if (this.props.onChange) {
      console.log(".");
      this.props.onChange(value.toString("html"));
    }
  }

  render() {
    return <RichTextEditor value={this.state.value} onChange={this.onChange} />;
  }
}
