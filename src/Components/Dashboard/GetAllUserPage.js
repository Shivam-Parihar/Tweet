import React, { useEffect, useState } from "react";

import UsersList from "../Dashboard/UsersList";

function GetMyTweetsPage() {
  const [users, setUsers] = useState([]);
  var State = true;
  var token = localStorage.getItem("token");

  async function fetchAllUsersHandler() {
    fetch(`${process.env.REACT_APP_API_URL}/api/Tweet/GetAllUsers`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data.Data);
        const allUsers = data.Data.map((user, index) => {
          return {
            key: index,
            // firstName: user.firstName,
            Email: user.Email,
            firstName: user.FirstName,
            lastName: user.LastName,
            username: user.Username,
          };
        });
        setUsers(allUsers);
        console.log("tt", allUsers);
      });
  }
  useEffect(() => {
    fetchAllUsersHandler();
  }, []);
  return (
    <React.Fragment>
      <div className="feed">
        <div className="feed__header">
          <h2>Users</h2>
        </div>
        <section>
          <UsersList users={users} />
        </section>
      </div>
    </React.Fragment>
  );
}

export default GetMyTweetsPage;
