import {createTheme} from '@mui/material';
import {brown, teal} from '@mui/material/colors';
import {Cairo} from 'next/font/google';

// eslint-disable-next-line new-cap
const cairo = Cairo({subsets: ['arabic', 'latin']});
export const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 2560,
    },
  },
  palette: {
    primary: {
      main: teal['500'],
    },
    secondary: {
      main: brown['400'],
    },
  },
  typography: {
    fontFamily: cairo.style.fontFamily,
    h1: {fontSize: '1.8rem'},
    h2: {fontSize: '1.6rem'},
    h3: {fontSize: '1.4rem'},
    h4: {fontSize: '1.2rem'},
    h5: {fontSize: '1.0rem'},
    h6: {fontSize: '0.8rem'},
  },
});
