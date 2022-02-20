import { FC } from 'react';
import { Card, CardContent, Skeleton } from '@mui/material';

const CardSkeleton: FC<any> = () => {
  return (
    <Card variant="outlined" data-testid="cardSkeleton">
      <CardContent
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
      >
        <Skeleton variant="text" sx={{ width: '50%' }} />
        <br />
        <Skeleton variant="circular" width={40} height={40} />
        <br />
        <Skeleton variant="text" sx={{ width: '50%' }} />
      </CardContent>
    </Card>
  );
};

export default CardSkeleton;
