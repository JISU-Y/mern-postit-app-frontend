import React from "react"

import styles from "./TodoBoard.module.css"

const PostButton = ({ AddPostHandler }) => {
  return (
    <button className={styles.startBtn} onClick={AddPostHandler}>
      start posting
    </button>
  )
}

export default PostButton
