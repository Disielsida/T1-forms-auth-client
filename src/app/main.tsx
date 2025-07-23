import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from 'styled-components';
import { LIGHT_THEME, DropdownProvider, FontsVTBGroup } from '@admiral-ds/react-ui';
import { StoreProvider } from './providers/StoreProvider';
import { AppRouter } from './providers/routing/AppRouter';
import { BrowserRouter } from 'react-router-dom';
import '@shared/styles/index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={LIGHT_THEME}>
        <DropdownProvider>
          <FontsVTBGroup />
          <StoreProvider>
            <AppRouter />
          </StoreProvider>
        </DropdownProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
