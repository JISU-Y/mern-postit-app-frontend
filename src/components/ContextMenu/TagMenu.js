import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { addTagAction } from "../../redux"

import styles from "./ContextMenu.module.css"

const TagMenu = (props) => {
  const post = useSelector((state) => state.post)
  const dispatch = useDispatch()

  const posInStyle = {
    top: props.anchorPoint.y,
    left: props.anchorPoint.x,
  }

  const onAddTag = (tagName) => {
    if (post.tag.includes(tagName)) return
    // props.handleAddTags(tagName)
    dispatch(addTagAction(tagName))
  }

  return (
    <ul className={styles.menu} style={posInStyle}>
      <li onClick={() => onAddTag("Later")}>Later to do</li>
      <li onClick={() => onAddTag("Important")}>Important to do</li>
      <li onClick={() => onAddTag("Today")}>Today's to do</li>
      <li onClick={() => onAddTag("To buy")}>Need to buy</li>
      <hr />
      <li onClick={props.handleClick}>Exit</li>
    </ul>
  )
}

export default TagMenu
