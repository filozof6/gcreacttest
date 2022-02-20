import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import WeatherInfo from "./WeatherInfo";
import { WeatherInfoContext } from "../context/WeatherInfoContext";

const fullyLoadedContext = {
  fetchWeatherInfo: jest.fn(),
  resetWeatherInfo: jest.fn(),
  weatherInfo: {
    temp: {
      min: 1,
      max: 1
    },
    wind: {
      speed: 1,
      deg: 1
    },
    pressure: 1,
    humidity: 1
  },
  weatherInfoLoading: false,
  weatherInfoLoaded: true,
};

test("renders weather info", async () => {
  render(
    <WeatherInfoContext.Provider
      value={fullyLoadedContext}
    >
      <WeatherInfo />
    </WeatherInfoContext.Provider>
  );
  await waitFor(() => {
    const element = screen.getByTestId("weatherInfo");
    expect(element).toBeInTheDocument();
  });
});

test("renders 4 card skeletons on data loading", async () => {
  render(
    <WeatherInfoContext.Provider
      value={{...fullyLoadedContext, weatherInfoLoading: true, weatherInfoLoaded: false}}
    >
      <WeatherInfo />
    </WeatherInfoContext.Provider>
  );
  const cardSkeletons = await screen.findAllByTestId("cardSkeleton");
  expect(cardSkeletons.length).toBe(4);
});
