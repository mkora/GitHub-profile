import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import blue from '@material-ui/core/colors/blue';
import red from '@material-ui/core/colors/red';
import CssBaseline from '@material-ui/core/CssBaseline';

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: red,
  },
});

if (process.browser) {
  window.theme = theme;
}

function withRoot(Component) {
  function WithRoot(props) {
    return (
      <MuiThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Component {...props} />
      </MuiThemeProvider>
    );
  }

  return WithRoot;
}

export default withRoot;
