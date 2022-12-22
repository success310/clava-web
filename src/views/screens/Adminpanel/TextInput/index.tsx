import React, { ChangeEventHandler, useCallback, useContext } from 'react';
import { FormGroup, Input, Label } from 'reactstrap';
import { translate, TranslatorKeys } from '../../../../config/translator';
import { ClavaContext } from '../../../../config/contexts';

type TextInputProps<T extends string | number> = {
  value: T;
  onChange: (text: T) => void;
  name: string;
  multiline?: boolean;
  label: TranslatorKeys;
};

function TextInput<T extends string | number>({
  label,
  name,
  value,
  onChange,
  multiline,
}: TextInputProps<T>) {
  const { l } = useContext(ClavaContext);

  const onValueChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (e) => {
      onChange(
        (typeof value === 'number'
          ? parseInt(e.target.value, 10)
          : e.target.value) as T,
      );
    },
    [onChange],
  );
  return (
    <FormGroup>
      <Label htmlFor={name}>{translate(label, l)}</Label>
      <Input
        type={
          typeof value === 'number' ? 'number' : multiline ? 'textarea' : 'text'
        }
        value={value}
        name={name}
        id={name}
        onChange={onValueChange}
      />
    </FormGroup>
  );
}

TextInput.defaultProps = {
  multiline: false,
};

export default TextInput;
