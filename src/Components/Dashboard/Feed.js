import React, { useEffect, useState } from "react";
import "../CSS/Feed.css";

import PostTweetForm from "./PostTweetForm";
import MyTweetList from "./MyTweetList";
import UserList from "./UsersList";

function Feed() {
  var token = localStorage.getItem("token");
  const [toShow, setToShow] = useState("false");
  const [tweets, setMytweets] = useState([]);
  const [users, setUsers] = useState([]);
  const [afterPost, setAfterPost] = useState(false);
  const [dynamicReply, setDynamicReply] = useState(false);

  const [searchUsernameInput, setSearchUsernameInput] = useState("");
  async function fetchMytweetsHandler() {
    fetch(`${process.env.REACT_APP_API_URL}/api/Tweet/GetAllTweets`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("alltweets ->>>>>>>>>", data.Data);
        const transformedMyTweets = data.Data.map((tweetData, index) => {
          return {
            key: index,
            Email: tweetData.Email,
            tweetId: tweetData.Id,
            AddedDate: tweetData.AddedDate,
            Message: tweetData.Message,
            DeleteState: false,
            Likes: tweetData.Likes,
            TweetReplies: tweetData.TweetReplies,
          };
        });

        setMytweets(transformedMyTweets);
        console.log("Feeds after ->>>>>>>>>>>", transformedMyTweets);
        console.log("Feeds after ->>>>>>>>>>>", tweets);
        //console.log("tt", transformedMyTweets[0].Likes.length);
      });
  }

  async function fetchUsersHandler() {
    fetch(
      `${process.env.REACT_APP_API_URL}/api/Tweet/GetTweets/${searchUsernameInput}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("username data", data.Data);
        const allUsers = data.Data.map((user, index) => {
          return {
            key: index,
            // firstName: user.firstName,
            // email: user.Email,
            email: user.Email,
            FirstName: user.FirstName,
            LastName: user.LastName,
            Username: user.Username,
            Message: user.Message,
          };
        });
        setUsers(allUsers);
        console.log("All Users ->>>>>>", allUsers);
      })
      .catch((error) => {
        console.error(error);
        setUsers(null);
      });
  }

  useEffect(() => {
    console.log("Feeds before ->>>>>>>>>>>", tweets);
    fetchMytweetsHandler();
  }, [afterPost, dynamicReply]);

  function onSearchHandler(e) {
    e.preventDefault();
    setToShow("true");
    fetchUsersHandler();
    document.getElementById("searchForm").reset();
  }
  function searchUsername(event) {
    setSearchUsernameInput(event.target.value);
    console.log(event.target.value);
  }

  function onBack() {
    setToShow("false");
  }
  //console.log(posts)

  function afterPostHandle() {
    setAfterPost((s) => !s);
  }

  function dynamicLoadReply() {
    setDynamicReply((s) => !s);
  }
  return (
    <div className="feed">
      <div className="feed__header align">
        <h2>Home</h2>

        <div className="search_bar">
          <form id="searchForm">
            <input
              id="search_username"
              className="search_username"
              onInput={searchUsername}
              placeholder="Search "
            ></input>
            <button onClick={onSearchHandler} className="small">
              Search
            </button>
          </form>
        </div>
      </div>

      {toShow == "false" ? (
        <div>
          <PostTweetForm afterPost={afterPostHandle}></PostTweetForm>
          <MyTweetList
            tweet={tweets}
            dynamicLoadReply={dynamicLoadReply}
          ></MyTweetList>
        </div>
      ) : (
        <div>
          <UserList users={users}></UserList>
          <button onClick={onBack} className="small">
            Back
          </button>
        </div>
      )}
    </div>
  );
}
export default Feed;
