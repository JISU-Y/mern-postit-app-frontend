import React from "react"

const PostButton = ({ AddPostHandler }) => {
  return (
    <button className="start-post-btn" onClick={AddPostHandler}>
      start posting
    </button>
  )
}

export default PostButton
