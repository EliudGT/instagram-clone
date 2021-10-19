import React from "react";
import "./Post.css";
import { Avatar } from "@mui/material";

const Post = ({username, caption, imageUrl}) => {
  return (
    <>
      <div className="post">
        <div className="post__header">
        <Avatar
          alt="Remy Sharp"
          className="post__avatar"
          src="/static/images/avatar/1.jpg"
          sx={{ width: 24, height: 24 }}
        />
        <h3>{username}</h3>
        </div>
        
        {/*Header -> avatar + username*/}
        <img src={imageUrl} className="post__image" alt="image" />
        
        {/*image*/}
        <h4 className="post__text"><strong>{username}</strong> {caption}</h4>
        {/*username + caption*/}
      </div>
    </>
  );
};

export default Post;
