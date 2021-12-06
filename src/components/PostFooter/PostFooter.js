import React from "react"
import { TiDeleteOutline } from "react-icons/ti"
import { MdDone } from "react-icons/md"
import { useSelector } from "react-redux"
import moment from "moment"

import styles from "./PostFooter.module.css"
import hoverStyle from "../TodoList/TodoList.module.css"

const PostFooter = (props) => {
  const user = useSelector((state) => state.auth.authData)

  const onDelete = () => {
    props.openRemoveModal()
  }

  return (
    <div className={styles.container}>
      <p className={hoverStyle.createdTime} varian="body2">
        {moment(props.post.createdAt).fromNow()}
      </p>
      <div className={styles.icons}>
        {(user?.result?.googleId === props.post?.creator || user?.result?._id === props.post?.creator) && (
          <>
            {props.isEdit && (
              <button className={styles.editDone} variant="contained" color="secondary" size="small" onClick={props.openEditDoneModal}>
                <p>click to edit done</p>
                <MdDone className={styles.done} />
              </button>
            )}
            <TiDeleteOutline className={hoverStyle.minus} onClick={onDelete} />
          </>
        )}
      </div>
    </div>
  )
}

export default PostFooter
