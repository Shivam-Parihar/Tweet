import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
//import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

function EditTweetForm(props) {
  //Modal
  // const [open, setOpen] = React.useState(false);
  // const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);

  const [open, setOpen] = useState(true);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    props.onHide();
    setOpen(false);
  };
  //-------------------
  var token = localStorage.getItem("token");
  var ID = props.tweetId;
  const [msg, setEnteredMsg] = useState("");

  const msgChangeHandler = (event) => {
    setEnteredMsg(event.target.value);
  };

  function handleSubmit(event) {
    event.preventDefault();
    const editedTweetmsg = {
      Message: msg,
    };
    setOpen(false);
    EditTweetHandler(editedTweetmsg);
  }

  async function EditTweetHandler(editedTweetmsg) {
    await fetch(`${process.env.REACT_APP_API_URL}/api/Tweet/update/${ID}`, {
      method: "PUT",
      body: JSON.stringify(editedTweetmsg),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }).then(() => {
      props.dynamicLoadEdit();
    });
    // const data = await response.json();
    // console.log(data);
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogContent>
          <DialogContentText>Edit Tweet</DialogContentText>
          <TextField
            onChange={msgChangeHandler}
            autoFocus
            margin="dense"
            id="name"
            label="Tweet"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Edit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default EditTweetForm;
