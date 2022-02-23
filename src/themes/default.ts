import { createTheme } from '@mui/material'
import { green } from '@mui/material/colors'

const theme = createTheme({
  typography: {
    fontFamily: 'Karla, sans-serif',
  },
  palette: {
    primary: {
      main: green[600],
    },
  },
})

theme.components = {
  MuiSelect: {
    styleOverrides: {
      select: {
        padding: '8px 16px',
      },
    },
  },
  MuiButton: {
    styleOverrides: {
      root: {
        textTransform: 'none',
      },
      textSecondary: {
        color: 'white',
        minWidth: 'unset',
        borderRadius: '50%',
        aspectRatio: '1',
        '&:hover': {
          background: 'black',
        },
      },
    },
  },
  MuiInput: {
    styleOverrides: {},
  },
  MuiOutlinedInput: {
    styleOverrides: {
      root: {
        padding: 'unset',
      },
      input: {
        padding: 12,
      },
    },
  },
}

export { theme }
