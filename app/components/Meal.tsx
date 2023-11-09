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

const filledMeal = (<Image
    src={'https://source.unsplash.com/random/400x400/?food,sig=' +
        (Math.floor(Math.random() * 10))
    }
    alt="food"
    style={{objectFit: 'cover'}}
    fill
    placeholder={'blur'}
    blurDataURL={'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mMsLEyrBwAEbAHJ/47QhgAAAABJRU5ErkJggg=='}
/>);

const meal = ({
  sx, meal, onMealClick = (meal) => {
    console.log('click on', meal);
  },
}: MealProps) => {
  const handleMealClick = (meal: Meal | undefined) => {
    console.log('handleMealClick', meal);
    onMealClick(meal);
  };

  return (
      <CardMedia sx={sx}>
        <IconButton
            onClick={() => handleMealClick(meal)}
            sx={{height: '100%', width: '100%', p: 0}}
        >
          {meal ? (filledMeal) : (emptyMeal)}
        </IconButton>
      </CardMedia>
  );
};

export default meal;