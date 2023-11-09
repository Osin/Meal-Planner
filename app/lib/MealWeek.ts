import {getDefaultDay, MealDay} from '@/app/lib/MealDay';

export interface MealWeek {
  monday: MealDay;
  tuesday: MealDay;
  wednesday: MealDay;
  thursday: MealDay;
  friday: MealDay;
  saturday: MealDay;
  sunday: MealDay;
}

export const getDefaultMealWeek = () => ({
    monday: getDefaultDay(),
    tuesday: getDefaultDay(),
    wednesday: getDefaultDay(),
    thursday: getDefaultDay(),
    friday: getDefaultDay(),
    saturday: getDefaultDay(),
    sunday: getDefaultDay(),
  } as MealWeek);

export const createMealWeekFromLocalStorage = (objectFromLocalStorage: object) => {
  try{
  const mealWeek = getDefaultMealWeek();
  Object.keys(objectFromLocalStorage).forEach((key) => {
    // @ts-ignore
    mealWeek[key as keyof MealWeek] = objectFromLocalStorage[key as keyof MealWeek] as MealDay;
  });
  return mealWeek as MealWeek;
  } catch (e) {
    console.error(e);
    return getDefaultMealWeek();
  }
}