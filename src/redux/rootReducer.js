import { combineReducers } from "redux"
import postsReducer from "./posts/reducer"
import authReducer from "./auth/reducer"
import postContentsReducer from "./postContent/reducer"
import palletteReducer from "./pallette/reducer"

const rootReducer = combineReducers({
  posts: postsReducer,
  auth: authReducer,
  post: postContentsReducer,
  pallette: palletteReducer,
})

export default rootReducer
