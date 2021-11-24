import * as api from "../api"

// redux-thunk middleware and action create

// redux dispatch 함수 (read posts / fetch posts)
export const getPosts = () => async (dispatch) => {
  try {
    // server에 post들 달라는 요청
    // data에 response를 넣음
    const { data } = await api.readPosts() // {data} = response

    dispatch({ type: "FETCH_ALL", payload: data }) // action dispatching
    // payload를 통해 data return
  } catch (error) {
    console.log(error.message)
  }
}

export const createPost = (post) => async (dispatch) => {
  try {
    const { data } = await api.createPost(post)

    dispatch({ type: "CREATE", payload: data })
  } catch (error) {
    console.log(error.message)
  }
}

export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post)

    dispatch({ type: "UPDATE", payload: data })
  } catch (error) {
    console.log(error.message)
  }
}

export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id)

    dispatch({ type: "DELETE", payload: id })
  } catch (error) {
    console.log(error.message)
  }
}
