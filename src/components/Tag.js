import React from "react";

const Tag = ({ tag }) => {
  return (
    <div className="post-tag">
      <p>{tag}</p>
      <button className="rm-tag-btn btn">X</button>
    </div>
  );
};

export default Tag;
