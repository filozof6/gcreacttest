import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import CountryPicker from './CountryPicker';
import { CountryListContextProvider } from '../context/CountryListContext';

test('renders country picker', async () => {
  render(
    <CountryListContextProvider>
      <CountryPicker />
    </CountryListContextProvider>,
  );
  await waitFor(() => {
    const element = screen.getByTestId('countryPicker');
    expect(element).toBeInTheDocument();
  });
});
