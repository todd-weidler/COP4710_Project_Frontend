import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import MyTextField from "../../MyTextField";
import { Field, useField, useFormikContext } from "formik";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
  DatePicker
} from "@material-ui/pickers";

const useStyles = makeStyles((theme) => ({
  textfield: {
    marginTop: theme.spacing(0),
    marginBottom: theme.spacing(0),
    paddingTop: theme.spacing(0),
    paddingBottom: theme.spacing(0)
  }
}));

// Event Name, Location, date, start time, end time, url,

export default function CreateEventDialog({
  isOpen,
  handleClose,
  ...formikProps
}) {
  const {
    values,
    touched,
    errors,
    dirty,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    handleReset
  } = formikProps;

  const classes = useStyles();

  const [selectedDate, setSelectedDate] = React.useState(
    new Date("2014-08-18T21:11:54")
  );

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const getMinEndTime = () => {
    let endHour = values.startTime.getHours();
    let endMinute = values.startTime.getMinutes();

    if (endMinute === 59) {
      endMinute = 0;
      endHour++;
    }

    return new Date(0, 0, 0, endHour, endMinute);
  };

  return (
    <Dialog open={isOpen} onClose={handleClose} disableBackdropClick>
      <DialogTitle id="add-event-title">Create New Event</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <MyTextField
              className={classes.textfield}
              margin="dense"
              id="eventName"
              label="Event Name"
              type="text"
              name="eventName"
              hasError={touched.eventName && !!errors.eventName}
              errorMsg={errors.eventName}
              value={values.eventName}
              onBlur={handleBlur}
              onChange={handleChange}
            />
          </Grid>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justify="space-around">
              <Grid item xs={6}>
                {/* <KeyboardDatePicker
                  margin="normal"
                  id="event-date"
                  label="Date"
                  format="MM/dd/yyyy"
                  minDate={new Date()}
                  value={selectedDate}
                  onChange={handleDateChange}
                /> */}
                <MyDatePicker />
                {/* <Field
                  name="date"
                  component={DateField}
                  minDate={new Date()}
                  errors={errors}
                  touched={touched}
                /> */}
              </Grid>
              <Grid item xs={3}>
                {/* <KeyboardDatePicker
                  margin="normal"
                  id="start-time"
                  label="Start Time"
                  value={selectedDate}
                  onChange={handleDateChange}
                /> */}
                <Field
                  {...formikProps}
                  name="startTime"
                  component={TimeField}
                  maxTime={new Date(0, 0, 0, 23, 44)}
                />
              </Grid>
              <Grid item xs={3}>
                {/* <KeyboardTimePicker
                  margin="normal"
                  id="end-time"
                  label="End Time"
                  value={selectedDate}
                  onChange={handleDateChange}
                /> */}
                <Field
                  {...errors}
                  {...touched}
                  name="endTime"
                  component={TimeField}
                  minTime={getMinEndTime}
                  maxTime={new Date(0, 0, 0, 23, 59)}
                />
              </Grid>
            </Grid>
          </MuiPickersUtilsProvider>

          <Grid item xs={12}>
            <MyTextField
              className={classes.textfield}
              margin="dense"
              id="url"
              label="Event Website"
              type="text"
              name="url"
              hasError={touched.url && !!errors.url}
              errorMsg={errors.url}
              value={values.url}
              onBlur={handleBlur}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleClose(handleReset)} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}

const DateField = ({ field, form, errors, touched, ...other }) => {
  const currentError = form.errors[field.name];

  // const errors = other.errors;
  // const touched = other.touched;
  // !!errors.date &&
  // console.log(field.name);
  // console.log(form.errors[field.name]);

  return (
    <KeyboardDatePicker
      clearable
      disablePast
      name={field.name}
      value={field.value}
      format="dd/MM/yyyy"
      helperText={currentError}
      error={Boolean(currentError)}
      onError={(error) => {
        if (error !== currentError) {
          form.setFieldTouched(field.name, true);
          form.setFieldError(field.name, error);
        }
      }}
      onChange={(date) => {
        form.setFieldValue(field.name, date, true);
      }}
      {...other}
    />
  );
};

//
const MyDatePicker = (props) => {
  const { setFieldTouched, setFieldValue, setFieldError } = useFormikContext();
  const [field, meta] = useField(props);
  // const errors = other.errors;
  // const touched = other.touched;
  // !!errors.date &&
  // console.log(field.name);
  // console.log(form.errors[field.name]);

  console.log(meta.error);
  return (
    <KeyboardDatePicker
      clearable
      disablePast
      name={field.name}
      value={field.value}
      format="dd/MM/yyyy"
      // helperText={meta.error}
      error={meta.touched && !!meta.error}
      onError={(error) => {
        if (error !== meta.error) {
          setFieldTouched(field.name, true);
          setFieldError(field.name, error);
        }
      }}
      onChange={(date) => {
        setFieldValue(field.name, date, true);
      }}
    />
  );
};

const TimeField = ({ field, form, ...other }) => {
  const currentError = form.errors[field.name];

  return (
    <KeyboardTimePicker
      // clearable
      disablePast
      name={field.name}
      value={field.value}
      helperText={currentError}
      error={Boolean(currentError)}
      onError={(error) => {
        if (error !== currentError) {
          form.setFieldError(field.name, error);
        }
      }}
      onChange={(date) => form.setFieldValue(field.name, date, true)}
      {...other}
    />
  );
};
