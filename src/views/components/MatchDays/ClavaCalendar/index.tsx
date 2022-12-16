import React, { useCallback, useState } from 'react';
import { faCalendar } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Calendar, { CalendarTileProperties, ViewCallback } from 'react-calendar';
import { useNavigate, useParams } from 'react-router';
import { DAY_IN_MS, dayToNumber } from '../../../../config/utils';
import { parseParams } from '../../../../config/routes';

type MonthData = { month: number; year: number; dates: Date[] };

type ClavaCalendarProps = {
  months: MonthData[];
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
  selectedDate,
  loadMonth,
}) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const params = useParams();
  const onDayPress = useCallback(
    (date: Date) => {
      if (date && isActive(months, date)) {
        navigate(
          parseParams({
            ...params,
            date: dayToNumber(date),
            matchId: undefined,
            view: undefined,
          }),
        );
        setOpen(false);
      }
    },
    [months, navigate],
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
// rel o ad
