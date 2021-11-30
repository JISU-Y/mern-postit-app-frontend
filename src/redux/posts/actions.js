import * as api from "../../api"
import { FETCH_ALL, CREATE, UPDATE, DELETE } from "./types"

// action creator
const fetchPosts = (posts) => {
  return {
    type: FETCH_ALL,
    payload: posts,
  }
}

const createPostAction = (post) => {
  return {
    type: CREATE,
    payload: post,
  }
}

const updatePostAction = (post) => {
  return {
    type: UPDATE,
    payload: post,
  }
}

const deletePostAction = (id) => {
  return {
    type: DELETE,
    payload: id,
  }
}

// redux-thunk middleware
export const getPosts = () => async (dispatch) => {
  try {
    // server에 post들 달라는 요청
    // data에 response를 넣음
    const { data } = await api.readPosts() // {data} = response

    console.log(data)

    dispatch(fetchPosts(data)) // action dispatching
    // payload를 통해 data return
  } catch (error) {
    console.log(error.message)
  }
}

export const createPost = (post) => async (dispatch) => {
  try {
    const { data } = await api.createPost(post)

    console.log(data)

    dispatch(createPostAction(data))
  } catch (error) {
    console.log(error.message)
  }
}

export const updatePost = (id, post) => async (dispatch) => {
  try {
    console.log(id, post)
    const { data } = await api.updatePost(id, post)

    console.log(data)
    dispatch(updatePostAction(data))
  } catch (error) {
    console.log(error.message)
  }
}

export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id)

    dispatch(deletePostAction(id))
  } catch (error) {
    console.log(error.message)
  }
}
