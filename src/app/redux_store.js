import React, { Component } from "react";

import { createStore, combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

const reducer = combineReducers({
  form: formReducer
});

const store = (window.devToolsExtension
  ? window.devToolsExtension()(createStore)
  : createStore)(reducer);

export default store;
