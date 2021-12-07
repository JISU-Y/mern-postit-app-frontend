import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { createPost } from "../../redux"

import styles from "./Pallette.module.css"

const initialState = {
  name: "",
  tag: [],
  todos: [],
  position: { x: null, y: null },
}

const Pallette = () => {
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

  return (
    <div className={styles.container}>
      {user?.result?.name ? (
        <div className={styles.buttons}>
          <button className={styles.addBtn} onClick={handleAddPost}>
            add a post
          </button>
          <button className={styles.mineBtn}>show mine only</button>
          <button className={styles.showAllBtn}>show all</button>
        </div>
      ) : (
        <p className={styles.admin}>Please Sign in or Sign up to create your own posts</p>
      )}
    </div>
  )
}

export default Pallette
