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
} from '@/app/lib/MealWeek';
import {MealUpdate} from '@/app/lib/MealUpdate';
import {Meal} from '@/app/lib/Meal';
import {useMediaQuery} from '@mui/material';
import {useTheme} from '@mui/system';
import NewMealDialog from '@/app/components/NewMealDialog';

type scrollVisibilityApiType = React.ContextType<typeof VisibilityContext>;

interface MealWeekProps {
  mealWeek: MealWeakInterface;
  onUpdateMealWeek: (newMealWeek: MealWeakInterface) => void;
}

const LAST_INDEX_DAY_OF_WEEK = 6;

const MealWeek = ({mealWeek, onUpdateMealWeek}: MealWeekProps) => {
  const {disableScroll, enableScroll} = usePreventBodyScroll();
  const [mealPlaceInUpdate, setMealPlaceInUpdate] = React.useState<MealUpdate | undefined>();
  const featuredDay = getDay(new Date());
  const handleMealClickWrapper = (
      day: keyof MealWeakInterface,
      moment: keyof MealDayInterface,
      meal?: Meal | undefined) => {
    setMealPlaceInUpdate({day, moment, meal: meal});
  };

  const onMealDialogSave = (mealUpdated: Meal | undefined) => {
    if (mealPlaceInUpdate === undefined) {
      return;
    }
    //clone the week first
    const newMealWeek = {...mealWeek};
    //remove the old meal if exist
    if (mealPlaceInUpdate.meal !== undefined) {
      //erase the old first
      newMealWeek[mealPlaceInUpdate.day][mealPlaceInUpdate.moment] =
          mealWeek[mealPlaceInUpdate.day][mealPlaceInUpdate.moment].filter(
              mealFromMealWeek => mealFromMealWeek.name !==
                  mealPlaceInUpdate.meal?.name);
    }
    //add the new meal or the replaced meal
    if (mealUpdated !== undefined) {
      newMealWeek[mealPlaceInUpdate.day][mealPlaceInUpdate.moment].push(
          mealUpdated);
    }
    //as we have removed the old meal first, we are treated the deleted case
    //we send the week meal to the parent
    onUpdateMealWeek(newMealWeek);
    setMealPlaceInUpdate(undefined);
  };
  return (
      <>

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
      </Box>
        {
          <NewMealDialog
            open={mealPlaceInUpdate !== undefined}
            meal={mealPlaceInUpdate?.meal}
            handleClose={() => setMealPlaceInUpdate(undefined)}
            handleChange={(mealUpdated: Meal | undefined) => {
              onMealDialogSave(mealUpdated);
            }}
        />}
      </>
  );
};

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
