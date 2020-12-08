import React from "react";
import { TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { useField, useFormikContext } from "formik";
import { degreesOffered } from "../models/degreesOffered";

export default function LocationSelect(props) {
  const { setFieldTouched, setFieldValue } = useFormikContext();
  const [field, meta] = useField(props);
  const isError = meta.touched && !!meta.error;

  const textFieldProps = {
    fullWidth: true,
    label: "Location",
    margin: "normal",
    variant: "outlined"
  };

  return (
    <Autocomplete
      {...field}
      blurOnSelect
      fullWidth
      name={"degree"}
      options={degreesOffered}
      value={field.value}
      onChange={(_, value) => {
        setFieldTouched(field.name, true);
        setFieldValue(field.name, value);
      }}
      getOptionSelected={(option, value) => option.value === value.value}
      getOptionLabel={(option) => option.label}
      renderInput={(params) => (
        <TextField
          {...params}
          {...textFieldProps}
          helperText={isError ? "Location Required" : " "}
          error={isError}
        />
      )}
    />
  );
}
