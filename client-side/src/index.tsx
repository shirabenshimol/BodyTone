import { v4 as uuidv4 } from "uuid";
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import '@fontsource/inter';

import { Provider } from 'react-redux';
import { store, persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';

// פוליפיל: אם אין randomUUID בדפדפן, נשתמש ב-uuidv4
if (!(window as any).crypto) (window as any).crypto = {} as any;
if (!(window as any).crypto.randomUUID) {
  (window as any).crypto.randomUUID = uuidv4 as any;
}


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
