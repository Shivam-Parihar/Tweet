import React, { useState } from "react";
import { Avatar, Button } from "@material-ui/core";
import "../CSS/TweetBox.css";
function PostTweetForm(props) {
  const [enteredmsg, setEnteredMessage] = useState("");
  var token = localStorage.getItem("token");

  const msgChangeHandler = (event) => {
    setEnteredMessage(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    console.log(enteredmsg);
    const UserTweetMsgData = {
      Message: enteredmsg,
    };
    PostTweetHandler(UserTweetMsgData);
    console.log("tweet posted ->>>", UserTweetMsgData);

    document.getElementById("postTweetForm").reset();
  };

  async function PostTweetHandler(tweetmsgdata) {
    await fetch(`${process.env.REACT_APP_API_URL}/api/Tweet/PostTweet`, {
      method: "POST",
      body: JSON.stringify(tweetmsgdata),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }).then((response) => {
      props.afterPost();
      return response;
    });
    // const data = await response.json();
    // console.log(data);
  }

  return (
    <div className="tweetBox">
      <form id="postTweetForm">
        <div className="tweetBox__input">
          <Avatar />
          <input
            onChange={msgChangeHandler}
            placeholder="What's happening"
            id="message"
            type="text"
          />
        </div>
        <Button onClick={submitHandler} className="tweetBox__tweetButton">
          Tweet
        </Button>
      </form>
    </div>
  );
}

export default PostTweetForm;
