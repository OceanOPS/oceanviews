// src/theme.ts
import { createTheme, ThemeProvider } from '@mui/material/styles';

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
  },
	typography: {
		fontFamily: 'Montserrat, sans-serif',
		h1: {
			fontWeight: 600, // Semibold for h1
		},
		h2: {
			fontWeight: 600, // Semibold for h2
		},
		h3: {
			fontWeight: 600, // Semibold for h3
		},
		body1: {
			fontWeight: 400, // Regular for body text
		},
		body2: {
			fontWeight: 300, // Light for smaller text
		},
	},
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
    },
  },
  
  typography: {
		fontFamily: 'Montserrat, sans-serif',
		h1: {
			fontWeight: 600, // Semibold for h1
		},
		h2: {
			fontWeight: 600, // Semibold for h2
		},
		h3: {
			fontWeight: 600, // Semibold for h3
		},
		body1: {
			fontWeight: 400, // Regular for body text
		},
		body2: {
			fontWeight: 300, // Light for smaller text
		},
	},
});
