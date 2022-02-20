import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { CountryListContextProvider } from './context/CountryListContext';
import { WeatherInfoContextProvider } from './context/WeatherInfoContext';
import { SnackBarContextProvider } from './context/SnackBarContext';

ReactDOM.render(
  <React.StrictMode>
    <SnackBarContextProvider>
      <CountryListContextProvider>
        <WeatherInfoContextProvider>
          <App />
        </WeatherInfoContextProvider>
      </CountryListContextProvider>
    </SnackBarContextProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
