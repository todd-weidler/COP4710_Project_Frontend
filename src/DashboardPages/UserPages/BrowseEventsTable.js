import React, { useState, useEffect } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { makeStyles } from "@material-ui/core/styles";
import { fade } from "@material-ui/core/styles/colorManipulator";
import Button from "@material-ui/core/Button";
import useTableSearch from "../../useTableSearch";
import Toolbar from "@material-ui/core/Toolbar";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";

import DeleteEventIcon from "@material-ui/icons/DeleteForever";
import JoinEventIcon from "@material-ui/icons/Add";
import LeaveEventIcon from "@material-ui/icons/Clear";

// const myEvents = [
//   { "Theatre Play": "participant" },
//   { "Theatre Play 1": "host" },
//   { "Theatre Play 2": "participant" },
//   { "Theatre Play 3": "participant" }
// ];

// function alpha(color, value){

// }

const dummyJoinedEvents = [
  "Theatre Play 2",
  "Theatre Play 5",
  "Theatre Play 7",
  "Homeless Event"
];

const dummyHostedEvents = ["Theatre Play 3", "Football Game"];

// let myEvents = new Map();
// myEvents.set("Theatre Play 1", "participant");
// myEvents.set("Theatre Play 2", "participant");
// myEvents.set("Theatre Play 3", "admin");
// myEvents.set("Theatre Play 4", "participant");
// myEvents.set("Theatre Play 5", "admin");

const dummyData = [
  {
    eventName: "Theatre Play",
    location: "UCF Theatre",
    adminUsername: "admin123",
    website: "theatre.ucf.edu",
    date: new Date(2020, 11, 15),
    startTime: 1200,
    endTime: 1500
  },
  {
    eventName: "Football Game",
    location: "UCF Stadium",
    adminUsername: "host123",
    website: "knightsfootball.ucf.edu",
    date: new Date(2020, 11, 21),
    startTime: 1500,
    endTime: 1900
  },
  {
    eventName: "Homeless Event",
    location: "Salvation Army",
    adminUsername: "sal123",
    website: "salvationarmy.org",
    date: new Date(2020, 11, 2),
    startTime: 800,
    endTime: 1100
  },
  {
    eventName: "Theatre Play 2",
    location: "UCF Theatre",
    adminUsername: "admin123",
    website: "theatre.ucf.edu",
    date: new Date(2020, 11, 15),
    startTime: 1200,
    endTime: 1500
  },
  {
    eventName: "Theatre Play 3",
    location: "UCF Theatre",
    adminUsername: "admin123",
    website: "theatre.ucf.edu",
    date: new Date(2020, 11, 15),
    startTime: 1200,
    endTime: 1500
  },
  {
    eventName: "Theatre Play 4",
    location: "UCF Theatre",
    adminUsername: "admin123",
    website: "theatre.ucf.edu",
    date: new Date(2020, 11, 15),
    startTime: 1200,
    endTime: 1500
  },
  {
    eventName: "Theatre Play 5",
    location: "UCF Theatre",
    adminUsername: "admin123",
    website: "theatre.ucf.edu",
    date: new Date(2020, 11, 15),
    startTime: 1200,
    endTime: 1500
  },
  {
    eventName: "Theatre Play 6",
    location: "UCF Theatre",
    adminUsername: "admin123",
    website: "theatre.ucf.edu",
    date: new Date(2020, 11, 15),
    startTime: 1200,
    endTime: 1500
  },
  {
    eventName: "Theatre Play 7",
    location: "UCF Theatre",
    adminUsername: "admin123",
    website: "theatre.ucf.edu",
    date: new Date(2020, 11, 15),
    startTime: 1200,
    endTime: 1500
  },
  {
    eventName: "Theatre Play 8",
    location: "UCF Theatre",
    adminUsername: "admin123",
    website: "theatre.ucf.edu",
    date: new Date(2020, 11, 15),
    startTime: 1200,
    endTime: 1500
  },
  {
    eventName: "Theatre Play 9",
    location: "UCF Theatre",
    adminUsername: "admin123",
    website: "theatre.ucf.edu",
    date: new Date(2020, 11, 15),
    startTime: 1200,
    endTime: 1500
  },
  {
    eventName: "Theatre Play 10",
    location: "UCF Theatre",
    adminUsername: "admin123",
    website: "theatre.ucf.edu",
    date: new Date(2020, 11, 15),
    startTime: 1200,
    endTime: 1500
  },
  {
    eventName: "Theatre Play 11",
    location: "UCF Theatre",
    adminUsername: "admin123",
    website: "theatre.ucf.edu",
    date: new Date(2020, 11, 15),
    startTime: 1200,
    endTime: 1500
  }
];

