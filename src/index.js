import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import '@shopify/polaris/build/esm/styles.css';
import enTranslations from '@shopify/polaris/locales/en.json';
import {AppProvider} from '@shopify/polaris';




ReactDOM.render(
  <React.StrictMode>
     <AppProvider
        // theme={theme}
        i18n={{
          Polaris: {
            Avatar: {
              label: 'Avatar',
              labelWithInitials: 'Avatar with initials {initials}',
            },
            Frame: {skipToContent: 'Skip to content'},
            TopBar: {
              toggleMenuLabel: 'Toggle menu',
              SearchField: {
                clearButtonLabel: 'Clear',
                search: 'Search',
              },
            },
          },
        }}
      >
      <App />
    </AppProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

