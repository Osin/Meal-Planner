'use client';
import React from 'react';
import MealWeek from '@/app/components/MealWeek';
import {MealWeek as MealWeekInterface} from '@/app/lib/MealWeek'
import {createMealWeekFromLocalStorage, getDefaultMealWeek} from '@/app/lib/MealWeek';
import {useLocalStorage} from '@/app/lib/useLocalStorage';

export default function Home() {
  const [mealWeek, updateMealWeek] = useLocalStorage(
      'week',
      getDefaultMealWeek(),
      createMealWeekFromLocalStorage
  );
  const handleUpdateMealWeek = (newMealWeek: MealWeekInterface) => {
    updateMealWeek({...newMealWeek});
  }
  return (<MealWeek mealWeek={mealWeek} onUpdateMealWeek={handleUpdateMealWeek}/>
  );
}
