import React, { useState } from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
// import EventRequestsTable from "./EventRequestsTable";
import AllEventsTable from "../AllEventsTable";
import Toolbar from "@material-ui/core/Toolbar";

const useStyles = makeStyles((theme) => ({
  paper: {
    width: "80%",
    // display: "flex",
    // // justifyContent: "center",
    marginTop: theme.spacing(5),
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3)
  }
}));

export default function SuperAdminEventsPage() {
  const classes = useStyles();

  return (
    <div className={classes.paper}>
      <Toolbar />
      <Toolbar />
      <AllEventsTable />
    </div>
  );
}
