import React from "react";

const Tag = ({ tag, handleRemoveTags }) => {
  return (
    <div className="post-tag">
      <p>{tag}</p>
      <button className="rm-tag-btn btn" onClick={() => handleRemoveTags(tag)}>
        X
      </button>
    </div>
  );
};

export default Tag;
