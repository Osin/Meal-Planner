'use client';
import React from 'react';
import MealWeek from '@/app/components/MealWeek';
import {MealWeek as MealWeekInterface} from '@/app/lib/MealWeek';
import {
  createMealWeekFromLocalStorage,
  getDefaultMealWeek,
} from '@/app/lib/MealWeek';
import {useLocalStorage} from '@/app/lib/useLocalStorage';
import {theme} from '@/app/lib/theme';
import {ThemeProvider} from '@mui/material';
import { NextAppDirEmotionCacheProvider } from 'tss-react/next';

export default function Home() {
  const [mealWeek, updateMealWeek] = useLocalStorage(
      'week',
      getDefaultMealWeek(),
      createMealWeekFromLocalStorage,
  );
  const handleUpdateMealWeek = (newMealWeek: MealWeekInterface) => {
    updateMealWeek({...newMealWeek});
  };
  return (
      <NextAppDirEmotionCacheProvider options={{key: 'css'}}>
        <ThemeProvider theme={theme}>
          <MealWeek mealWeek={mealWeek}
                    onUpdateMealWeek={handleUpdateMealWeek}/>
        </ThemeProvider>
      </NextAppDirEmotionCacheProvider>
  );
}
