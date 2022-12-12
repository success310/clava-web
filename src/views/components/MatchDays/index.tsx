import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { ConnectedProps } from 'react-redux';
import { connector } from './redux';
import {
  dayToNumber,
  getClosestDate,
  numberToDay,
  sameDay,
} from '../../../config/utils';
import MatchDayElement, {
  EARLIER_DAY,
  LATER_DAY,
  MatchDayContextType,
  MatchDaysContext,
  SELECTED_DAY,
} from './MatchDay';
import Loading from '../Loading';
import ClavaCalendar from './ClavaCalendar';

const MatchDays: React.FC<ConnectedProps<typeof connector>> = ({
  matchDays,
  getToday,
  type,
  id,
  getBigger,
  getSmaller,
  getMonth,
  selectedDate,
  shouldScroll,
  disabled,
  setSelectedDate,
}) => {
  // TODO do wori des auf liga unpassn
  const scrollView = useRef<HTMLDivElement>(null);
  const initialOffset = useRef(-1);
  const swipeOffset = useRef(-1);
  const swipeStart = useRef(false);
  const nearestDate = useRef(new Date());

  useEffect(() => {
    if (matchDays.length === 0) {
      if (selectedDate) {
        setSelectedDate(undefined);
      }
      if (!selectedDate) getToday(id, type);
    }
  }, [getToday, id, matchDays.length, selectedDate, setSelectedDate, type]);
  useEffect(() => {
    if (!selectedDate && matchDays.length && !disabled) {
      const closest = getClosestDate(matchDays);
      nearestDate.current = closest;
      setSelectedDate(closest);
    }
  }, [setSelectedDate, matchDays.length, selectedDate, disabled]);

  const onLoadMonth = useCallback(
    (date: Date) => {
      getMonth(id, date, type);
    },
    [getMonth, id, type],
  );
  const months = useMemo(() => {
    // const now = new Date();
    //  const thisMonth = now.getMonth();
    //  const thisYear = now.getFullYear();
    const retval: { month: number; year: number; dates: Date[] }[] = [];
    matchDays.forEach((day) => {
      const dayMonth = day.getMonth();
      const dayYear = day.getFullYear();
      // if (dayMonth === thisMonth && dayYear === thisYear) return;
      let idx = -1;
      retval.forEach((m, index) => {
        if (m.month === dayMonth && m.year === dayYear) idx = index;
      });
      if (idx === -1)
        retval.push({ month: dayMonth, year: dayYear, dates: [day] });
      else retval[idx].dates.push(day);
    });
    return retval;
  }, [matchDays]);
  const onPressBigger = useCallback(() => {
    if (matchDays && matchDays.length)
      getBigger(id, matchDays[matchDays.length - 1], type);
  }, [matchDays, type, id]);
  const onPressSmaller = useCallback(() => {
    if (matchDays && matchDays.length) getSmaller(id, matchDays[0], type);
  }, [matchDays, type, id]);

  const customSelectDate = useCallback(
    (day: number) => {
      if (!swipeStart.current) {
        if (day === EARLIER_DAY) onPressSmaller();
        else if (day === LATER_DAY) onPressBigger();
        else {
          shouldScroll.current = true;
          setSelectedDate(numberToDay(day));
        }
      }
    },
    [onPressSmaller, onPressBigger],
  );

  const matchDaysRender = useMemo(
    () => [
      EARLIER_DAY,
      ...matchDays.map(
        (d) =>
          dayToNumber(d) +
          (selectedDate && sameDay(d, selectedDate) ? SELECTED_DAY : 0),
      ),
      LATER_DAY,
    ],
    [matchDays, selectedDate],
  );
  const matchDaysContextVal = useMemo<MatchDayContextType>(
    () => ({
      disabled,
      selectDate: customSelectDate,
    }),
    [disabled, customSelectDate],
  );
  useEffect(() => {
    requestAnimationFrame(() => {
      if (scrollView.current && selectedDate) {
        const buttons = document.getElementsByClassName('matchday');
        for (let i = 0; i < buttons.length; i++) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          const item: HTMLButtonElement | null = buttons.item(i);

          if (
            item &&
            parseInt(item.getAttribute('data-date') ?? '-1', 10) ===
              dayToNumber(selectedDate) + SELECTED_DAY
          ) {
            scrollView.current.scrollTo({
              left:
                item.offsetLeft -
                scrollView.current.clientWidth / 2 +
                item.clientWidth / 2,
              top: 0,
              behavior: 'smooth',
            });
            break;
          }
        }
      }
    });
  }, [selectedDate]);
  const onSwipe = useCallback((e: MouseEvent) => {
    if (swipeStart.current && scrollView.current) {
      swipeOffset.current = initialOffset.current - e.clientX;
      initialOffset.current = e.clientX;
      scrollView.current.scrollBy({
        left: swipeOffset.current,
        top: 0,
        behavior: 'auto',
      });
    }
  }, []);
  const onSwipeEnd = useCallback(() => {
    swipeStart.current = false;
    document.removeEventListener('mousemove', onSwipe);
    //  document.removeEventListener('touchmove', onSwipe);
    document.removeEventListener('mouseup', onSwipeEnd);
    //    document.removeEventListener('touchend', onSwipeEnd);
  }, [onSwipe]);
  const onSwipeStart = useCallback<React.MouseEventHandler>(
    (e) => {
      const timeout = setTimeout(() => {
        swipeStart.current = true;
        initialOffset.current = e.clientX;
        document.addEventListener('mousemove', onSwipe);
        //    document.addEventListener('touchmove', onSwipe);
        document.addEventListener('mouseup', onSwipeEnd);
        //  document.addEventListener('touchend', onSwipeEnd);
      }, 200);
      document.addEventListener(
        'mouseup',
        () => {
          clearTimeout(timeout);
        },
        { once: true },
      );
    },
    [onSwipe, onSwipeEnd],
  );

  return (
    <div className="matchdays-container">
      <MatchDaysContext.Provider value={matchDaysContextVal}>
        <div className="today">
          <MatchDayElement day={dayToNumber(nearestDate.current)} live />
        </div>
        {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
        <div className="matchdays" ref={scrollView} onMouseDown={onSwipeStart}>
          {matchDays.length === 0 ? (
            <Loading small />
          ) : (
            matchDaysRender.map((md) => (
              <MatchDayElement day={md} key={`match-day-${md}`} />
            ))
          )}
        </div>
        <ClavaCalendar
          months={months}
          onDaySelected={setSelectedDate}
          loadMonth={onLoadMonth}
          selectedDate={selectedDate}
        />
      </MatchDaysContext.Provider>
    </div>
  );
};
// r elad

export default connector(MatchDays);
