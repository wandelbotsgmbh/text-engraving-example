"use client"

import { createTheme, type ThemeOptions } from "@mui/material/styles"

const colorMidnight = "rgba(0, 19, 55, 1)";
const colorMidnightSecondary = "rgba(0, 31, 87, 1)";
const colorActionPrimaryDefault = "rgba(0, 164, 244, 1)";

const themeOptions: ThemeOptions = {
  components: {
    MuiTouchRipple: {
      styleOverrides: {
        child: {
          backgroundColor: "red"
        }
      }
    }
  },
  palette: {
    primary: {
      main: colorActionPrimaryDefault,
    },
  },
}

export const theme = createTheme(themeOptions)