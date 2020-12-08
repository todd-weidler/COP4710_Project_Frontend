import React, { useState, useEffect } from "react";
import LocationsTable from "./LocationsTable";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import { Formik, Form } from "formik";
import AddLocationDialog from "./AddLocationDialog";
import * as Yup from "yup";

const dummyLocationData = [
  {
    locationId: "loc1",
    locationName: "UCF Arena",
    street: "1000 Univerity Avenue",
    city: "Orlando",
    state: "Florida",
    zipcode: "32817"
  },
  {
    locationId: "loc2",
    locationName: "UCF Theatre",
    street: "1002 Univerity Avenue",
    city: "Orlando",
    state: "Florida",
    zipcode: "32817"
  },
  {
    locationId: "loc3",
    locationName: "UCF Convention Center",
    street: "1005 Univerity Avenue",
    city: "Orlando",
    state: "Florida",
    zipcode: "32817"
  },
  {
    locationId: "loc4",
    locationName: "UCF Bookstore",
    street: "1200 Univerity Avenue",
    city: "Orlando",
    state: "Florida",
    zipcode: "32817"
  },
  {
    locationId: "loc5",
    locationName: "YMCA Park",
    street: "215 1st Street",
    city: "Orlando",
    state: "Florida",
    zipcode: "32817"
  },
  {
    locationId: "loc6",
    locationName: "Orlando Convention Center",
    street: "700 Main Street",
    city: "Orlando",
    state: "Florida",
    zipcode: "32817"
  }
];
// const dummyLocationData = [
//   {
//     locationId: "loc1",
//     locationName: "UCF Arena",
//     address: {
//       street: "1000 Univerity Avenue",
//       city: "Orlando",
//       state: "Florida",
//       zipcode: "32817"
//     }
//   },
//   {
//     locationId: "loc2",
//     locationName: "UCF Theatre",
//     address: {
//       street: "1002 Univerity Avenue",
//       city: "Orlando",
//       state: "Florida",
//       zipcode: "32817"
//     }
//   },
//   {
//     locationId: "loc3",
//     locationName: "UCF Convention Center",
//     address: {
//       street: "1005 Univerity Avenue",
//       city: "Orlando",
//       state: "Florida",
//       zipcode: "32817"
//     }
//   },
//   {
//     locationId: "loc4",
//     locationName: "UCF Bookstore",
//     address: {
//       street: "1200 Univerity Avenue",
//       city: "Orlando",
//       state: "Florida",
//       zipcode: "32817"
//     }
//   },
//   {
//     locationId: "loc5",
//     locationName: "YMCA Park",
//     address: {
//       street: "215 1st Street",
//       city: "Orlando",
//       state: "Florida",
//       zipcode: "32817"
//     }
//   },
//   {
//     locationId: "loc6",
//     locationName: "Orlando Convention Center",
//     address: {
//       street: "700 Main Street",
//       city: "Orlando",
//       state: "Florida",
//       zipcode: "32817"
//     }
//   }
// ];

const useStyles = makeStyles((theme) => ({
  paper: {
    width: "100%",
    marginTop: theme.spacing(5),
    marginLeft: theme.spacing(7),
    marginRight: theme.spacing(7)
  },
  button: {
    margin: theme.spacing(1)
  }
}));

const addLocationSchema = Yup.object().shape({
  locationName: Yup.string().required("Location Name Required"),
  street: Yup.string().required("Street Required"),
  city: Yup.string().required("City Required"),
  state: Yup.string().required("State/Province Required"),
  zipcode: Yup.string().required("Zip/Postal Code Required"),
  country: Yup.string().required("Country Required")
});

