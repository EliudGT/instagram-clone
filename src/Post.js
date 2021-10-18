import React from "react";
import "./Post.css";
import { Avatar } from "@mui/material";

const Post = () => {
  return (
    <>
      <div className="post">
        <div className="post__header"></div>
        <Avatar
          alt="Remy Sharp"
          src="/static/images/avatar/1.jpg"
          sx={{ width: 24, height: 24 }}
        />
        {/*Header -> avatar + username*/}
        <img
          src="https://ep1.pinkbike.org/p2pb21499691/p2pb21499691.jpg"
          alt=""
          className="post__image"
        />
        {/*image*/}
        <h4 className="post__text">
          {" "}
          <strong>Username:</strong> caption
        </h4>
        {/*username + caption*/}
      </div>
    </>
  );
};

export default Post;
