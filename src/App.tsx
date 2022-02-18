import React from 'react';
import Github from './components/treeview/Treeview';
import { Container, createTheme, ThemeProvider } from '@mui/material';
import Copyright from './components/shared/Copyright';
import ResponsiveAppBar from './components/shared/ResponsiveAppBar';

function App() {
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: 'light'
        },
      }),
    [{}],
  );

  return (
    <ThemeProvider theme={theme}>
    <Container maxWidth="lg">
        <ResponsiveAppBar />
        <Github />
        <Copyright />
    </Container>
    </ThemeProvider>
  );
}

export default App;
