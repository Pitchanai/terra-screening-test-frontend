import { createTheme } from '@mui/material'

const theme = createTheme({
  typography: {
    fontFamily: 'Karla, sans-serif',
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
    },
  },
}

export { theme }
