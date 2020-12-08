import React from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import makeStyles from "@material-ui/core/styles/makeStyles";
import EventIcon from "@material-ui/icons/EventAvailableRounded";
import CalendarIcon from "@material-ui/icons/DateRangeOutlined";
import LocationIcon from "@material-ui/icons/Room";
import UsersIcon from "@material-ui/icons/People";

const useStyles = makeStyles((theme) => ({
  tabs: {
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(4)
  }
}));

export default function SuperAdminTabs({ handleTabChange, currentTab }) {
  const classes = useStyles();

  return (
    <Tabs
      value={currentTab}
      onChange={handleTabChange}
      className={classes.tabs}
    >
      <Tab label="Events" icon={<EventIcon fontSize={"small"} />} />
      <Tab label="Locations" icon={<LocationIcon fontSize={"small"} />} />
      <Tab label="Users" icon={<UsersIcon fontSize={"small"} />} />
      <Tab label="Calendar" icon={<CalendarIcon fontSize={"small"} />} />
    </Tabs>
  );
}
