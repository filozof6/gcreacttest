import { FC, useContext, ReactElement } from 'react';
import {Card, CardContent, Grid, Typography } from '@mui/material';
import { Thermostat, ArrowUpward, ArrowDownward, Air, Waves, Compress } from '@mui/icons-material';
import { WeatherInfoContext } from '../context/WeatherInfoContext';
import CardSkeleton from './CardSkeleton';

type CardData = {
  cardTitle: string,
  mainIcon: ReactElement<any, any>,
  content: ReactElement<any, any>,
};

const WeatherInfo: FC<any> = () => {
  const { weatherInfoLoaded, weatherInfo, weatherInfoLoading } = useContext(WeatherInfoContext)

  if (weatherInfoLoading) {

    return <Grid container spacing={2}>
      {Array.from(Array(4)).map((val, i) => <Grid key={i} item xs={12} sm={6}><CardSkeleton /></Grid>)}
    </Grid>
  }

  const cardDataArray: CardData[] = [
    {
      cardTitle: 'Temp (max / min) ',
      mainIcon: <Thermostat fontSize="large" />,
      content: <>
        <Typography  variant="body1" component="span" fontSize="large" color="success">
          {weatherInfo?.temp.max}°C <ArrowUpward color="success" fontSize="small" sx={{position: 'relative', top: 3}}/>
        </Typography>
        <Typography  variant="body1" component="span" fontSize="medium">
          &nbsp;/&nbsp;
        </Typography> 
        <Typography  variant="body1" component="span" fontSize="small">
          {weatherInfo?.temp.min}°C <ArrowDownward fontSize="small" color="warning"  sx={{position: 'relative', top: 3}}/>
        </Typography>  
      </>
    },
    {
      cardTitle: 'Wind',
      mainIcon: <Air fontSize="large" />,
      content: <>
        <Typography  variant="body1" component="span">
          {weatherInfo?.wind.deg}° <ArrowUpward fontSize="small" sx={{position: 'relative', top: 3, transform: `rotate(${weatherInfo?.wind.deg}deg)`,}}/>
        </Typography>
        <Typography  variant="body1" component="span">
          &nbsp;-&nbsp;
        </Typography> 
        <Typography  variant="body1" component="span">
          {weatherInfo?.wind.speed} m/s
        </Typography> 
      </>
    },
    {
      cardTitle: 'Humidity',
      mainIcon: <Waves fontSize="large" />,
      content: <>{weatherInfo?.humidity} %</>
    },
    {
      cardTitle: 'Pressure',
      mainIcon: <Compress fontSize="large" />,
      content: <>{weatherInfo?.pressure} hPa</>
    }
  ]

  return weatherInfoLoaded ? (
    <Grid container spacing={2}>
      {cardDataArray.map((cardData: CardData, i) => <Grid key={i} item xs={12} sm={6}>
        <Card variant="outlined" 
          sx={{
            transition: '0.25s ease-in-out',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 0 15px #8491af',
            }
          }}
        >
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {cardData.cardTitle}
            </Typography>
            {cardData.mainIcon}
            <br/>
            {cardData.content}
          </CardContent>
        </Card>
      </Grid>
      )}
    </Grid>
  ) : (<></>);
}

export default WeatherInfo
