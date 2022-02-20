import { FC, useContext, useEffect, useState } from 'react'
import {Autocomplete, Box, Button, CircularProgress, FormControl, FormGroup, TextField } from '@mui/material'
import { Country, CountryListContext } from '../context/CountryListContext';
import { WeatherInfoContext } from '../context/WeatherInfoContext';
import { Refresh } from '@mui/icons-material';

const CountryPicker: FC<any> = () => {
  const { fetchCountryList, countryList, countryListLoaded } = useContext(CountryListContext);
  const { fetchWeatherInfo, resetWeatherInfo, weatherInfoLoading } = useContext(WeatherInfoContext);
  const [ country, setCountry ] = useState<Country|null>(null);

  useEffect(() => {
    fetchCountryList();
  }, []);

  return countryListLoaded ? (
    <FormControl fullWidth>
      <FormGroup row>
        <Autocomplete
          sx={{ flex: 1}}
          id="demo-simple-select"
          renderOption={(props, option) => (
            <Box component="li" {...props}>
              {option.name}
            </Box>
          )}
          autoHighlight
          getOptionLabel={(option) => option.name}
          renderInput={(params) => <TextField {...params} label="Country" />}
          options={countryList}
          onChange={(event, value) => {
            if (value !== null) {
              const selectedCountry: Country = value;
              setCountry(selectedCountry)
              fetchWeatherInfo(selectedCountry.latLon[0], selectedCountry.latLon[1]);
            } else {
              setCountry(null);
              resetWeatherInfo();
            }
          }}
        />
        <Button sx={{ width: '10%'}} variant="outlined" disabled={country===null} onClick={() => {
          if (country !== null) {
            fetchWeatherInfo(country.latLon[0], country.latLon[1]);
          }
        }}>
          {weatherInfoLoading ? <CircularProgress /> : <Refresh /> }
        </Button>
      </FormGroup>
    </FormControl>
  ) : (<></>)
}

export default CountryPicker
