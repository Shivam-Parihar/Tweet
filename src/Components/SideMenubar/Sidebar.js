import React from "react";
import "./Sidebar.css";
import SidebarOption from "./SlidebarOption";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import { Button } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
function Sidebar(props) {
  var navigate = useNavigate();
  function backHandler() {
    navigate("/", { replace: true });
    localStorage.removeItem("userId");
  }
  function onChangeSidebarHandler(goto) {
    props.changeNav(goto);
  }
  return (
    <div className="sidebar">
      <SidebarOption
        Icon={HomeIcon}
        text="Home"
        onChangeSidebarHandler={onChangeSidebarHandler}
      />
      <SidebarOption
        Icon={QuestionAnswerIcon}
        text="Get My Tweets"
        onChangeSidebarHandler={onChangeSidebarHandler}
      />
      <SidebarOption
        Icon={PersonSearchIcon}
        text="Get All Users"
        onChangeSidebarHandler={onChangeSidebarHandler}
      />

      <Button
        variant="outlined"
        className="sidebar__tweet"
        onClick={backHandler}
      >
        Logout
      </Button>
    </div>
  );
}

export default Sidebar;