function getFormattedDate(date) {
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
}

function getFormattedTime(time) {
  let hr = (time / 100) % 12;
  let min = time % 100;

  if (hr === 0) {
    hr = 12;
  }

  let str = `${hr}:${min}`;

  if (min < 10) {
    str += "0";
  }

  if (time >= 1200) {
    str += "pm";
  } else {
    str += "am";
  }

  return str;
}

const color = 4;

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "100%",
    // display: "flex",
    // // justifyContent: "center"
    padding: color
  },
  container: {
    height: 450,
    overflowY: "auto"
  },
  joinButton: {
    // color: "blue",
    textTransform: "none",
    margin: theme.spacing(0),
    minWidth: "70px"
  },
  leaveButton: {
    // color: "red",
    textTransform: "none",
    margin: theme.spacing(0),
    minWidth: "70px"
  },
  deleteButton: {
    color: "white",
    backgroundColor: "#f44336",
    textTransform: "none",
    margin: theme.spacing(0),
    minWidth: "70px",
    "&:hover": {
      backgroundColor: "#d32f2f"
    }
  },
  headerCell: {
    // margin: theme.spacing(0),
    // padding: theme.spacing(0),
    // paddingLeft: theme.spacing(1.5),
    paddingLeft: "16px",
    paddingRight: "16px",
    fontWeight: "bold"
  },
  cell: {
    // margin: theme.spacing(0),
    paddingLeft: "16px",
    paddingRight: "16px"
  },
  toolbar: {
    dispay: "flex",
    justifyContent: "flex-end",
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    marginBottom: theme.spacing(1)
  },
  searchBar: {
    // flexGrow: 1

    flex: "0 1 40%"
  }
}));

const filterByAny = (currentSearch) => (el) => {
  let lowerCaseSearchText = currentSearch.toLowerCase();

  return (
    el.eventName.toLowerCase().includes(lowerCaseSearchText) ||
    el.location.toLowerCase().includes(lowerCaseSearchText) ||
    el.adminUsername.toLowerCase().includes(lowerCaseSearchText) ||
    el.website.toLowerCase().includes(lowerCaseSearchText)
  );
};

