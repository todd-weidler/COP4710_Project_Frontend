import React, { useState, useEffect } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import useStyles from "./styles/monthlyCalendarStyles";
import { partition, getDayOfWeek, getDaysInTheMonth } from "./utilityFunctions";
import monthNames from "../models/monthNames";
import daysInWeekLabels from "../models/daysInWeekLabels";

// for testing purposes
import dummyData from "./testingStuff/dummyEvents";

//
function getDummyData(startDate, endDate) {
  const eventsInInterval = dummyData.filter((data) => {
    return data.eventDate >= startDate && data.eventDate <= endDate;
  });
  return eventsInInterval;
}

function getDaysToShow(month, year) {
  const numDaysThisMonth = getDaysInTheMonth(month, year);
  const firstDayOfMonth = getDayOfWeek(month, year, 1);
  const lastDayOfMonth = getDayOfWeek(month, year, numDaysThisMonth);
  const numDaysToShowFromLastMonth = firstDayOfMonth;
  const numDaysToShowFromNextMonth = 6 - lastDayOfMonth;

  let startDate = null;
  let endDate = null;

  // if we are showing days from last month, then the startDate must be from last month
  if (numDaysToShowFromLastMonth > 0) {
    let startYear = year;
    let startMonth = month === 1 ? 12 : month - 1;

    // if the startMonth is Decemeber, that means the startYear is from last year
    if (month === 12) {
      startYear--;
    }

    let startDay =
      getDaysInTheMonth(startMonth, startYear) - numDaysToShowFromLastMonth + 1;

    // - 1 because the month is zero indexed in Date()
    startDate = new Date(startYear, startMonth - 1, startDay);
  } else {
    startDate = new Date(year, month - 1, 1);
  }

  // if we are showing days from next month, then the endDate must be from next month
  if (numDaysToShowFromNextMonth > 0) {
    let endYear = year;
    let endMonth = month === 12 ? 1 : month + 1;

    // if the endMonth is January, that means the endYear is from next year
    if (endMonth === 1) {
      endYear++;
    }

    let endDay = numDaysToShowFromNextMonth;

    // - 1 because the month is zero indexed in Date()
    endDate = new Date(endYear, endMonth - 1, endDay);
  } else {
    endDate = new Date(year, month - 1, numDaysThisMonth);
  }

  let finalData = [];
  let curDate = startDate;
  let eventsToShow = getDummyData(startDate, endDate);

  while (curDate <= endDate) {
    let [eventsOnCurrDate, leftovers] = partition(
      eventsToShow,
      (e) => e.eventDate.getTime() === curDate.getTime()
    );

    eventsToShow = leftovers;

    finalData.push({
      date: new Date(
        curDate.getFullYear(),
        curDate.getMonth(),
        curDate.getDate()
      ),
      events: eventsOnCurrDate.map((a) => a.eventName)
    });
    curDate.setDate(curDate.getDate() + 1);
  }

  // api call to get events this month

  let curMonthDays = [];
  for (let i = 1; i <= numDaysThisMonth; i++) {
    curMonthDays.push(i);
  }

  return finalData;
}

function getWeekIndArr(numDays) {
  const weekIndArr = [];

  for (let i = 0; i < numDays / 7; i++) {
    weekIndArr.push(i);
  }
  return weekIndArr;
}

export default function MonthlyCalendar({ month, year }) {
  const classes = useStyles();
  const [daysToShow, setDaysToShow] = useState([]);

  useEffect(() => {
    setDaysToShow(getDaysToShow(month, year));
  }, [month, year]);

  const handleClick = () => {};

  return (
    <div className={classes.root}>
      <Typography variant="h5">{`${monthNames[month - 1]} ${year}`}</Typography>
      <TableContainer className={classes.tableContainer} component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow className={classes.headerRow}>
              {daysInWeekLabels.map((day) => (
                <TableCell key={day} className={classes.header} align="center">
                  {day}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {getWeekIndArr(daysToShow.length).map((i) => (
              <TableRow key={i} className={classes.weekRow}>
                {daysToShow.slice(i * 7, (i + 1) * 7).map((day) => (
                  <TableCell
                    className={classes.cells}
                    key={day.date.toDateString()}
                    align="center"
                  >
                    <div className={classes.cellContent}>
                      <div className={classes.dayHeading}>
                        <Typography variant="subtitle1">
                          {day.date.getDate()}
                        </Typography>
                      </div>

                      <div className={classes.monthlyDayCell}>
                        {day.events.map((ev) => (
                          <Chip
                            className={classes.eventChip}
                            size="small"
                            label={ev}
                            key={ev}
                            onClick={handleClick}
                          />
                        ))}
                      </div>
                    </div>
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
