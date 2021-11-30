import { createStore, applyMiddleware, compose } from "redux"
import thunk from "redux-thunk"

import rootReducer from "./rootReducer"

// createStore (reducers / compose)
const store = createStore(rootReducer, compose(applyMiddleware(thunk)))

export default store
