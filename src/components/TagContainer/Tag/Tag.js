import React from "react"
import { RiCloseCircleLine } from "react-icons/ri"
import { useDispatch } from "react-redux"
import { deleteTagAction } from "../../../redux/postContent/actions"

import styles from "../TagContainer.module.css"

const Tag = ({ tag }) => {
  const tagName = tag.tagName

  const dispatch = useDispatch()

  const tagStyle = (tagName) => {
    if (tagName === "Later") {
      return `${styles.Tag} ${styles.Later}`
    } else if (tagName === "Important") {
      return `${styles.Tag} ${styles.Important}`
    } else if (tagName === "Today") {
      return `${styles.Tag} ${styles.Today}`
    } else if (tagName === "To buy") {
      return `${styles.Tag} ${styles.To} ${styles.buy}`
    } else if (tagName === "Immediate") {
      return `${styles.Tag} ${styles.Immediate}`
    } else if (tagName === "etc") {
      return `${styles.Tag} ${styles.etc}`
    } else {
      return `${styles.Tag} ${styles.default}`
    }
  }

  const handleRemoveTag = (id) => {
    dispatch(deleteTagAction(id))
  }

  return (
    <div className={tagStyle(tagName)}>
      <p className={styles.content}>{tagName}</p>
      <RiCloseCircleLine className={styles.removeBtn} onClick={() => handleRemoveTag(tag._id ?? tag.tempId)} />
    </div>
  )
}

export default Tag
