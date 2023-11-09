import {Meal} from '@/app/lib/Meal';
import {MealDay} from '@/app/lib/MealDay';
import {MealWeek} from '@/app/lib/MealWeek';

export interface MealUpdate {
  meal?: Meal;
  day: keyof MealWeek;
  moment: keyof MealDay;
}