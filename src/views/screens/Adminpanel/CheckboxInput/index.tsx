import React, { ChangeEventHandler, useCallback, useContext } from 'react';
import { FormGroup, Input, InputGroup, Label } from 'reactstrap';
import {
  showTranslated,
  Translatable,
  translate,
  TranslatorKeys,
} from '../../../../config/translator';
import { ClavaContext } from '../../../../config/contexts';

const CheckboxInput: React.FC<{
  value: boolean;
  disabled?: boolean;
  onChange: (checked: boolean) => void;
  name: string;
  label: TranslatorKeys | Translatable;
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
          checked={value}
          name={name}
          id={name}
          disabled={disabled}
          onChange={onValueChange}
          className="me-3"
        />
        <Label htmlFor={name}>
          {typeof label === 'object'
            ? 'name' in label
              ? showTranslated(label.name, l)
              : label.customName
            : translate(label, l)}
        </Label>
      </InputGroup>
    </FormGroup>
  );
};

CheckboxInput.defaultProps = { disabled: false };

export default CheckboxInput;
// reload