export default function EventRequestsTable() {
  const classes = useStyles();
  const [events, setEvents] = useState([]);

  const [joinedEvents, setJoinedEvents] = useState([]);
  const [hostedEvents, setHostedEvents] = useState([]);

  const [emptyRows, setEmptyRows] = useState(0);

  const [
    filteredRows,
    searchText,
    handleSearchTextChange,
    handleOnEnter
  ] = useTableSearch(events, filterByAny, "searchBar");

  useEffect(() => {
    if (filteredRows.length <= 10) {
      setEmptyRows(10 - filteredRows.length);
    } else {
      setEmptyRows(0);
    }
  }, [filteredRows]);

  useEffect(() => {
    // api calls
    setEvents(dummyData);
    setJoinedEvents(dummyJoinedEvents);
    setHostedEvents(dummyHostedEvents);
  }, []);

  const handleJoin = (name) => {
    // api calls

    setJoinedEvents((current) => [name, ...current]);
  };

  const handleLeave = (name) => {
    console.log(events);

    let updatedJoinedEvents = [];

    let indexInJoined = joinedEvents.findIndex((ev) => ev === name);

    console.log(indexInJoined);

    if (indexInJoined !== -1) {
      // api calls

      if (indexInJoined === 0) {
        updatedJoinedEvents = updatedJoinedEvents.concat(joinedEvents.slice(1));
      } else {
        updatedJoinedEvents = updatedJoinedEvents.concat(
          joinedEvents.slice(0, indexInJoined),
          joinedEvents.slice(indexInJoined + 1)
        );
      }

      setJoinedEvents(updatedJoinedEvents);
    } else {
      console.log("ERROR: Event not found in joinedEvents array ");
    }
  };

  const handleDeleteEvent = (name) => {
    let updatedList = [];
    let eventIndex = events.findIndex((ev) => ev.eventName === name);

    if (eventIndex !== -1) {
      // api calls

      if (eventIndex === 0) {
        updatedList = updatedList.concat(events.slice(1));
      } else {
        updatedList = updatedList.concat(
          events.slice(0, eventIndex),
          events.slice(eventIndex + 1)
        );
      }

      setEvents(updatedList);
    } else {
      console.log("ERROR: Event not found");
    }
  };

  const getUserRole = (eventName) => {
    if (joinedEvents.includes(eventName)) {
      return "Participant";
    }

    if (hostedEvents.includes(eventName)) {
      return "Admin";
    }
    return "N/A";
  };

  return (
    <div className={classes.root}>
      <Toolbar className={classes.toolbar}>
        <TextField
          id="searchBar"
          onKeyPress={handleOnEnter}
          className={classes.searchBar}
          size="small"
          variant="outlined"
          placeholder="Search..."
          value={searchText}
          onChange={handleSearchTextChange}
        />
      </Toolbar>
      <TableContainer
        component={Paper}
        id={"tableContainer"}
        className={classes.container}
      >
        <Table id={"eventsTable"} size="small" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell
                style={{ minWidth: 150 }}
                className={classes.headerCell}
              >
                Event Name
              </TableCell>
              <TableCell
                style={{ minWidth: 150 }}
                className={classes.headerCell}
              >
                Location
              </TableCell>
              <TableCell
                style={{ minWidth: 150 }}
                className={classes.headerCell}
              >
                Admin Username
              </TableCell>
              <TableCell
                style={{ minWidth: 160 }}
                className={classes.headerCell}
              >
                Event Website
              </TableCell>
              <TableCell
                style={{ minWidth: 102 }}
                className={classes.headerCell}
              >
                Date
              </TableCell>
              <TableCell
                style={{ minWidth: 108 }}
                align={"center"}
                className={classes.headerCell}
              >
                Start Time
              </TableCell>
              <TableCell
                style={{ minWidth: 102 }}
                align={"center"}
                className={classes.headerCell}
              >
                End Time
              </TableCell>
              <TableCell
                style={{ minWidth: 185 }}
                align={"center"}
                className={classes.headerCell}
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows.map((event) => {
              const role = getUserRole(event.eventName);

              return (
                <TableRow key={event.eventName} style={{ height: 50 }}>
                  <TableCell className={classes.cell}>
                    {event.eventName}
                  </TableCell>
                  <TableCell className={classes.cell}>
                    {event.location}
                  </TableCell>
                  <TableCell className={classes.cell}>
                    {event.adminUsername}
                  </TableCell>
                  <TableCell className={classes.cell}>
                    {event.website}
                  </TableCell>
                  <TableCell className={classes.cell}>
                    {getFormattedDate(event.date)}
                  </TableCell>
                  <TableCell align={"center"} className={classes.cell}>
                    {getFormattedTime(event.startTime)}
                  </TableCell>
                  <TableCell align={"center"} className={classes.cell}>
                    {getFormattedTime(event.endTime)}
                  </TableCell>
                  <TableCell
                    align="center"
                    className={classes.actionsButtonsCell}
                  >
                    <div>
                      {role === "Participant" ? (
                        <Button
                          onClick={() => handleLeave(event.eventName)}
                          size="small"
                          variant="outlined"
                          color="primary"
                          className={classes.leaveButton}
                        >
                          Leave
                        </Button>
                      ) : role === "Admin" ? (
                        <Button
                          onClick={() => handleDeleteEvent(event.eventName)}
                          size="small"
                          variant="contained"
                          className={classes.deleteButton}
                        >
                          Delete
                        </Button>
                      ) : (
                        <Button
                          onClick={() => handleJoin(event.eventName)}
                          size="small"
                          variant="contained"
                          color="primary"
                          className={classes.joinButton}
                        >
                          Join
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
            {emptyRows > 0 && (
              <TableRow style={{ height: 45 * emptyRows }}>
                <TableCell align="center" colSpan={8}>
                  {emptyRows === 10 ? "No events found" : ""}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
