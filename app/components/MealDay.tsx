import React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import {SxProps, width} from '@mui/system';
import TodayIcon from '@mui/icons-material/Today';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import Typography from '@mui/material/Typography';
import {MealDay as MealDayInterface} from '@/app/lib/MealDay';
import MealMoment from '@/app/components/MealMoment';
import {MealDay} from '@/app/lib/MealDay';
import {Meal as MealInterface} from '@/app/lib/Meal';
import {MealWeek} from '@/app/lib/MealWeek';

interface MealDayProps {
  day: string;
  mealDay: MealDayInterface;
  featured: boolean;
  sxCard?: SxProps;
  sxCardMedia?: SxProps;
  onMealClick: (
      day: keyof MealWeek,
      moment: keyof MealDay,
      meal?: MealInterface
  ) => void;
}

const mealDay = ({
  day,
  mealDay,
  sxCard,
  sxCardMedia,
  featured,
  onMealClick,
}: MealDayProps) => {

  const handleMealClick = (moment: keyof MealDay, meal?: MealInterface) => {
    onMealClick(day as keyof MealWeek, moment, meal);
  }
  return (<Card sx={sxCard}>
    <CardHeader
        titleTypographyProps={{variant: 'h5', component: 'h2'}}
        title={day[0].toUpperCase() + day.slice(1)}
        avatar={featured ? <TodayIcon color={'primary'}/> :
            <CalendarTodayIcon color={'disabled'}/>}/>
    <CardMedia sx={sxCardMedia}>
      {Object.keys(mealDay).map((moment, index) =>
          <MealMoment key={index}
                      moment={moment}
                      onMealClick={handleMealClick}
                      meals={mealDay[moment as keyof MealDayInterface]}
          />,
      )}
    </CardMedia>
  </Card>);
};
export default mealDay;