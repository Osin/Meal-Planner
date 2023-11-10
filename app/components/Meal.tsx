import CardMedia from '@mui/material/CardMedia';
import Image from 'next/image';
import React, {EventHandler} from 'react';
import {SxProps} from '@mui/system';
import {Meal} from '@/app/lib/Meal';
import Box from '@mui/material/Box';
import {AddCircleOutlineOutlined} from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';

interface MealProps {
  sx?: SxProps;
  meal?: Meal;
  onMealClick: (meal?: Meal) => undefined;
}

const emptyMeal = (<Box border={'1px dashed black'} sx={{
  height: '100%',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}}>
  <AddCircleOutlineOutlined height={'1rem'}/></Box>);

const filledMeal = (meal: Meal) => (<Image
    src={meal.image.url}
    alt={meal.image.alt}
    style={{objectFit: 'cover'}}
    fill
    sizes={'100%'}
/>);

const meal = ({
  sx, meal, onMealClick,
}: MealProps) => {
  const handleMealClick = (meal: Meal | undefined) => {
    onMealClick(meal);
  };

  return (
      <CardMedia sx={sx}>
        <IconButton
            onClick={() => handleMealClick(meal)}
            sx={{height: '100%', width: '100%', p: 0}}
        >
          {meal ? (filledMeal(meal)) : (emptyMeal)}
        </IconButton>
      </CardMedia>
  );
};

export default meal;