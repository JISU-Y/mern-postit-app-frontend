import React from "react"

import styles from "./TodoBoard.module.css"

const PostButton = ({ AddPostHandler }) => {
  return (
    <button className={styles.startBtn} onClick={AddPostHandler}>
      Add my post
    </button>
  )
}

export default PostButton
