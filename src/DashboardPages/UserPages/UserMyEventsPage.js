import React, { useState, useEffect } from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Toolbar from "@material-ui/core/Toolbar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { useHistory, Redirect } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  tabs: {
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(4)
  },
  cont: {
    marginTop: theme.spacing(10)
  }
}));

function showMyEventsTab(tabName) {
  switch (tabName) {
    case 0:
      return <div>Here</div>;
    case 1:
      return <div>Here 2</div>;
    default:
      return <Redirect to="/404" />;
  }
}

const tabNames = ["joined", "hosted"];

export default function UserMyEventsPage({ subpage }) {
  const classes = useStyles();
  const history = useHistory();

  const [currentTab, setCurrentTab] = useState(0);

  useEffect(() => {
    let ind = tabNames.indexOf(subpage);

    if (ind === -1) {
      ind = 0;
    }

    setCurrentTab(ind);
  }, [subpage]);

  const handleTabChange = (event, newTab) => {
    console.log(newTab);
    console.log(tabNames[newTab]);
    history.push(`/user/myevents/${tabNames[newTab]}`);
    setCurrentTab(newTab);
  };

  return (
    <>
      <Toolbar />
      <Toolbar />
      <div className={classes.cont}>
        <Toolbar>
          <Tabs
            value={currentTab}
            onChange={handleTabChange}
            className={classes.tabs}
          >
            <Tab label="Joined Events" />
            <Tab label="Hosted Events" />
          </Tabs>
        </Toolbar>
        {showMyEventsTab(currentTab)}
      </div>
    </>
  );
}
