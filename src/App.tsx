import React from 'react';
import './App.css';
import CountryPicker from './components/CountryPicker';
import WeatherInfo from './components/WeatherInfo';
import { Container } from '@mui/material';
import PositionedSnackbar from './components/SnackBar';

function App() {
  return (
    <div className="App">
      <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 8, pb: 6 }}>
        <CountryPicker />
        <hr />
        <WeatherInfo />
        <PositionedSnackbar />
      </Container>
    </div>
  );
}

export default App;
