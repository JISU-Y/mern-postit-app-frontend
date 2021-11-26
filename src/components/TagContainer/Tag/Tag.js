import React from "react"
import { RiCloseCircleLine } from "react-icons/ri"

import styles from "../TagContainer.module.css"

const Tag = ({ tag, handleRemoveTags }) => {
  const tagStyle = (tag) => {
    if (tag === "Later") {
      return `${styles.Tag} ${styles.Later}`
    } else if (tag === "Important") {
      return `${styles.Tag} ${styles.Important}`
    } else if (tag === "Today") {
      return `${styles.Tag} ${styles.Today}`
    } else if (tag === "To buy") {
      return `${styles.Tag} ${styles.To} ${styles.buy}`
    } else {
      return `${styles.Tag} ${styles.Later}`
    }
  }
  return (
    <div className={tagStyle(tag)}>
      <p className={styles.content}>{tag}</p>
      <RiCloseCircleLine className={styles.removeBtn} onClick={() => handleRemoveTags(tag)} />
    </div>
  )
}

export default Tag
