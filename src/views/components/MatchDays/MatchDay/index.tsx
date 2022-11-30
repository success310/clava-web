import { DateTimeFormat } from 'intl';
import React, { useCallback, useContext, useMemo } from 'react';
import { translate } from '../../../../config/translator';
import { dayToNumber, intlLang, numberToDay } from '../../../../config/utils';
import { ClavaContext } from '../../../../config/contexts';

export declare type MatchDayContextType = {
  disabled: boolean;
  selectDate: (day: number) => void;
};
export const MatchDaysContext = React.createContext<MatchDayContextType>({
  disabled: false,
  selectDate: () => {
    // nothing
  },
});

export const EARLIER_DAY = 19700001;
export const LATER_DAY = 99990001;
export const SELECTED_DAY = 1000000000;

const MatchDayElement: React.ComponentType<{ day: number }> = ({ day }) => {
  const { l } = useContext(ClavaContext);
  const { disabled, selectDate } = useContext(MatchDaysContext);
  const isSelected = useMemo(
    () => day > SELECTED_DAY && !disabled,
    [disabled, day],
  );
  const realDay = useMemo(
    () => (day > SELECTED_DAY ? day - SELECTED_DAY : day),
    [day],
  );
  const onPress = useCallback(() => {
    if (!isSelected) {
      requestAnimationFrame(() => {
        selectDate(realDay);
      });
    }
  }, [realDay, isSelected, selectDate]);
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
    if (realDay === EARLIER_DAY) return [translate('earlier', l), null];
    if (realDay === LATER_DAY) return [translate('later', l), null];
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
    <button type="button" onClick={onPress} className="matchDay">
      <span className={isSelected ? 'text-primary' : ''}>
        {w}
        {!!date && <br />}
        {date}
      </span>
    </button>
  );
};

export default MatchDayElement;
