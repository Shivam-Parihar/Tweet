import React, { useState } from "react";
import { Button, ButtonToolbar } from "react-bootstrap";
import EditTweetForm from "../Dashboard/EditTweetForm";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton } from "@material-ui/core";
function EditTweet(props) {
  var token = localStorage.getItem("token");
  var tweetId = props.tweetId;
  const [addModalshow, setAddModalshow] = useState(false);

  function submithandler() {
    setAddModalshow(true);
  }
  function addModalClose() {
    setAddModalshow(false);
  }

  return (
    <div>
      <ButtonToolbar>
        {props.state == true && (
          <div>
            <IconButton onClick={submithandler}>
              <EditIcon></EditIcon>
            </IconButton>
            {addModalshow && (
              <EditTweetForm
                tweetId={props.tweetId}
                show={addModalshow}
                dynamicLoadEdit={props.dynamicLoadEdit}
                onHide={addModalClose}
              />
            )}
          </div>
        )}
      </ButtonToolbar>
    </div>
  );
}

export default EditTweet;
