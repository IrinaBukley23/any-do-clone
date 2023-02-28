import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#8158d3',
    },
    secondary: {
      main: '#586dd3',
    },
    error: {
      main: '#d3586c',
    },
    warning: {
      main: '#d3be58',
    },
    info: {
      main: '#58aad3',
    },
    success: {
      main: '#5ab95d',
    }
  }
});

export default theme;
