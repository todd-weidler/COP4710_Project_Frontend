import React, { useState } from "react";
import LoginPage from "./LoginPage";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import SuperAdminDashboard from "./DashboardPages/SuperAdminDashboard";
import UserDashboard from "./DashboardPages/UserDashboard";

import "./styles.css";
import { CssBaseline } from "@material-ui/core";

export default function App() {
  // const [isNewUser, setNewUser] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [userInfo, setUserInfo] = useState({
    username: "",
    firstname: "",
    lastname: "",
    isSuperAdmin: false
  });

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <>
      <CssBaseline />
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route exact path="/">
              {isLoggedIn ? (
                userInfo.isSuperAdmin ? (
                  <Redirect to="/superadmin/events" />
                ) : (
                  <Redirect to="/user/browse" />
                )
              ) : (
                <LoginPage />
              )}
            </Route>

            <Redirect exact from="/superadmin" to="/superadmin/events" />
            <Redirect exact from="/user" to="/user/browse" />

            {/* <Route exact path="/dashboard/:page?">
            {isLoggedIn ? (
              <DashboardPage isSuperAdmin={userInfo.isSuperAdmin} />
            ) : (
              <Redirect to="/" />
            )}
          </Route> */}

            <Route exact path="/user/:page?/:subpage?">
              {isLoggedIn ? (
                !userInfo.isSuperAdmin ? (
                  <UserDashboard />
                ) : (
                  <Redirect to="/404" />
                )
              ) : (
                <Redirect to="/" />
              )}
            </Route>

            <Route exact path="/superadmin/:page?/:subpage?">
              {isLoggedIn ? (
                userInfo.isSuperAdmin ? (
                  <SuperAdminDashboard />
                ) : (
                  <Redirect to="/404" />
                )
              ) : (
                <Redirect to="/" />
              )}
            </Route>

            <Route path="/">
              <div>404: Page not found</div>
            </Route>
          </Switch>
        </BrowserRouter>
      </div>
    </>
  );
}
