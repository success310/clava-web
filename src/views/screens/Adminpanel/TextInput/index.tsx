import React, {
  ChangeEventHandler,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from 'react';
import { FormGroup, Input, Label } from 'reactstrap';
import { translate, TranslatorKeys } from '../../../../config/translator';
import { ClavaContext } from '../../../../config/contexts';

type TextInputProps<T extends string | number> = {
  value: T;
  onChange: (text: T) => void;
  name: string;
  multiline?: boolean;
  disabled?: boolean;
  onFocus?: (index: number | undefined) => void;
  isFocused?: boolean;
  index?: number;
  label: TranslatorKeys;
};

function TextInput<T extends string | number>({
  label,
  name,
  value,
  onChange,
  index,
  onFocus,
  isFocused,
  multiline,
  disabled,
}: TextInputProps<T>) {
  const { l } = useContext(ClavaContext);

  const inputElem = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (isFocused && inputElem.current) inputElem.current.focus();
  }, [isFocused]);
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

  const onFocusCont = useCallback(() => {
    if (onFocus) {
      onFocus(index);
    }
  }, [index, onFocus]);
  return (
    <FormGroup>
      <Label htmlFor={name}>{translate(label, l)}</Label>
      <Input
        tabIndex={0}
        type={
          typeof value === 'number' ? 'number' : multiline ? 'textarea' : 'text'
        }
        disabled={disabled}
        value={value}
        onFocus={onFocusCont}
        autoFocus={isFocused}
        name={name}
        innerRef={inputElem}
        id={name}
        onChange={onValueChange}
      />
    </FormGroup>
  );
}

TextInput.defaultProps = {
  multiline: false,
  isFocused: false,
  onFocus: undefined,
  index: undefined,
  disabled: false,
};

export default TextInput;
// reloa d
