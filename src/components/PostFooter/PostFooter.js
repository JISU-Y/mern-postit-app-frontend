import React from "react"

import { FiPlusCircle, FiMinusCircle } from "react-icons/fi"
import { MdDone } from "react-icons/md"
import { Typography, Button } from "@material-ui/core"
import moment from "moment"

const PostFooter = (props) => {
  console.log(props.isEdit)
  return (
    <div className="setting-container">
      <Typography varian="body2">{moment(props.post.createdAt).fromNow()}</Typography>
      {/* {isUpdated ? <p>{post.updatedAt}(수정됨)</p> : <p>{post.createdAt}</p>} */}
      <div className="icons-container">
        {(props.userGoogleId === props.postCreator || props.userId === props.postCreator) && (
          <FiMinusCircle
            className="minus-icon"
            onClick={() => {
              props.setCurrentId(props.post._id) // currentId로 redering 하기 위함
              props.openRemoveModal()
            }}
          />
        )}
        {props.isEdit ? (
          <div className="edit-done-component">
            <Button variant="contained" color="secondary" size="small" onClick={props.openEditDoneModal}>
              click to edit done
              <MdDone className="done-icon" />
            </Button>
          </div>
        ) : null}
        {(props.userGoogleId === props.postCreator || props.userId === props.postCreator) && (
          <FiPlusCircle className="plus-icon" onClick={props.AddPostHandler} />
        )}
      </div>
    </div>
  )
}

export default PostFooter
