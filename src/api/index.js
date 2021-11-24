import axios from "axios"

const API = axios.create({
  baseURL: "https://postit-app-mern-project.herokuapp.com",
})
// server 주소

// backend에서 token을 verify할 수 있도록 해줌
API.interceptors.request.use((req) => {
  // login 된 상태라면
  if (localStorage.getItem("profile")) {
    req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem("profile")).token}` // local Storage에서 login 된 user의 token을 가져옴
  }

  return req
})

// // server url에다가 backend폴더의 index.js 보면 end point로 /posts를 사용하기 때문에!
// const url = "http://localhost:5000/posts";

export const readPosts = () => API.get("/posts")
export const createPost = (newPost) => API.post("/posts", newPost)
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost)
export const deletePost = (id) => API.delete(`/posts/${id}`)

export const signIn = (formData) => API.post("/user/signin", formData) // api로 db에 data를 요청
export const signUp = (formData) => API.post("/user/signup", formData)
