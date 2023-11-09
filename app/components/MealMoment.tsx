import Typography from '@mui/material/Typography';
import React from 'react';
import {Stack} from '@mui/material';
import Box from '@mui/material/Box';
import {Meal as MealInterface} from '@/app/lib/Meal';
import Meal from '@/app/components/Meal';
import {MealDay} from '@/app/lib/MealDay';
import {MealWeek} from '@/app/lib/MealWeek';

export interface MealMomentProps {
  moment: string;
  day: string;
  meals: MealInterface[];
  onMealClick: (moment: keyof MealDay, meal?: MealInterface) => void;
}

const maxMealByDay: number = 3;

const renderMeal = (
    moment: string,
    index: number,
    onMealClick: (moment: keyof MealDay, meal?: MealInterface) => void,
    meal?: MealInterface) => (<Meal
    meal={meal}
    key={index}
    onMealClick={
      (meal) => {
        onMealClick(moment as keyof MealDay, meal);
      }
    }
    sx={{
      position: 'relative',
      width: `calc(100% / ${maxMealByDay})`,
      height: 'calc(100% - 16px)',
    }}/>);
const mealMoment = ({day, moment, meals, onMealClick}: MealMomentProps) => {
  return (
      <Box key={moment} height={'calc(100% / 3)'} width={'100%'}>
        <Typography variant={'h5'} component={'h3'}>{moment}</Typography>
        <Stack direction={'row'} spacing={1} sx={{
          width: '100%',
          my: 1,
          height: 'calc(100% - 32px - 1.5rem)',
        }}>
          {meals.map(
              (meal: MealInterface, index: number) => (renderMeal(moment, index,
                  onMealClick, meal)),
          )}
          {meals.length < maxMealByDay &&
              renderMeal(moment, meals.length, onMealClick)}
        </Stack>
      </Box>
  );
};
export default mealMoment;