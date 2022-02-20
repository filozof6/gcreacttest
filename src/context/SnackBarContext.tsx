import { AlertColor } from '@mui/material';
import React, { ReactNode } from 'react';

type SnackBarContextType = {
  sendMessage: (message: string, messageSeverity: AlertColor) => void;
  closeSnackBar: () => void;
  message: string;
  open: boolean;
  severity: AlertColor;
};

export const SnackBarContext = React.createContext<SnackBarContextType>({
  sendMessage: () => undefined,
  closeSnackBar: () => undefined,
  message: '',
  open: false,
  severity: 'info',
});

export function SnackBarContextProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = React.useState<boolean>(false);
  const [message, setMessage] = React.useState<string>('');
  const [severity, setSeverity] = React.useState<AlertColor>('info');

  const sendMessage = (message: string, messageSeverity: AlertColor) => {
    setMessage(message);
    setSeverity(messageSeverity);
    setOpen(true);
    setTimeout(() => setOpen(false), 6000);
  };
  const closeSnackBar = () => {
    setOpen(false);
  };

  const Provider = SnackBarContext.Provider;

  return (
    <Provider value={{ sendMessage, closeSnackBar, message, open, severity }}>{children}</Provider>
  );
}
