import React from 'react';

type Item<T> = {
  label: string;
  value: T;
};

function ClavaSwitch<T>({
  items,
  value,
  onChange,
}: {
  items: Item<T>[];
  value: T;
  onChange: (value: T) => void;
}) {
  return (
    <div className="clava-switch">
      {items.map((item) => (
        <button
          key={`clava-swich-elem-${item.value}`}
          type="button"
          onClick={() => {
            onChange(item.value);
          }}
          className={`clava-switch-elem${
            value === item.value ? ' selected' : ''
          }`}>
          <span>{item.label}</span>
        </button>
      ))}
    </div>
  );
}

export default ClavaSwitch;
