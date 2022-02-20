import axios from 'axios';
import React, { ReactNode, useContext, useState } from 'react';
import { SnackBarContext } from './SnackBarContext';

export type WeatherInfo = {
  temp: {
    min: number;
    max: number;
  };
  wind: {
    speed: number;
    deg: number;
  };
  pressure: number;
  humidity: number;
};

type WeatherInfoContextType = {
  fetchWeatherInfo: (lat: number, lng: number) => Promise<void>;
  resetWeatherInfo: () => void;
  weatherInfo?: WeatherInfo;
  weatherInfoLoading: boolean;
  weatherInfoLoaded: boolean;
};

export const WeatherInfoContext = React.createContext<WeatherInfoContextType>({
  fetchWeatherInfo: async () => undefined,
  resetWeatherInfo: () => undefined,
  weatherInfo: undefined,
  weatherInfoLoading: false,
  weatherInfoLoaded: false,
});

export function WeatherInfoContextProvider({ children }: { children: ReactNode }) {
  const { sendMessage } = useContext(SnackBarContext);
  const [weatherInfo, setWeatherInfo] = useState<WeatherInfo | undefined>();
  const [weatherInfoLoading, setWeatherInfoLoading] = useState<boolean>(false);
  const [weatherInfoLoaded, setWeatherInfoLoaded] = useState<boolean>(false);

  const fetchWeatherInfo = async (lat: number, lng: number) => {
    setWeatherInfoLoading(true);
    let loaded = true;
    const apiKey: string | undefined = process.env.REACT_APP_WEATHER_API_KEY;
    const result = await axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&appid=${apiKey}`,
      )
      .catch(() => {
        sendMessage('Network error', 'error');
        loaded = false;
      });
    if (result?.data) {
      setWeatherInfo({
        temp: {
          min: result.data.main.temp_min,
          max: result.data.main.temp_max,
        },
        wind: {
          speed: result.data.wind.speed,
          deg: result.data.wind.deg,
        },
        pressure: result.data.main.pressure,
        humidity: result.data.main.humidity,
      });
    }
    setWeatherInfoLoading(false);
    setWeatherInfoLoaded(loaded);
  };

  const resetWeatherInfo = () => {
    setWeatherInfoLoading(false);
    setWeatherInfoLoaded(false);
    setWeatherInfo(undefined);
  };

  const Provider = WeatherInfoContext.Provider;

  return (
    <Provider
      value={{
        fetchWeatherInfo,
        resetWeatherInfo,
        weatherInfo,
        weatherInfoLoading,
        weatherInfoLoaded,
      }}
    >
      {children}
    </Provider>
  );
}
