import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { createPost } from "../../redux"

import styles from "./ContextMenu.module.css"

const ContextMenu = (props) => {
  const user = useSelector((state) => state.auth.authData)
  const dispatch = useDispatch()

  const posInStyle = {
    top: props.anchorPoint.y,
    left: props.anchorPoint.x,
  }

  const AddPostHandler = () => {
    // user name만 있는 빈 post 생성
    dispatch(
      createPost({
        name: user?.result?.name,
        tag: [],
        todos: [],
        position: { x: null, y: null },
      })
    )
  }

  return (
    <ul className={styles.menu} style={posInStyle}>
      <li onClick={AddPostHandler}>add</li>
      {props.isEdit && <li onClick={props.openEditDoneModal}>edit done</li>}
      <li onClick={props.openRemoveModal}>delete</li>
      <hr />
      <li onClick={props.clear}>Exit</li>
    </ul>
  )
}

export default ContextMenu
