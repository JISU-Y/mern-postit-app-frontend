import { combineReducers } from "redux"

import posts from "./posts"
import auth from "./auth"

// rootReducer
export const reducers = combineReducers({ posts, auth })
