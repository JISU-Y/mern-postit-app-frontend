import React from "react";
import { RiCloseCircleLine } from "react-icons/ri";

const Tag = ({ tag, handleRemoveTags }) => {
  return (
    <div className={`post-tag ${tag}`}>
      <p>{tag}</p>
      <RiCloseCircleLine
        className="rm-tag-btn btn"
        onClick={() => handleRemoveTags(tag)}
      >
        X
      </RiCloseCircleLine>
    </div>
  );
};

export default Tag;
