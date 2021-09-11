import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux"; // state를 어디에서든 접근할 수 있도록 해주는 Provider
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import { reducers } from "./reducers"; // reducer import

import "./index.css";
import App from "./App";

// createStore (reducers / compose)
const store = createStore(reducers, compose(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
