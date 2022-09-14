import React, { useEffect, useState } from "react";

import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import IconButton from "@material-ui/core/IconButton";
import Favorite from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";

var likesTest = false;
function LikeTweet(props) {
  var token = localStorage.getItem("token");
  var ID = props.tweetId;
  var likesList = props.Likes;
  var userId;
  const [result, setResult] = useState(false);
  const [like, setLike] = useState(false);

  // if (
  //   localStorage.getItem("userId") !== null ||
  //   localStorage.getItem("userId") !== undefined ||
  //   localStorage.getItem("userId") !== ""
  // ) {
  //   localStorage.removeItem("userId");
  // }

  function submithandler() {
    likeTweetHandler();

    likesTest = !likesTest;
  }

  async function likeTweetHandler() {
    await fetch(`${process.env.REACT_APP_API_URL}/api/Tweet/like/${ID}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(() => {
      setResult((s) => !s);
    });
  }
  async function getUserIdHandler() {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/Tweet/GetIdFromToken`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    localStorage.setItem("userId", data.Data);
    userId = localStorage.getItem("userId");
    console.log("userId->>>>>>>>>>>>>>>>>", userId);
    console.log(
      "(user.userId == userId)",
      likesList.some((user) => user.UserId == userId)
    );
    //console.log("userId->>>>>>>>>>", userId);
    setResult(likesList.some((user) => user.UserId == userId));
    console.log("LikesList", likesList);
    console.log("setResult", result);
  }

  useEffect(() => {
    getUserIdHandler();
    // console.log("inside the useEffect likess list ", likesList);
    // console.log(
    //   "(user.userId == userId)",
    //   likesList.some((user) => user.UserId == userId)
    // );
    // console.log("userId->>>>>>>>>>", localStorage.getItem("userId"));
    //setResult(likesList.some((user) => user.userId == userId));
  }, []);
  return (
    <IconButton color="secondary" onClick={submithandler}>
      {console.log("fav icon", result)}
      {result == true ? <Favorite /> : <FavoriteBorder />}
    </IconButton>
  );
}

export default LikeTweet;
