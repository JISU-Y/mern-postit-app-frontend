import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux" // state를 어디에서든 접근할 수 있도록 해주는 Provider

import "./index.css"
import App from "./App"

import store from "./redux/store"

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
)
