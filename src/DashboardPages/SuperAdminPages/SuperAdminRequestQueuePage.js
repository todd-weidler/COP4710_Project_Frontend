import React, { useState } from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import EventRequestsTable from "./EventRequestsTable";
import Toolbar from "@material-ui/core/Toolbar";

const useStyles = makeStyles((theme) => ({
  paper: {
    width: "90%",
    marginTop: theme.spacing(5),
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2)
  }
}));

export default function SuperAdminRequestQueuePage() {
  const classes = useStyles();

  return (
    <div className={classes.paper}>
      <Toolbar />
      <EventRequestsTable />
    </div>
  );
}
