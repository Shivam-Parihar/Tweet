import { Avatar } from "@material-ui/core";
import PublishIcon from "@material-ui/icons/Publish";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import RepeatIcon from "@material-ui/icons/Repeat";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import IconButton from "@material-ui/core/IconButton";
import Favorite from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import React, { forwardRef, useState } from "react";
import "../CSS/Post.css";
import DeleteTweet from "../Dashboard/DeleteTweet";
import LikeTweet from "../Dashboard/LikeTweet";
import ReplyTweet from "../Dashboard/ReplyTweet";
import EditTweet from "../Dashboard/EditTweet";

const Post = forwardRef(
  (
    {
      verified,
      avatar,
      message,
      Email,
      DeleteState,
      UpdateState,
      tweetId,
      Likes,
      TweetReplies,
      //For GetMyTweetsPage
      dynamicLoadDelete,
      dynamicLoadReply,
      dynamicLoadEdit,
    },
    ref
  ) => {
    return (
      <div className="post" ref={ref}>
        <div className="post__avatar">
          <Avatar src={avatar} />
        </div>
        <div className="post__body">
          <div className="post__header">
            <div className="post__headerText">
              <h3>
                {/* {username} */}

                <span className="post__headerSpecial">
                  {verified && <VerifiedUserIcon className="post__badge" />}
                  {Email}
                </span>
              </h3>
            </div>
            <div className="post__headerDescription">
              <p>{message}</p>
            </div>
          </div>

          <div className="post__footer">
            <div className="column">
              <LikeTweet tweetId={tweetId} Likes={Likes}></LikeTweet>
            </div>
            <input type="hidden" className="getTweetId" value={tweetId}></input>
            <ReplyTweet
              TweetReplies={TweetReplies}
              tweetId={tweetId}
              //For dynamic load reply
              dynamicLoadReply={dynamicLoadReply}
            ></ReplyTweet>
            <div className="column middle">
              <DeleteTweet
                tweetId={tweetId}
                state={DeleteState}
                //Dynamic load delete
                dynamicLoadDelete={dynamicLoadDelete}
              />
            </div>
            <div>
              <EditTweet
                state={UpdateState}
                tweetId={tweetId}
                dynamicLoadEdit={dynamicLoadEdit}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export default Post;
