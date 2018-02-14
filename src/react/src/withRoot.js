import React from 'react';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';

import blue from 'material-ui/colors/blue';
import red from 'material-ui/colors/red';
import Reboot from 'material-ui/Reboot';

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
        {/* Reboot kickstart an elegant, consistent, and simple baseline to build upon. */}
        <Reboot />
        <Component {...props} />
      </MuiThemeProvider>
    );
  }

  return WithRoot;
}

export default withRoot;
