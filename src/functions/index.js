import * as api from "../api";

export const readPosts = async () => {
  try {
    const { data } = await api.readPosts();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const createPost = async (post) => {
  try {
    const { data } = await api.createPost(post);
    return data;
  } catch (error) {
    console.log(error);
  }
};
