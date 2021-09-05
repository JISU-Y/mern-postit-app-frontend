import axios from "axios";

// server url에다가 backend폴더의 index.js 보면 end point로 /posts를 사용하기 때문에!
const url = "http://localhost:5000/posts";

export const readPosts = () => axios.get(url);
export const createPost = (newPost) => axios.post(url, newPost);
export const updatePost = (id, updatedPost) =>
  axios.patch(`${url}/${id}`, updatedPost);
