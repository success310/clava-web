import React, {
  ChangeEventHandler,
  useCallback,
  useContext,
  useRef,
} from 'react';
import { FormGroup, Input, InputGroup, Label } from 'reactstrap';
import { faCalendar, faHourglass } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { translate, TranslatorKeys } from '../../../../config/translator';
import { ClavaContext } from '../../../../config/contexts';
import { formatDate } from '../../../../config/utils';
import { LanguageLocaleEnum } from '../../../../client/api';

function formatDateForHtmlInput(date: Date | undefined): string | undefined {
  if (!date || Number.isNaN(date.getTime())) return undefined;
  return formatDate(date, LanguageLocaleEnum.DE, true, false, true, false);
}

function formatTimeForHtmlInput(date: Date | undefined): string | undefined {
  if (!date || Number.isNaN(date.getTime())) return undefined;
  return `${date.getHours().toString().padStart(2, '0')}:${date
    .getMinutes()
    .toString()
    .padStart(2, '0')}`;
}

const DateInput: React.FC<{
  value: Date;
  onChange: (date: Date) => void;
  disabled?: boolean;
  name: string;
  label: TranslatorKeys;
  type: 'date' | 'datetime' | 'time';
}> = ({ label, name, type, disabled, value, onChange }) => {
  const { l } = useContext(ClavaContext);
  const date = useRef(formatDateForHtmlInput(value));
  const time = useRef(formatTimeForHtmlInput(value));
  const onValueChange = useCallback(() => {
    const datestring =
      type === 'date'
        ? `${date.current}T12:00:00.000`
        : type === 'time'
        ? `2022-01-01T${time.current}:00.000`
        : `${date.current}T${time.current}:00.000`;
    onChange(new Date(datestring));
  }, [onChange, type]);
  const onDateChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (e) => {
      date.current = e.target.value;
      onValueChange();
    },
    [onValueChange],
  );
  const onTimeChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (e) => {
      time.current = e.target.value;
      onValueChange();
    },
    [onValueChange],
  );
  return (
    <FormGroup>
      <Label htmlFor={name}>{translate(label, l)}</Label>
      <InputGroup>
        <Input
          disabled={disabled}
          type={type === 'datetime' ? 'date' : type}
          value={type === 'time' ? time.current : date.current}
          name={name}
          id={name}
          onChange={type === 'time' ? onTimeChange : onDateChange}
        />
        {type === 'datetime' && (
          <div
            className={`input-group-addon transparent-pointer${
              disabled ? ' disabled' : ''
            }`}>
            <FontAwesomeIcon icon={faHourglass} />
          </div>
        )}
        <div
          className={`input-group-addon transparent-pointer${
            disabled ? ' disabled' : ''
          }`}>
          <FontAwesomeIcon icon={type === 'time' ? faHourglass : faCalendar} />
        </div>
        {type === 'datetime' && (
          <Input
            className="ms-1"
            type="time"
            disabled={disabled}
            value={time.current}
            name={`${name}2`}
            id={`${name}2`}
            onChange={onTimeChange}
          />
        )}
      </InputGroup>
    </FormGroup>
  );
};

DateInput.defaultProps = { disabled: false };

export default DateInput;
// rel ad
