import React from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';

import { Map } from './components/map/map';
import theme from './theme';
import { Topbar } from './components/topbar/topbar';

export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Topbar />
      <Map />
    </ThemeProvider>
  )
}