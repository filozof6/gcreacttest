import { Alert } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import { useContext } from 'react';
import { SnackBarContext } from '../context/SnackBarContext';

export default function PositionedSnackbar() {
  const { message, open, severity, closeSnackBar } = useContext(SnackBarContext);

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      open={open}
      message="message"
    >
      <Alert onClose={closeSnackBar} severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
}
