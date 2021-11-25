import React from "react"
import { RiCloseCircleLine } from "react-icons/ri"

import styles from "../TagContainer.module.css"

const Tag = ({ tag, handleRemoveTags }) => {
  return (
    <div className={styles.tag}>
      <p className={styles.content}>{tag}</p>
      <RiCloseCircleLine className={styles.removeBtn} onClick={() => handleRemoveTags(tag)} />
    </div>
  )
}

export default Tag
