import React from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import makeStyles from "@material-ui/core/styles/makeStyles";
import EventIcon from "@material-ui/icons/EventAvailableRounded";
import CalendarIcon from "@material-ui/icons/DateRangeOutlined";
import ProfileIcon from "@material-ui/icons/AccountBox";

const useStyles = makeStyles((theme) => ({
  tabs: {
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(4)
  }
}));

export default function UserTabs({ handleTabChange, currentTab }) {
  const classes = useStyles();

  return (
    <Tabs
      value={currentTab}
      onChange={handleTabChange}
      className={classes.tabs}
    >
      <Tab label="Events" icon={<EventIcon fontSize={"small"} />} />
      <Tab label="Calendar" icon={<CalendarIcon fontSize={"small"} />} />
      <Tab label="Profile" icon={<ProfileIcon fontSize={"small"} />} />
    </Tabs>
  );
}
