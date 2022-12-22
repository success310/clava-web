import React, { ChangeEventHandler, useCallback, useContext } from 'react';
import { FormGroup, Input, Label } from 'reactstrap';
import { translate, TranslatorKeys } from '../../../../config/translator';
import { ClavaContext } from '../../../../config/contexts';

const TextInput: React.FC<{
  value: string;
  onChange: (text: string) => void;
  name: string;
  multiline?: boolean;
  label: TranslatorKeys;
}> = ({ label, name, value, onChange, multiline }) => {
  const { l } = useContext(ClavaContext);

  const onValueChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (e) => {
      onChange(e.target.value);
    },
    [onChange],
  );
  return (
    <FormGroup>
      <Label htmlFor={name}>{translate(label, l)}</Label>
      <Input
        type={multiline ? 'textarea' : 'text'}
        value={value}
        name={name}
        id={name}
        onChange={onValueChange}
      />
    </FormGroup>
  );
};

TextInput.defaultProps = {
  multiline: false,
};

export default TextInput;
