'use client';
import React from 'react';
import MealWeek from '@/app/components/MealWeek';
import {createMealWeekFromLocalStorage, getDefaultMealWeek} from '@/app/lib/MealWeek';
import {useLocalStorage} from '@/app/lib/useLocalStorage';
import {MealUpdate} from '@/app/lib/MealUpdate';

export default function Home() {
  const [mealWeek, updateMealWeek] = useLocalStorage(
      'week',
      getDefaultMealWeek(),
      createMealWeekFromLocalStorage
  );
  const onUpdateMealWeek = ({moment, day, meals}: MealUpdate) => {
    console.log('onUpdateMoment', {moment, day, meals});
    const newMealWeek = {...mealWeek};
    newMealWeek[day][moment] = meals;
    updateMealWeek(newMealWeek);
  }
  return (<MealWeek mealWeek={mealWeek} handleMealClick={onUpdateMealWeek}/>
  );
}
