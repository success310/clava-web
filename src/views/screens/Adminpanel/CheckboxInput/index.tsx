import React, { ChangeEventHandler, useCallback, useContext } from 'react';
import { FormGroup, Input, InputGroup, Label } from 'reactstrap';
import { translate, TranslatorKeys } from '../../../../config/translator';
import { ClavaContext } from '../../../../config/contexts';

const CheckboxInput: React.FC<{
  value: boolean;
  disabled?: boolean;
  onChange: (checked: boolean) => void;
  name: string;
  label: TranslatorKeys;
}> = ({ label, name, value, disabled, onChange }) => {
  const { l } = useContext(ClavaContext);

  const onValueChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (e) => {
      onChange(e.target.checked);
    },
    [onChange],
  );
  return (
    <FormGroup>
      <InputGroup>
        <Input
          type="checkbox"
          value={value ? 'on' : 'off'}
          name={name}
          id={name}
          disabled={disabled}
          onChange={onValueChange}
          className="me-3"
        />
        <Label htmlFor={name}>{translate(label, l)}</Label>
      </InputGroup>
    </FormGroup>
  );
};

CheckboxInput.defaultProps = { disabled: false };

export default CheckboxInput;
// reload
