import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { createPost, deletePost } from "../../redux"

import styles from "./Pallette.module.css"

const initialState = {
  name: "",
  tag: [],
  todos: [],
  position: { x: null, y: null },
}

const Pallette = () => {
  const posts = useSelector((state) => state.posts.posts)
  const post = useSelector((state) => state.post)
  const user = useSelector((state) => state.auth.authData)
  const dispatch = useDispatch()

  const handleAddPost = () => {
    dispatch(
      createPost({
        ...initialState,
        name: user?.result?.name,
      })
    )
  }

  const handleDeleteAll = () => {
    const userName = user?.result?.name
    posts.forEach((post) => {
      if (post.name === userName) {
        dispatch(deletePost(post._id))
      }
    })
  }

  const handleShowMine = () => {
    console.log(posts)
  }

  return (
    <div className={styles.container}>
      {user?.result?.name ? (
        <div className={styles.buttons}>
          <button className={styles.addBtn} onClick={handleAddPost}>
            add my post
          </button>
          <button className={styles.deleteAllBtn} onClick={handleDeleteAll}>
            delete my all posts
          </button>
          <button className={styles.mineBtn} onClick={handleShowMine}>
            show mine only
          </button>
          <button className={styles.showAllBtn}>show all</button>
        </div>
      ) : (
        <p className={styles.admin}>Please Sign in or Sign up to create your own posts</p>
      )}
    </div>
  )
}

export default Pallette
