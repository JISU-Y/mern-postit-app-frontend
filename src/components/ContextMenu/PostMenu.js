import React from "react"

const ContextMenu = (props) => {
  const posInStyle = {
    top: props.anchorPoint.y,
    left: props.anchorPoint.x,
  }
  return (
    <ul className="menu" style={posInStyle}>
      <li onClick={props.AddPostHandler}>add</li>
      {props.isEdit && <li onClick={props.openEditDoneModal}>edit done</li>}
      <li onClick={props.openRemoveModal}>delete</li>
      <li onClick={props.changeColor}>changing color</li>
      <hr className="divider" />
      <li onClick={props.handleClick}>Exit</li>
    </ul>
  )
}

export default ContextMenu
