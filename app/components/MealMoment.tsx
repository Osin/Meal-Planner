'use client';
import Typography from '@mui/material/Typography';
import React from 'react';
import {Stack} from '@mui/material';
import Box from '@mui/material/Box';
import {Meal as MealInterface} from '@/app/lib/Meal';
import Meal from '@/app/components/Meal';
import {MealDay} from '@/app/lib/MealDay';
import {AddCircleOutlineOutlined, NoFoodOutlined} from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';

export interface MealMomentProps {
  moment: string;
  meals: MealInterface[];
  onMealClick: (moment: keyof MealDay, meal?: MealInterface) => void;
}

interface RenderMealProps {
  moment: string;
  index: number;
  totalRowsCount?: number;
  onMealClick: (moment: keyof MealDay, meal?: MealInterface) => void;
  meal: MealInterface;
}

const mealMoment = ({moment, meals, onMealClick}: MealMomentProps) => {
  return (
      <Box key={moment} height={'calc(100% / 3)'} width={'100%'}>
        <Stack direction={'row'} spacing={1} alignItems={'center'}
               justifyContent={'space-between'}>
          <Typography variant={'h5'} component={'h3'}>{moment}</Typography>
          <IconButton aria-label="add meal"
                      onClick={() => onMealClick(moment as keyof MealDay)}>
            <AddCircleOutlineOutlined height={'1rem'}/>
          </IconButton>
        </Stack>
        <Stack direction={'row'} spacing={1} sx={{
          width: '100%',
          my: 1,
          height: 'calc(100% - 32px - 1.5rem)',
        }}>
          {meals.length === 0 &&
              <Box
                  sx={{
                    border: '1px dashed black',
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                <NoFoodOutlined fontSize={'large'} height={'1rem'}/>
              </Box>
          }
          {meals.map(
              (meal: MealInterface, index: number) => (
                  (<Meal
                          meal={meal}
                          key={index}
                          onMealClick={
                            (meal) => {
                              onMealClick(moment as keyof MealDay, meal);
                            }
                          }
                          sx={{
                            position: 'relative',
                            width: `calc(100% / ${meals.length > 2
                                ? meals.length
                                : 2})`,
                            height: 'calc(100% - 16px)',
                          }}/>
                  )),
          )}
        </Stack>
      </Box>
  );
};
export default mealMoment;