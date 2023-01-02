import React, { useCallback, useContext, useMemo, useState } from 'react';
import { Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/pro-regular-svg-icons';
import {
  showTranslated,
  Translatable,
  translate,
  TranslatorKeys,
} from '../../../../config/translator';
import { IDType } from '../../../../config/types';
import { ClavaContext } from '../../../../config/contexts';

export declare type Item = {
  key: number | string;
  label: string;
  value: string;
};
type PickerBaseProps = {
  value?: string;
  disabled?: boolean;
  disabledMsg?: string;
  items: Item[];
  onValueChange: (value: string) => void;
  small?: boolean;
  big?: boolean;
};

const ClavaPickerOption: React.FC<{
  item: Item;
  onPress: (value: string) => void;
}> = ({ item, onPress }) => {
  const onItemPress = useCallback(() => {
    onPress(item.value);
  }, [item.value, onPress]);
  const onKeyDown = useCallback<React.KeyboardEventHandler<HTMLSpanElement>>(
    (event) => {
      if (event.key === 'SPACE') onPress(item.value);
    },
    [onPress, item.value],
  );
  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div className="option" onClick={onItemPress} onKeyDown={onKeyDown}>
      {item.label}
    </div>
  );
};

const ClavaPickerBase: React.FC<PickerBaseProps> = ({
  disabled,
  onValueChange,
  value,
  big,
  items,
  disabledMsg,
  small,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const toggleOpen = useCallback(() => {
    if (!disabled) setOpen((o) => !o);
  }, [disabled]);
  return (
    <Button
      color="transparent"
      className={`picker  picker${
        small ? '-small' : big ? '-big' : disabled ? '-disabled' : '-default'
      } ${open ? 'open' : ' '}`}
      disabled={disabled}
      title={disabledMsg}
      onClick={toggleOpen}>
      {items.find((i) => i.value === value)?.label}
      <FontAwesomeIcon icon={open ? faChevronUp : faChevronDown} />
      <div className="options">
        {items.map((item) => (
          <ClavaPickerOption
            item={item}
            key={item.key}
            onPress={onValueChange}
          />
        ))}
      </div>
    </Button>
  );
};

ClavaPickerBase.defaultProps = {
  small: undefined,
  disabled: undefined,
  disabledMsg: undefined,
  value: undefined,
  big: undefined,
};
const PickerBase = ClavaPickerBase;

type MyPickerProps<T extends Translatable> = {
  withChoose?: boolean;
  customChooseMessage?: TranslatorKeys;
  itemsTranslatable: T[];
  submit: (value: T | undefined) => void;
  value?: IDType;
  disabled?: boolean;
  disabledMsg?: string;
  small?: boolean;
  big?: boolean;
};

function ClavaPickerTranslatable<T extends Translatable>({
  withChoose,
  submit,
  value,
  disabled,
  customChooseMessage,
  itemsTranslatable,
  disabledMsg,
  small,
  big,
}: MyPickerProps<T>): JSX.Element {
  const { l } = useContext(ClavaContext);
  const finalItems = useMemo(() => {
    const chooseItem: Item[] = withChoose
      ? [
          {
            label: translate(customChooseMessage ?? 'choose_picker', l),
            value: '-1',
            key: -1,
          },
        ]
      : [];
    let f: Item[];
    if (itemsTranslatable.length !== 0) {
      f = chooseItem.concat(
        itemsTranslatable.map((i: T) => ({
          label: 'name' in i ? showTranslated(i.name, l) : i.customName,
          value: i.id.toString(10),
          key: `trans-${i.id}`,
        })),
      );
    } else {
      f = chooseItem;
    }
    return f;
  }, [withChoose, customChooseMessage, l, itemsTranslatable]);
  const onValChanged = useCallback(
    (val: string) => {
      submit(itemsTranslatable.find((e) => e.id === parseInt(val, 10)));
    },
    [itemsTranslatable, submit],
  );
  return (
    <PickerBase
      onValueChange={onValChanged}
      items={finalItems}
      disabled={disabled}
      value={value ? value.toString(10) : '-1'}
      small={small}
      big={big}
      disabledMsg={disabledMsg}
    />
  );
}

ClavaPickerTranslatable.defaultProps = {
  value: undefined,
  withChoose: false,
  customChooseMessage: undefined,
  disabledMsg: undefined,
  disabled: undefined,
  small: undefined,
  big: undefined,
};

type PickerNormalProps = {
  withChoose?: boolean;
  big?: boolean;
  customChooseMessage?: TranslatorKeys;
} & PickerBaseProps;

function ClavaPickerNormal({
  onValueChange,
  items,
  disabled,
  value,
  withChoose,
  small,
  disabledMsg,
  big,
  customChooseMessage,
}: PickerNormalProps) {
  const { l } = useContext(ClavaContext);
  const finalItems = useMemo(() => {
    const chooseItem: Item[] = withChoose
      ? [
          {
            label: translate(customChooseMessage ?? 'choose_picker', l),
            value: '-1',
            key: -1,
          },
        ]
      : [];
    let f: Item[];
    if (items.length !== 0) {
      f = chooseItem.concat(items);
    } else {
      f = chooseItem;
    }
    return f;
  }, [withChoose, customChooseMessage, l, items]);

  return (
    <PickerBase
      big={big}
      onValueChange={onValueChange}
      items={finalItems}
      disabled={disabled}
      value={value}
      small={small}
      disabledMsg={disabledMsg}
    />
  );
}

ClavaPickerNormal.defaultProps = {
  withChoose: false,
  customChooseMessage: undefined,
  disabled: undefined,
  value: undefined,
  small: undefined,
  disabledMsg: undefined,
  big: undefined,
};

function ClavaPicker<T extends Translatable>(
  props: MyPickerProps<T> | PickerNormalProps,
) {
  if ('items' in props) return <ClavaPickerNormal {...props} />;
  return <ClavaPickerTranslatable {...props} />;
}

export default ClavaPicker;
