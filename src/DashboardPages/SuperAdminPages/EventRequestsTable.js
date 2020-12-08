import React, { useState, useEffect } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { makeStyles } from "@material-ui/core/styles";
import ApproveIcon from "@material-ui/icons/Done";
import RejectIcon from "@material-ui/icons/Clear";
import Button from "@material-ui/core/Button";
import useTableSearch from "../../useTableSearch";
import Toolbar from "@material-ui/core/Toolbar";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";

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

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "100%"
    // display: "flex",
    // // justifyContent: "center"
  },
  container: {
    height: 450,
    overflowY: "auto"
  },
  approveButton: {
    color: "green",
    textTransform: "none",
    margin: theme.spacing(0)
  },
  rejectButton: {
    color: "red",
    textTransform: "none",
    margin: theme.spacing(0)
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
    // api call
    setEvents(dummyData);
  }, []);

  const handleReject = (e, name) => {
    console.log(name);

    let updatedList = [];
    // let eventIndex = events.indexOf(name);

    let eventIndex = events.findIndex((ev) => ev.eventName === name);

    console.log(eventIndex);

    if (eventIndex !== -1) {
      // do some api call to add the event to the list of rejected events for the particular admin
      // as well as another call to remove the event from the list of pending events for the superadmin

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

  const handleApprove = (name) => {
    console.log(name);

    let updatedList = [];
    // let eventIndex = events.indexOf(name);

    let eventIndex = events.findIndex((ev) => ev.eventName === name);

    console.log(eventIndex);

    if (eventIndex !== -1) {
      // do some api call to add the event to the list of rejected events for the particular admin
      // as well as another call to remove the event from the list of pending events for the superadmin

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

  // const [scrollPos, setScrollPos] = useState(0);

  // const saveCurrentScrollPosition = () => {
  //   let tb = document.getElementById("tableContainer");
  //   console.log(tb.scrollTop);
  //   setScrollPos(tb.scrollTop);
  // };

  // const goToSavedScrollPosition = () => {
  //   let tb = document.getElementById("tableContainer");
  //   tb.scrollTop = scrollPos;
  // };

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
                style={{ minWidth: 176 }}
                className={classes.headerCell}
              >
                Event Website
              </TableCell>
              <TableCell
                style={{ minWidth: 107 }}
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
            {filteredRows.map((event) => (
              <TableRow key={event.eventName}>
                <TableCell className={classes.cell}>
                  {event.eventName}
                </TableCell>
                <TableCell className={classes.cell}>{event.location}</TableCell>
                <TableCell className={classes.cell}>
                  {event.adminUsername}
                </TableCell>
                <TableCell className={classes.cell}>{event.website}</TableCell>
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
                    <Button
                      onClick={() => handleApprove(event.eventName)}
                      size="small"
                      className={classes.approveButton}
                      startIcon={<ApproveIcon className={classes.acceptIcon} />}
                    >
                      Approve
                    </Button>
                    <Button
                      onClick={(e) => handleReject(e, event.eventName)}
                      size="small"
                      className={classes.rejectButton}
                      startIcon={<RejectIcon />}
                    >
                      Reject
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
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
