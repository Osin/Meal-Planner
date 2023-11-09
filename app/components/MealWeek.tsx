'use client';
import React from 'react';
import {ScrollMenu, VisibilityContext} from 'react-horizontal-scrolling-menu';
import usePreventBodyScroll from '../lib/usePreventBodyScroll';
import MealDay from './MealDay';
import {MealDay as MealDayInterface} from '@/app/lib/MealDay';
import Box from '@mui/material/Box';
import {getDay} from '@/app/lib/getDay';
import Header from '@/app/components/Header';
import {
  MealWeek as MealWeakInterface,
  getDefaultMealWeek,
} from '@/app/lib/MealWeek';
import {MealUpdate} from '@/app/lib/MealUpdate';
import {Meal} from '@/app/lib/Meal';
import {Dialog, useMediaQuery} from '@mui/material';
import {useTheme} from '@mui/system';
import NewMealDialog from '@/app/components/NewMealDialog';

type scrollVisibilityApiType = React.ContextType<typeof VisibilityContext>;

interface MealWeekProps {
  mealWeek: MealWeakInterface;
  handleMealClick: (update: MealUpdate) => void;
}

const LAST_INDEX_DAY_OF_WEEK = 6;

function MealWeek({mealWeek, handleMealClick}: MealWeekProps) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));
  const {disableScroll, enableScroll} = usePreventBodyScroll();
  const [mealPlaceInUpdate, setMealPlaceInUpdate] = React.useState<MealUpdate | undefined>();
  const featuredDay = getDay(new Date());
  const handleMealClickWrapper = (
      day: keyof MealWeakInterface,
      moment: keyof MealDayInterface,
      meal?: Meal | undefined) => {
    console.log('handleMealClickWrapper', {day, moment, meal});
    setMealPlaceInUpdate({day, moment, meal: meal});
  };

  const onMealDialogClose = () => {
    setMealPlaceInUpdate(undefined);
  };

  const onMealDialogSave = (mealPlaceUpdated: MealUpdate) => {
    //clone the week first
    const newMealWeek = {...mealWeek};
    //add the new meal if not exist
    if (mealPlaceInUpdate?.meal === undefined && mealPlaceUpdated.meal) {
      newMealWeek[mealPlaceUpdated.day][mealPlaceUpdated.moment].push(
          mealPlaceUpdated.meal);
    }

    //replace the old meal by the new if exist
    if(mealPlaceInUpdate?.meal !== undefined){
      //erase the old first
      newMealWeek[mealPlaceUpdated.day][mealPlaceUpdated.moment] = mealWeek[mealPlaceUpdated.day][mealPlaceUpdated.moment].filter(
          mealFromMealWeek => mealFromMealWeek.name !== mealPlaceInUpdate.meal?.name);
    }
    const meal = mealPlaceUpdated.meal;
    if (mealPlaceInUpdate?.meal !== undefined) {
      newMealWeek[mealPlaceUpdated.day][mealPlaceUpdated.moment].filter(
          mealFromMealWeek => mealFromMealWeek.name !== meal.name);
    }

  };

  return (
      <Box
          component={'main'}
          sx={{
            height: 'calc(100dvh)',
            width: '100dvw',
          }}
          onMouseEnter={disableScroll} onMouseLeave={enableScroll}
      >
        <ScrollMenu
            onWheel={onWheel}
            Header={<Header/>}
            Footer={<div>Footer</div>}
        >
          {Object.keys(mealWeek).map((day, index) => (
              <MealDay
                  key={day}
                  sxCard={{
                    ml: {xs: '5vw', lg: 10},
                    width: {
                      xs: '80vw',
                      sm: '50vw',
                      md: '33vw',
                      lg: '20vw',
                      xl: '14vw',
                    },
                    height: '100%',
                    mr: index === LAST_INDEX_DAY_OF_WEEK
                        ? {xs: '5vw', lg: 10}
                        : 0,
                  }}
                  featured={featuredDay === day}
                  sxCardMedia={{
                    height: 'calc(75dvh - 56px)',
                    position: 'relative',
                    p: 2,
                  }}
                  day={day}
                  mealDay={mealWeek[day as keyof MealWeakInterface]}
                  onMealClick={handleMealClickWrapper}
              />
          ))}
        </ScrollMenu>
        {<NewMealDialog
            fullScreen={fullScreen}
            open={mealPlaceInUpdate !== undefined}
            handleDelete={() => {}}
            handleSave={(mealPlaceUpdated: MealUpdate) => {
              onMealDialogSave(mealPlaceInUpdate, mealPlaceUpdated);
            }}
        />}
      </Box>
  );
}

function onWheel(apiObj: scrollVisibilityApiType, ev: React.WheelEvent): void {
  const isThouchpad = Math.abs(ev.deltaX) !== 0 || Math.abs(ev.deltaY) < 15;

  if (isThouchpad) {
    ev.stopPropagation();
    return;
  }

  if (ev.deltaY < 0 || ev.deltaX > 0) {
    apiObj.scrollNext();
  } else if (ev.deltaY > 0 || ev.deltaY < 0) {
    apiObj.scrollPrev();
  }
}

export default MealWeek;
