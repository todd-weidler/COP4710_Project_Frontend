import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import BrowseEventsTable from "./BrowseEventsTable";
import Toolbar from "@material-ui/core/Toolbar";
import CreateEventForm from "./CreateEventForm";

const useStyles = makeStyles((theme) => ({
  paper: {
    width: "80%",
    marginTop: theme.spacing(5),
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3)
  }
}));

export default function UserBrowseEventsPage() {
  const classes = useStyles();

  return (
    <div className={classes.paper}>
      {/* <Toolbar /> */}
      {/* <Toolbar /> */}
      <CreateEventForm />
      <BrowseEventsTable />
    </div>
  );
}
