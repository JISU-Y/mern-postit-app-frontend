import React from "react"
import { RiCloseCircleLine } from "react-icons/ri"

import styles from "../TagContainer.module.css"

const Tag = ({ tag, handleRemoveTags }) => {
  // styles.tag....... 이거 tag 어떻게 함 ㅠㅠ
  return (
    <div className={`${styles.Tag} ${styles.tag}`}>
      <p className={styles.content}>{tag}</p>
      <RiCloseCircleLine className={styles.removeBtn} onClick={() => handleRemoveTags(tag)} />
    </div>
  )
}

export default Tag
