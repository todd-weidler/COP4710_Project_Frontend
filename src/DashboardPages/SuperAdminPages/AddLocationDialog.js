import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import MyTextField from "../../MyTextField";

const useStyles = makeStyles((theme) => ({
  textfield: {
    marginTop: theme.spacing(0),
    marginBottom: theme.spacing(0),
    paddingTop: theme.spacing(0),
    paddingBottom: theme.spacing(0)
  }
}));

// className={classes.textfield}

export default function AddLocationDialog({
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

  return (
    <Dialog open={isOpen} onClose={handleClose} disableBackdropClick>
      <DialogTitle id="add-location-title">Add New Location</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <MyTextField
              className={classes.textfield}
              margin="dense"
              id="locationName"
              label="Location Name"
              type="text"
              name="locationName"
              hasError={touched.locationName && !!errors.locationName}
              errorMsg={errors.locationName}
              value={values.locationName}
              onBlur={handleBlur}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <MyTextField
              className={classes.textfield}
              margin="dense"
              id="street"
              label="Street"
              type="text"
              name="street"
              hasError={touched.street && !!errors.street}
              errorMsg={errors.street}
              value={values.street}
              onBlur={handleBlur}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <MyTextField
              className={classes.textfield}
              margin="dense"
              id="city"
              label="City"
              type="text"
              name="city"
              hasError={touched.city && !!errors.city}
              errorMsg={errors.city}
              value={values.city}
              onBlur={handleBlur}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <MyTextField
              className={classes.textfield}
              margin="dense"
              id="state-province"
              label="State/Province"
              type="text"
              name="state"
              hasError={touched.state && !!errors.state}
              errorMsg={errors.state}
              value={values.state}
              onBlur={handleBlur}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <MyTextField
              className={classes.textfield}
              margin="dense"
              id="zip-postal"
              label="Zip/Postal Code"
              type="text"
              name="zipcode"
              hasError={touched.zipcode && !!errors.zipcode}
              errorMsg={errors.zipcode}
              value={values.zipcode}
              onBlur={handleBlur}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <MyTextField
              className={classes.textfield}
              margin="dense"
              id="country"
              label="Country"
              type="text"
              name="country"
              hasError={touched.country && !!errors.country}
              errorMsg={errors.country}
              value={values.country}
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
