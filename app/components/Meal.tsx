'use client';
import CardMedia from '@mui/material/CardMedia';
import Image from 'next/image';
import React, {EventHandler} from 'react';
import {SxProps} from '@mui/system';
import {Meal} from '@/app/lib/Meal';
import IconButton from '@mui/material/IconButton';

interface MealProps {
  sx?: SxProps;
  meal: Meal;
  onMealClick: (meal?: Meal) => undefined;
}

const meal = ({
  sx, meal, onMealClick,
}: MealProps) => {
  return (
      <CardMedia sx={sx}>
        <IconButton
            onClick={() => {
              onMealClick(meal);
            }}
            sx={{height: '100%', width: '100%', p: 0}}
        ><Image
            src={meal.image.url}
            alt={meal.image.alt}
            style={{objectFit: 'cover'}}
            fill
            sizes={'100%'}
        />
        </IconButton>
      </CardMedia>
  );
};

export default meal;