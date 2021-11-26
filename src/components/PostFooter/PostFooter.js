import React from "react"

import { FiPlusCircle, FiMinusCircle } from "react-icons/fi"
import { MdDone } from "react-icons/md"
import { Button } from "@material-ui/core"
import moment from "moment"

import styles from "./PostFooter.module.css"
import hoverStyle from "../TodoList/TodoList.module.css"

const PostFooter = (props) => {
  const onDelete = () => {
    props.setCurrentId(props.post._id) // currentId로 redering 하기 위함
    props.openRemoveModal()
  }
  return (
    <div className={styles.container}>
      <p className={styles.createdTime} varian="body2">
        {moment(props.post.createdAt).fromNow()}
      </p>
      <div className={styles.icons}>
        {(props.userGoogleId === props.postCreator || props.userId === props.postCreator) && (
          <>
            <FiMinusCircle className={hoverStyle.minus} onClick={onDelete} />
            {props.isEdit && (
              <div className={styles.editDone}>
                <Button variant="contained" color="secondary" size="small" onClick={props.openEditDoneModal}>
                  click to edit done
                  <MdDone className={styles.done} />
                </Button>
              </div>
            )}
            <FiPlusCircle className={styles.plus} onClick={props.AddPostHandler} />
          </>
        )}
      </div>
    </div>
  )
}

export default PostFooter
