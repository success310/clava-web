import React, { useCallback, useState } from 'react';
import { faCalendar } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Calendar, { CalendarTileProperties, ViewCallback } from 'react-calendar';
import { DAY_IN_MS, dayToNumber } from '../../../../config/utils';

type MonthData = { month: number; year: number; dates: Date[] };

type ClavaCalendarProps = {
  months: MonthData[];
  onDaySelected: (date: Date | undefined) => void;
  loadMonth: (date: Date) => void;
  selectedDate: Date | undefined;
};

function isActive(months: MonthData[], day: Date) {
  return !!months.find(
    (m) =>
      m.month === day.getMonth() &&
      m.year === day.getFullYear() &&
      !!m.dates.find((d) => dayToNumber(d) === dayToNumber(day)),
  );
}

const ClavaCalendar: React.FC<ClavaCalendarProps> = ({
  months,
  onDaySelected,
  selectedDate,
  loadMonth,
}) => {
  const [open, setOpen] = useState(false);
  const onDayPress = useCallback(
    (date: Date) => {
      if (date && isActive(months, date)) {
        onDaySelected(date);
        setOpen(false);
      }
    },
    [months, onDaySelected],
  );
  const onOpenCalendar = useCallback(() => {
    setOpen(true);
  }, []);
  const renderTile = useCallback<
    (props: CalendarTileProperties) => JSX.Element | null
  >(
    ({ date, view }) => {
      if (view === 'month') {
        if (!isActive(months, date)) return <div className="disabled" />;
        return <div className="enabled" />;
      }
      return null;
    },
    [months],
  );
  const onActiveStartDateChange = useCallback<ViewCallback>(
    ({ action, activeStartDate, view }) => {
      if (
        (action === 'prev' ||
          action === 'prev2' ||
          action === 'next' ||
          action === 'next2') &&
        view === 'month'
      ) {
        loadMonth(new Date(activeStartDate.getTime() + DAY_IN_MS));
      }
    },
    [loadMonth],
  );
  /* const onMonthChanged = useCallback<DateCallback>(
    (value) => {
      if (view === 'month') {
        loadMonth(new Date(activeStartDate.getTime() + DAY_IN_MS));
      }
    },
    [loadMonth],
  );*/
  return (
    <div className="clava-calendar-container">
      <button type="button" className="label" onClick={onOpenCalendar}>
        <FontAwesomeIcon icon={faCalendar} />
      </button>
      {open && (
        <div className="react-calendar-container">
          <Calendar
            onClickDay={onDayPress}
            value={selectedDate}
            tileContent={renderTile}
            onActiveStartDateChange={onActiveStartDateChange}
            /*   onClickMonth={onMonthChanged}*/
          />
        </div>
      )}
    </div>
  );
};

export default ClavaCalendar;
// relo ad
