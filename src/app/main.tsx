import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from 'styled-components';
import { LIGHT_THEME, DropdownProvider, FontsVTBGroup } from '@admiral-ds/react-ui';
import { StoreProvider } from './providers/StoreProvider';
import { App } from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={LIGHT_THEME}>
      <DropdownProvider>
        <FontsVTBGroup />
        <StoreProvider>
          <App />
        </StoreProvider>
      </DropdownProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
