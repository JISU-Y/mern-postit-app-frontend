import React from "react";

const PostForm = ({ AddPostHandler }) => {
  return (
    <button className="start-post-btn" onClick={AddPostHandler}>
      start posting
    </button>
  );
};

export default PostForm;
