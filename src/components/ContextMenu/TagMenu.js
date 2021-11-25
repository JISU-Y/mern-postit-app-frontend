import React from "react"

const TagMenu = (props) => {
  const posInStyle = {
    top: props.anchorPoint.y,
    left: props.anchorPoint.x,
  }

  const onAddTag = (tagName) => {
    props.handleAddTags(tagName)
  }

  return (
    <ul className="menu" style={posInStyle}>
      <li onClick={() => onAddTag("Later")}>Later to do</li>
      <li onClick={() => onAddTag("Important")}>Important to do</li>
      <li onClick={() => onAddTag("Today")}>Today's to do</li>
      <li onClick={() => onAddTag("To buy")}>Need to buy</li>
      <hr className="divider" />
      <li onClick={props.handleClick}>Exit</li>
    </ul>
  )
}

export default TagMenu
