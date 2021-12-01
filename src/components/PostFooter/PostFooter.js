import React from "react"

import { FiPlusCircle, FiMinusCircle } from "react-icons/fi"
import { MdDone } from "react-icons/md"
import { Button } from "@material-ui/core"
import moment from "moment"

import styles from "./PostFooter.module.css"
import hoverStyle from "../TodoList/TodoList.module.css"
import { useDispatch } from "react-redux"
import { createPost } from "../../redux"

const PostFooter = (props) => {
  const dispatch = useDispatch()

  const onDelete = () => {
    props.openRemoveModal()
  }

  const handleAddPost = () => {
    // props.AddPostHandler 이렇게 안해줘도 됨.
    dispatch(
      createPost({
        name: "",
        tag: [],
        todos: [],
        position: { x: null, y: null },
      })
    )
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
            <FiPlusCircle className={styles.plus} onClick={handleAddPost} />
          </>
        )}
      </div>
    </div>
  )
}

export default PostFooter
