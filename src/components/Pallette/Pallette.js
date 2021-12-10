import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { createPost, deletePost } from "../../redux"

import styles from "./Pallette.module.css"

const initialState = {
  name: "",
  tag: [],
  todos: [],
  position: { x: 0, y: 0 },
}

const Pallette = () => {
  const posts = useSelector((state) => state.posts.posts)
  const user = useSelector((state) => state.auth.authData)
  const dispatch = useDispatch()

  const handlePosition = () => {
    console.log(window.pageXOffset, window.pageYOffset)
  }

  const handleAddPost = () => {
    console.log({ x: window.pageXOffset, y: window.pageYOffset })
    dispatch(
      createPost({
        ...initialState,
        name: user?.result?.name,
        position: { x: `${window.pageXOffset}px`, y: `${window.pageYOffset}px` },
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
            add post
          </button>
          <button className={styles.deleteAllBtn} onClick={handleDeleteAll}>
            delete all
          </button>
          <button className={styles.mineBtn} onClick={handleShowMine}>
            show mine only
          </button>
          <button className={styles.showAllBtn} onClick={handlePosition}>
            show all
          </button>
        </div>
      ) : (
        <p className={styles.admin}>Please Sign in or Sign up to create your own posts</p>
      )}
    </div>
  )
}

export default Pallette
