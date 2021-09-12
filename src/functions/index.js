import * as api from "../api";

// redux dispatch 함수 (read posts / fetch posts)
export const getPosts = () => async (dispatch) => {
  try {
    const { data } = await api.readPosts(); // {data} = response

    dispatch({ type: "FETCH_ALL", payload: data }); // action dispatching
    // payload를 통해 data return
  } catch (error) {
    console.log(error.message);
  }
};

export const createPost = (post) => async (dispatch) => {
  try {
    const { data } = await api.createPost(post);

    dispatch({ type: "CREATE", payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post);

    dispatch({ type: "UPDATE", payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);

    dispatch({ type: "DELETE", payload: id });
  } catch (error) {
    console.log(error.message);
  }
};

// 기존
// export const readPosts = async () => {
//   try {
//     const { data } = await api.readPosts();
//     return data;
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const createPost = async (post) => {
//   try {
//     const { data } = await api.createPost(post);
//     return data;
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const updatePost = async (id, post) => {
//   try {
//     const { data } = await api.updatePost(id, post);
//     return data;
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const deletePost = async (id) => {
//   try {
//     await api.deletePost(id);
//   } catch (error) {
//     console.log(error);
//   }
// };
