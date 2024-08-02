import { createTheme } from "@mui/material"

const theme = createTheme({
  typography: {
    fontFamily: 'Manrope Variable',
  },
  palette: {
    blue: {
      main: '#8EA9CC',
      light: '#AFC5E1',
      dark: '#3B6294',
      contrastText: '#17375F',
    }
  }
})

export default theme