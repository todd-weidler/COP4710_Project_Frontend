import React, { useState } from "react";
import { useHistory, useParams, Redirect } from "react-router-dom";
import UserBrowseEventsPage from "./UserPages/UserBrowseEventsPage";
import UserMyEventsPage from "./UserPages/UserMyEventsPage";
import UserCalendarPage from "./UserPages/UserCalendarPage";
// import UserProfilePage from "./UserPages/UserProfilePage";
import SideBar from "./UserSideBar";
import { CssBaseline } from "@material-ui/core";
// import UserTabs from "./UserTabs";
import Header from "./Header";

function showCurrentTab(tabIndex, subpage) {
  if (!!subpage && tabIndex !== 1) {
    return <Redirect to="/404" />;
  }

  switch (tabIndex) {
    case 0:
      return <UserBrowseEventsPage />;
    case 1:
      return <UserMyEventsPage subpage={subpage} />;
    case 2:
      return <UserCalendarPage />;
    // case 3:
    //   return <UserProfilePage />;
    default:
      return <Redirect to="/404" />;
  }
}

export default function UserDashboard() {
  const { page, subpage } = useParams();
  const history = useHistory();

  const tabNames = ["browse", "myevents", "calendar"];

  const [currentPage, setCurrentPage] = useState(tabNames.indexOf(page));

  const handlePageChange = (newPage) => {
    history.push(`/user/${tabNames[newPage]}`);
    setCurrentPage(newPage);
    console.log(newPage);
  };

  return (
    <>
      {/* <Header
        tabs={
          <UserTabs currentTab={currentTab} handleTabChange={handleTabChange} />
        }
      /> */}
      <div style={{ display: "flex" }}>
        <CssBaseline />
        <Header />
        <SideBar
          handlePageChange={handlePageChange}
          currentPage={currentPage}
        />
        {showCurrentTab(currentPage, subpage)}
      </div>
    </>
  );
}
