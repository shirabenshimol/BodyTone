import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import '@fontsource/inter'; // default weight
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import enrollmentsSlice from './redux/reducers/enrollmentsSlice';
import { BrowserRouter } from 'react-router-dom';

// יצירת השורש של הריאקט
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);


const rootReducer = combineReducers({
  enrollments: enrollmentsSlice,  // חייב להיות "enrollments" כדי להתאים ל-useSelector
});


// יצירת החנות (store)
const myStore = configureStore({
  reducer: rootReducer,
});

// רינדור האפליקציה
root.render(
  <React.StrictMode>
    <Provider store={myStore}>
     
        <App />
    
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
