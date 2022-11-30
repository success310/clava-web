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
  const scrollView = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (matchDays.length === 0) {
      if (selectedDate) setSelectedDate(undefined);
      if (!selectedDate) getToday(id, type);
    }
  }, [getToday, id, matchDays.length, selectedDate, setSelectedDate, type]);

  useEffect(() => {
    if (!selectedDate && matchDays.length && !disabled) {
      const closest = getClosestDate(matchDays);
      setSelectedDate(closest);
    }
  }, [setSelectedDate, matchDays, selectedDate, disabled]);
  const selectedPos = useMemo(() => {
    if (!selectedDate) return 0;
    const idx = matchDays.findIndex(
      (day) => day.getTime() === selectedDate.getTime(),
    );
    if (idx === -1) {
      const closest = getClosestDate(matchDays);
      return matchDays.findIndex((day) => day.getTime() === closest.getTime());
    }
    return idx;
  }, [selectedDate, matchDays]);
  const scroll = useCallback(() => {
    requestAnimationFrame(() => {
      if (scrollView.current) {
        scrollView.current.scrollTo({
          top: 0,
          left: selectedPos * 70,
          behavior: 'smooth',
        });
      }
    });
  }, [selectedPos]);

  useEffect(() => {
    if (shouldScroll.current) {
      shouldScroll.current = false;
      scroll();
    }
  }, [scroll, shouldScroll]);

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
      if (day === EARLIER_DAY) onPressSmaller();
      else if (day === LATER_DAY) onPressBigger();
      else {
        shouldScroll.current = true;
        setSelectedDate(numberToDay(day));
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
  return (
    <div className="matchdays-container">
      <div className="matchdays">
        {matchDays.length === 0 ? (
          <Loading small />
        ) : (
          <MatchDaysContext.Provider value={matchDaysContextVal}>
            {matchDaysRender.map((md) => (
              <MatchDayElement day={md} />
            ))}
          </MatchDaysContext.Provider>
        )}
      </div>
      <ClavaCalendar
        months={months}
        onDaySelected={setSelectedDate}
        loadMonth={onLoadMonth}
        selectedDate={selectedDate}
      />
    </div>
  );
};
// relo ad

export default connector(MatchDays);
