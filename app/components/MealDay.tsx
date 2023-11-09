import React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import Image from 'next/image';
import {SxProps, width} from '@mui/system';
import TodayIcon from '@mui/icons-material/Today';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import {getFrenchDay} from '@/app/lib/getFrenchDay';
import Typography from '@mui/material/Typography';
import {Stack} from '@mui/material';
import Meal from './Meal';
import Box from '@mui/material/Box';

interface MealDayProps {
  day: string;
  meals: string[];
  onMealClick: (meal: string) => void;
  featured: boolean;
  sxCard?: SxProps;
  sxCardMedia?: SxProps;
}

const mealMoments = ['Petit déjeuner', 'Déjeuner', 'Dîner'];
const numberOfMeals = 3;
const mealDay = ({day, sxCard, sxCardMedia, featured}: MealDayProps) => {
  return <Card sx={sxCard}>
    <CardHeader
        title={<Typography variant={'h4'} component={'h2'}>{day}</Typography>}
        avatar={featured ? <TodayIcon color={'primary'}/> :
            <CalendarTodayIcon color={'disabled'}/>}/>
    <CardMedia sx={sxCardMedia}>
      {mealMoments.map((moment, index) =>
          (<Box key={index} height={'calc(100% / 3)'} width={'100%'}>
            <Typography variant={'h5'} component={'h3'}>{moment}</Typography>
            <Stack direction={'row'} spacing={1} sx={{
              width: '100%',
              my: 1,
              height: 'calc(100% - 32px - 1.5rem)',
            }}>
              {[...Array(numberOfMeals)].map((_, index) => <Meal key={index} sx={{
                position: 'relative',
                width: `calc(100% / ${numberOfMeals})`,
                height: 'calc(100% - 16px)',
              }}/>)}
            </Stack>
          </Box>))
      }
    </CardMedia>
  </Card>;
};
export default mealDay;