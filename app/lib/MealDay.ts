import {Meal} from '@/app/lib/Meal';

export interface MealDay {
  'breakfast': Meal[];
  'lunch': Meal[];
  'diner': Meal[];
}
export const getDefaultDay = (): MealDay => {
  return {
    breakfast: [],
    lunch: [],
    diner: [],
  } as MealDay
}