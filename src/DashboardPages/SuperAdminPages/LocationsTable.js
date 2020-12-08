import React, { useState, useEffect } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { makeStyles } from "@material-ui/core/styles";
import useTableSearch from "../../useTableSearch";
import Toolbar from "@material-ui/core/Toolbar";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "100%"
  },
  container: {
    height: 450,
    overflowY: "auto"
  },
  headerCell: {
    paddingLeft: "16px",
    paddingRight: "16px",
    fontWeight: "bold"
  },
  cell: {
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
    flex: "0 1 40%"
  }
}));

const filterByAny = (currentSearch) => (el) => {
  let lowerCaseSearchText = currentSearch.toLowerCase();

  return (
    el.locationName.toLowerCase().includes(lowerCaseSearchText) ||
    el.address.street.toLowerCase().includes(lowerCaseSearchText) ||
    el.address.city.toLowerCase().includes(lowerCaseSearchText) ||
    el.address.state.toLowerCase().includes(lowerCaseSearchText) ||
    el.address.zipcode.toLowerCase().includes(lowerCaseSearchText)
  );
};

// function formatAddress(address) {
//   return `${address.street}, ${address.city}, ${address.state} ${address.zipcode}`;
// }

function formatAddress(location) {
  return `${location.street}, ${location.city}, ${location.state} ${location.zipcode}`;
}

export default function LocationsTable({ locationsData }) {
  const classes = useStyles();

  const [emptyRows, setEmptyRows] = useState(0);

  const [
    filteredRows,
    searchText,
    handleSearchTextChange,
    handleOnEnter
  ] = useTableSearch(locationsData, filterByAny, "locationsSearchBar");

  useEffect(() => {
    if (filteredRows.length <= 10) {
      setEmptyRows(10 - filteredRows.length);
    } else {
      setEmptyRows(0);
    }
  }, [filteredRows]);

  return (
    <>
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
                  style={{ minWidth: 300 }}
                  className={classes.headerCell}
                >
                  Location Name
                </TableCell>
                <TableCell
                  style={{ minWidth: 400 }}
                  className={classes.headerCell}
                >
                  Address
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRows.map((location) => (
                <TableRow key={location.locationId}>
                  <TableCell>{location.locationName}</TableCell>
                  <TableCell>{formatAddress(location)}</TableCell>
                </TableRow>
              ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 45 * emptyRows }}>
                  <TableCell align="center" colSpan={8}>
                    {emptyRows === 10 ? "No locations found" : ""}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}
