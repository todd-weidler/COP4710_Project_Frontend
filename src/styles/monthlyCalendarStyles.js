import makeStyles from "@material-ui/core/styles/makeStyles";

export const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    margin: "0px"
  },
  tableContainer: {
    width: "80%",
    margin: "auto",
    padding: "0px"
  },
  table: {
    width: "99%",
    tableLayout: "fixed",
    margin: "auto",
    borderCollapse: "collapse",
    borderStyle: "hidden"
  },
  header: {
    margin: "0px",
    paddingLeft: "0px",
    paddingRight: "0px"
  },
  cells: {
    border: "1px solid #c7cdd1",
    borderCollapse: "collapse",
    padding: "0px",
    margin: "0px",
    verticalAlign: "top"
  },
  monthlyDayCell: {
    width: "100%",
    margin: "0px",
    padding: "0px"
  },
  eventChip: {
    margin: theme.spacing(0.5),
    width: "95%"
  },
  dayHeading: {
    float: "right",
    margin: "8px",
    padding: "0px"
  },
  weekRow: {
    margin: "0px",
    padding: "0px",
    height: "140px"
  },
  cellContent: {
    margin: "0px",
    padding: "0px"
  },
  headerRow: {
    width: "100%",
    margin: "0px"
  }
}));
