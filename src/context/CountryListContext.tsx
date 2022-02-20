import axios from 'axios';
import React, { ReactNode, useContext, useState } from 'react';
import { SnackBarContext } from './SnackBarContext';

export type Country = {
  name: string;
  latLon: [number, number];
};

type CountryListContextType = {
  fetchCountryList: () => Promise<void>;
  countryList: Country[];
  countryListLoading: boolean;
  countryListLoaded: boolean;
};

export const CountryListContext = React.createContext<CountryListContextType>({
  fetchCountryList: async () => undefined,
  countryList: [],
  countryListLoading: false,
  countryListLoaded: false,
});

export function CountryListContextProvider({ children }: { children: ReactNode }) {
  const { sendMessage } = useContext(SnackBarContext);
  const [countryList, setCountryList] = useState<Country[]>([]);
  const [countryListLoading, setCountryListLoading] = useState<boolean>(false);
  const [countryListLoaded, setCountryListLoaded] = useState<boolean>(false);

  const fetchCountryList = async () => {
    setCountryListLoading(true);
    let loaded = true;
    const result = await axios.get('https://restcountries.com/v3.1/all').catch(() => {
      sendMessage('Network error', 'error');
      loaded = false;
    });
    if (result?.data) {
      setCountryList(
        result.data.map((row: any) => ({
          name: row.name.common,
          latLon: row.latlng,
        })),
      );
    } else {
      setCountryList([]);
    }
    setCountryListLoading(false);
    setCountryListLoaded(loaded);
  };

  const Provider = CountryListContext.Provider;

  return (
    <Provider value={{ fetchCountryList, countryList, countryListLoading, countryListLoaded }}>
      {children}
    </Provider>
  );
}
