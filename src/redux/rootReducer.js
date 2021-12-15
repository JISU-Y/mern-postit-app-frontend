import { combineReducers } from "redux"
import postsReducer from "./posts/reducer"
import authReducer from "./auth/reducer"
import postContentsReducer from "./postContent/reducer"
import paletteReducer from "./palette/reducer"

const rootReducer = combineReducers({
  posts: postsReducer,
  auth: authReducer,
  post: postContentsReducer,
  palette: paletteReducer,
})

export default rootReducer
