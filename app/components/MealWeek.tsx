'use client';
import React from 'react';
import {ScrollMenu, VisibilityContext} from 'react-horizontal-scrolling-menu';
import usePreventBodyScroll from '../lib/usePreventBodyScroll';
import MealDay from './MealDay';
import Box from '@mui/material/Box';
import {getFrenchDay} from '@/app/lib/getFrenchDay';
import Header from '@/app/components/Header';

type scrollVisibilityApiType = React.ContextType<typeof VisibilityContext>;
const getItems = () =>
    ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'];

interface MealWeekProps {
  meals?: string[];
  onDayClick?: (day: string) => void;
}
function MealWeek({}: MealWeekProps = {}) {
  const items = getItems();
  const {disableScroll, enableScroll} = usePreventBodyScroll();
  const featuredDay = getFrenchDay(new Date());
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
          {items.map((day, index) =>
                  <MealDay
                      key={index}
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
                        mr: index === items.length-1? {xs: '5vw', lg: 10}: 0,
                      }}
                      featured={featuredDay === day}
                      sxCardMedia={{height: 'calc(75dvh - 56px)', position: 'relative', p:2}}
                      meals={['chicken', 'salad']}
                      day={day}
                      onMealClick={(meal) => {}}/>,
          )}
        </ScrollMenu>
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
