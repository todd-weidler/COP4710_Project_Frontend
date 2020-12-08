import { createMuiTheme } from "@material-ui/core/styles";
import { amber, blue, lightBlue } from "@material-ui/core/colors";

export const theme = createMuiTheme({
  palette: {
    // secondary: {
    //   main:
    // },
    primary: blue,
    secondary: amber
  },
  typography: {
    fontFamily: ['"Roboto"', "sans-serif"].join(",")
  }
});
