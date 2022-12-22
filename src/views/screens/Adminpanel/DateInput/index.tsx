import React, { ChangeEventHandler, useCallback, useContext } from 'react';
import { FormGroup, Input, InputGroup, Label } from 'reactstrap';
import { faCalendar } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { translate, TranslatorKeys } from '../../../../config/translator';
import { ClavaContext } from '../../../../config/contexts';
import { formatDate } from '../../../../config/utils';

const DateInput: React.FC<{
  value: Date;
  onChange: (date: Date) => void;
  name: string;
  label: TranslatorKeys;
  type: 'date' | 'datetime' | 'time';
}> = ({ label, name, type, value, onChange }) => {
  const { l } = useContext(ClavaContext);

  const onValueChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (e) => {
      onChange(new Date(e.target.value));
    },
    [onChange],
  );
  return (
    <FormGroup>
      <Label htmlFor={name}>{translate(label, l)}</Label>
      <InputGroup>
        <Input
          type={type}
          value={formatDate(
            value,
            l,
            true,
            type === 'time',
            type === 'date',
            false,
          )}
          name={name}
          id={name}
          onChange={onValueChange}
        />
        <div className="input-group-addon transparent-pointer">
          <FontAwesomeIcon icon={faCalendar} />
        </div>
      </InputGroup>
    </FormGroup>
  );
};

export default DateInput;
// reload
