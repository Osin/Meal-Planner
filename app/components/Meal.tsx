import CardMedia from '@mui/material/CardMedia';
import Image from 'next/image';
import React from 'react';
import {SxProps} from '@mui/system';
import {Meal} from '@/app/lib/Meal';
import Box from '@mui/material/Box';
import {AddCircleOutlineOutlined} from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';

interface MealProps {
  sx?: SxProps;
  meal?: Meal;
}

const meal = ({sx, meal}: MealProps) => (
    <CardMedia sx={sx}>
      {meal ?
          <Image
              src={'https://source.unsplash.com/random/400x400/?food,sig=' +
                  (Math.floor(Math.random() * 10))
              }
              alt="food"
              style={{objectFit: 'cover'}}
              fill
              placeholder={'blur'}
              blurDataURL={'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mMsLEyrBwAEbAHJ/47QhgAAAABJRU5ErkJggg=='}
          /> : <Box border={'1px dashed black'} sx={{
            height: '100%',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}><IconButton
              sx={{
                height: '100%',
                width: '100%',
                p: 0,
              }}><AddCircleOutlineOutlined
              height={'1rem'}/></IconButton>
          </Box>
      }
    </CardMedia>
);

export default meal;