export default function SuperAdminLocationsPage() {
  const classes = useStyles();

  const [isOpen, setIsOpen] = useState(false);
  const [locationsData, setLocationsData] = useState([]);

  useEffect(() => {
    // api call
    setLocationsData(dummyLocationData);
  }, []);

  const handleSubmit = (values) => {
    let idNum = locationsData.length + 1;
    let id = `loc${idNum}`;
    let newLocation = {
      locationId: id,
      ...values
    };

    // newLocation.locationId = id;

    console.log("HERERE");
    setLocationsData((current) => [newLocation, ...current]);
    setIsOpen(false);
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = (handleReset) => {
    setIsOpen(false);
    handleReset();
  };

  return (
    <div className={classes.paper}>
      <Toolbar />
      <div>
        <Button
          onClick={handleOpen}
          variant="contained"
          color="secondary"
          className={classes.button}
          startIcon={<AddIcon />}
        >
          Add location
        </Button>

        <Formik
          initialValues={{
            locationName: "",
            street: "",
            city: "",
            state: "",
            country: "",
            zipcode: ""
          }}
          onSubmit={(values, { resetForm }) => {
            handleSubmit(values);
            resetForm({});
          }}
          validationSchema={addLocationSchema}
          validateOnChange
          validateOnBlur
        >
          {(props) => (
            <Form className={classes.form} noValidate>
              <AddLocationDialog
                {...props}
                isOpen={isOpen}
                handleClose={handleClose}
              />
            </Form>
          )}
        </Formik>
      </div>
      <LocationsTable locationsData={locationsData} />
    </div>
  );
}

/*
  <Dialog open={isOpen} onClose={handleClose} >
        <DialogTitle id="add-location-title">Add new location</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We will send updates
            occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
*/

// function AddLocationDialog({ isOpen, handleClose, ...formikProps }) {
//   const {
//     values,
//     touched,
//     errors,
//     dirty,
//     isSubmitting,
//     handleChange,
//     handleBlur,
//     handleSubmit,
//     handleReset
//   } = formikProps;

//   return (
//     <Dialog open={isOpen} onClose={handleClose} disableBackdropClick>
//       <DialogTitle id="add-location-title">Add New Location</DialogTitle>
//       <DialogContent>
//         <Grid container spacing={3}>
//           <Grid item xs={12}>
//             <MyTextField
//               margin="dense"
//               id="locationName"
//               label="Location Name"
//               type="text"
//               name="locationName"
//               hasError={touched.locationName && !!errors.locationName}
//               errorMsg={errors.locationName}
//               value={values.locationName}
//               onBlur={handleBlur}
//               onChange={handleChange}
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <MyTextField
//               margin="dense"
//               id="street"
//               label="Street"
//               type="text"
//               name="street"
//               hasError={touched.street && !!errors.street}
//               errorMsg={errors.street}
//               value={values.street}
//               onBlur={handleBlur}
//               onChange={handleChange}
//             />
//           </Grid>
//           <Grid item xs={6}>
//             <MyTextField
//               margin="dense"
//               id="city"
//               label="City"
//               type="text"
//               name="city"
//               hasError={touched.city && !!errors.city}
//               errorMsg={errors.city}
//               value={values.city}
//               onBlur={handleBlur}
//               onChange={handleChange}
//             />
//           </Grid>
//           <Grid item xs={6}>
//             <MyTextField
//               margin="dense"
//               id="state-province"
//               label="State/Province"
//               type="text"
//               name="state"
//               hasError={touched.state && !!errors.state}
//               errorMsg={errors.state}
//               value={values.state}
//               onBlur={handleBlur}
//               onChange={handleChange}
//             />
//           </Grid>
//           <Grid item xs={6}>
//             <MyTextField
//               margin="dense"
//               id="zip-postal"
//               label="Zip/Postal Code"
//               type="text"
//               name="zipcode"
//               hasError={touched.zipcode && !!errors.zipcode}
//               errorMsg={errors.zipcode}
//               value={values.zipcode}
//               onBlur={handleBlur}
//               onChange={handleChange}
//             />
//           </Grid>
//           <Grid item xs={6}>
//             <MyTextField
//               margin="dense"
//               id="country"
//               label="Country"
//               type="text"
//               name="country"
//               hasError={touched.country && !!errors.country}
//               errorMsg={errors.country}
//               value={values.country}
//               onBlur={handleBlur}
//               onChange={handleChange}
//             />
//           </Grid>
//         </Grid>
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={() => handleClose(handleReset)} color="primary">
//           Cancel
//         </Button>
//         <Button onClick={handleSubmit} color="primary">
//           Add
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// }

/*

<Formik
          initialValues={{
            locationName: "",
            street: "",
            city: "",
            state: "",
            country: "",
            zipcode: "",
          }}
          onSubmit={(values, actions) => {
            handleSubmit();
          }}
          validationSchema={addLocationSchema}
          validateOnChange
          validateOnBlur
        >
          {({
            values,
            touched,
            errors,
            dirty,
            isSubmitting,
            handleChange,
            handleBlur,
            handleSubmit,
            handleReset
          }) => (
            <Form className={classes.form} noValidate>
            <AddLocationDialog isOpen={isOpen} handleClose={handleClose} />
            </Form>
          )}
        </Formik>
*/
