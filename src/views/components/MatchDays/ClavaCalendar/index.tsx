import React, { useCallback } from 'react';

type ClavaCalendarProps = {
  months: { month: number; year: number; dates: Date[] }[];
  onDaySelected: (date: Date | undefined) => void;
  loadMonth: (date: Date) => void;
  selectedDate: Date | undefined;
};

const ClavaCalendar: React.FC<ClavaCalendarProps> = ({
  months,
  onDaySelected,
  selectedDate,
  loadMonth,
}) => {
  const onDayPress = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    (e) => {
      const date = e.target.valueAsDate;
      if (date) onDaySelected(date);
    },
    [onDaySelected],
  );
  return (
    <input
      type="date"
      className="clava-calendar"
      onChange={onDayPress}
      value={selectedDate?.toISOString()}
    />
  );
};

export default ClavaCalendar;
