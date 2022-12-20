import { DateTimeFormat } from 'intl';
import React, { useContext, useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import { useParams } from 'react-router';
import { translate } from '../../../../config/translator';
import { dayToNumber, intlLang, numberToDay } from '../../../../config/utils';
import { ClavaContext } from '../../../../config/contexts';
import { parseParams } from '../../../../config/routes';

export declare type MatchDayContextType = {
  disabled: boolean;
};
export const MatchDaysContext = React.createContext<MatchDayContextType>({
  disabled: false,
});

export const EARLIER_DAY = 19700001;
export const LATER_DAY = 99990001;
export const SELECTED_DAY = 1000000000;
type MatchDayProps = { day: number; live?: boolean };
const MatchDayElement: React.ComponentType<MatchDayProps> = ({ day, live }) => {
  const { l } = useContext(ClavaContext);
  const { disabled } = useContext(MatchDaysContext);
  const params = useParams();
  const isSelected = useMemo(
    () => day > SELECTED_DAY && !disabled,
    [disabled, day],
  );
  const realDay = useMemo(
    () => (day > SELECTED_DAY ? day - SELECTED_DAY : day),
    [day],
  );

  const todayNumber = dayToNumber(new Date());

  const isToday = useMemo(
    () => realDay === todayNumber,
    [realDay, todayNumber],
  );
  const isTomorrow = useMemo(
    () => realDay === todayNumber + 1,
    [realDay, todayNumber],
  );
  const isYesterday = useMemo(
    () => realDay === todayNumber - 1,
    [realDay, todayNumber],
  );

  const [w, date] = useMemo(() => {
    let weekday = DateTimeFormat(intlLang(l), {
      weekday: 'short',
    }).format(numberToDay(realDay));
    if (isToday) weekday = translate('today', l);
    if (isTomorrow) weekday = translate('tomorrow', l);
    if (isYesterday) weekday = translate('yesterday', l);
    const dateStr = ` ${DateTimeFormat(intlLang(l), {
      day: '2-digit',
      month: '2-digit',
    })
      .format(numberToDay(realDay))
      .replace('.', '/')}`;
    return [weekday, l === 'de' ? dateStr.slice(0, -1) : dateStr];
  }, [realDay, isToday, isTomorrow, isYesterday, l]);
  return (
    <NavLink
      to={parseParams(
        {
          date: day,
          matchId: undefined,
          view: undefined,
        },
        params,
      )}
      className="matchday"
      data-date={day.toString(10)}>
      <span
        className={
          isSelected ? 'text-primary bold' : live ? 'text-live bold' : ''
        }>
        {w}
        {!!date && <br />}
        {date}
      </span>
    </NavLink>
  );
};

MatchDayElement.defaultProps = {
  live: false,
};

export default MatchDayElement;
// reload
