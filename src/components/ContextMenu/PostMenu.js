import React from "react"

import styles from "./ContextMenu.module.css"

const ContextMenu = (props) => {
  const posInStyle = {
    top: props.anchorPoint.y,
    left: props.anchorPoint.x,
  }

  return (
    <ul className={styles.menu} style={posInStyle}>
      <li onClick={props.AddPostHandler}>add</li>
      {props.isEdit && <li onClick={props.openEditDoneModal}>edit done</li>}
      <li onClick={props.openRemoveModal}>delete</li>
      <hr />
      <li onClick={props.handleClick}>Exit</li>
    </ul>
  )
}

export default ContextMenu
