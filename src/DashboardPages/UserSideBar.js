import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import withStyles from "@material-ui/core/styles/withStyles";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import CalendarIcon from "@material-ui/icons/DateRangeOutlined";
// import LocationIcon from "@material-ui/icons/Room";
// import UsersIcon from "@material-ui/icons/People";
import MyEventsIcon from "@material-ui/icons/EventSeat";
import BrowseEventsIcon from "@material-ui/icons/EventAvailableRounded";

// const drawerWidth = 240;

const drawerWidth = 215;

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawerContainer: {
    overflow: "auto"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  icon: {
    color: "black"
  },
  label: {
    color: "black",
    fontWeight: "bold"
  }
}));

const StyledListItem = withStyles({
  root: {
    backgroundColor: "default",
    "&.Mui-selected": {
      backgroundColor: "rgba(255, 193, 5, .9)"
    },
    "&.Mui-selected:hover": {
      backgroundColor: "rgba(255, 193, 5, 1)"
    }
  }
})(ListItem);

// Browse Events
// My Events
// Calendar

export default function UserSideBar({ handlePageChange, currentPage }) {
  const classes = useStyles();

  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper
      }}
    >
      <Toolbar />
      <div className={classes.drawerContainer}>
        <List>
          <StyledListItem
            selected={currentPage === 0}
            button
            onClick={() => handlePageChange(0)}
          >
            <ListItemIcon>
              <BrowseEventsIcon
                className={currentPage === 0 ? classes.icon : null}
              />
            </ListItemIcon>
            <ListItemText className={classes.label} primary={"Browse Events"} />
          </StyledListItem>
          <StyledListItem
            selected={currentPage === 1}
            button
            onClick={() => handlePageChange(1)}
          >
            <ListItemIcon>
              <MyEventsIcon
                className={currentPage === 1 ? classes.icon : null}
              />
            </ListItemIcon>
            <ListItemText primary={"My Events"} />
          </StyledListItem>
          <StyledListItem
            selected={currentPage === 2}
            button
            onClick={() => handlePageChange(2)}
          >
            <ListItemIcon>
              <CalendarIcon
                className={currentPage === 2 ? classes.icon : null}
              />
            </ListItemIcon>
            <ListItemText primary={"Calendar"} />
          </StyledListItem>
        </List>
        <Divider />
        <List></List>
      </div>
    </Drawer>
  );
}
