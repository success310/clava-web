import React, {
  ChangeEventHandler,
  KeyboardEventHandler,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from 'react';
import { Button, FormGroup, Input, InputGroup, Label } from 'reactstrap';
import { faRefresh } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  showTranslated,
  translate,
  TranslatorKeys,
} from '../../../../config/translator';
import { ClavaContext } from '../../../../config/contexts';
import {
  Ad,
  Blog,
  ExternalVideo,
  LeagueListElement,
  Location,
  MatchListElement,
  TeamListElement,
  Translation,
  User,
} from '../../../../client/api';
import { IDType } from '../../../../config/types';
import { getMainLeague } from '../../../../config/utils';

type Searchable =
  | TeamListElement
  | Ad
  | LeagueListElement
  | Location
  | Blog
  | ExternalVideo
  | User
  | MatchListElement
  | { id: IDType; name: Translation };

type SearchInputProps<T extends Searchable> = {
  value: string;
  searching: boolean;
  disabled?: boolean;
  onChange: (text: string) => void;
  label: TranslatorKeys;
  selectedItem?: T | undefined;
  name: string;
  items: T[];
  onFocus?: (index: number | undefined) => void;
  isFocused?: boolean;
  index?: number;
  className?: string;
  onSelect: (item: T | undefined) => void;
};

function SearchInput<T extends Searchable>({
  label,
  searching,
  items,
  onFocus,
  isFocused,
  onSelect,
  value,
  className,
  index,
  selectedItem,
  name,
  disabled,
  onChange,
}: SearchInputProps<T>) {
  const { l } = useContext(ClavaContext);
  const inputElem = useRef<HTMLInputElement>(null);
  const preventSearch = useRef(false);
  useEffect(() => {
    if (isFocused && inputElem.current) inputElem.current.focus();
  }, [isFocused]);
  const onValueChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (e) => {
      if (preventSearch.current) preventSearch.current = false;
      else onChange(e.target.value);
    },
    [onChange],
  );
  const onClickItem = useCallback(
    (id: IDType) => {
      onSelect(items.find((i) => i.id === id));
    },
    [items, onSelect],
  );
  const onReset = useCallback(() => {
    onChange('');
    onSelect(undefined);
  }, [onChange, onSelect]);
  const onKeyDownHandler = useCallback<KeyboardEventHandler<HTMLInputElement>>(
    (e) => {
      if (e.key === 'Backspace' && selectedItem) {
        preventSearch.current = true;
        onSelect(undefined);
        onChange(value.slice(0, -1));
      }
    },
    [onChange, onSelect, selectedItem, value],
  );
  const onFocusCont = useCallback(() => {
    if (onFocus) {
      onFocus(index);
    }
  }, [index, onFocus]);
  return (
    <FormGroup>
      <Label htmlFor={`search${name}`} className={className}>
        {translate(label, l)}
      </Label>
      <InputGroup className={searching && isFocused ? 'searching' : ''}>
        <Input
          onFocus={onFocusCont}
          autoFocus={isFocused}
          tabIndex={0}
          className={
            (selectedItem ? 'text-white' : 'text-white-50') + className
          }
          disabled={disabled}
          innerRef={inputElem}
          title={
            selectedItem &&
            'leagues' in selectedItem &&
            selectedItem.leagues &&
            getMainLeague(selectedItem.leagues)
              ? selectedItem.leagues
                  .map((leag) => `[${leag.id}] ${showTranslated(leag.name, l)}`)
                  .join(', ')
              : ''
          }
          type="text"
          value={
            selectedItem
              ? `[${selectedItem.id}] ${
                  'username' in selectedItem
                    ? selectedItem.username
                    : 'title' in selectedItem
                    ? showTranslated(selectedItem.title, l)
                    : 'fileMobile' in selectedItem
                    ? selectedItem.name + selectedItem
                    : 'team1' in selectedItem
                    ? `${showTranslated(
                        selectedItem.team1.name,
                        l,
                      )} - ${showTranslated(selectedItem.team2.name, l)}`
                    : showTranslated(selectedItem.name, l)
                }`
              : value
          }
          name={`search${name}`}
          id={`search${name}`}
          onChange={onValueChange}
          onKeyDown={onKeyDownHandler}
        />
        <div className="input-group-addon refreshing">
          <FontAwesomeIcon icon={faRefresh} />
        </div>
      </InputGroup>
      {!!items.length && !selectedItem && isFocused && (
        <div className="search-addon">
          {items.map((i) => (
            <button
              key={`search-result${name}-${i.id}`}
              type="button"
              onClick={() => {
                onClickItem(i.id);
              }}
              title={
                'leagues' in i && i.leagues && getMainLeague(i.leagues)
                  ? i.leagues
                      .map(
                        (leag) =>
                          `[${leag.id}] ${showTranslated(leag.name, l)}`,
                      )
                      .join(', ')
                  : ''
              }>
              <span className="id">[{i.id}]</span>
              <span>
                {'username' in i
                  ? i.username
                  : 'title' in i
                  ? showTranslated(i.title, l)
                  : 'fileMobile' in i
                  ? i.name
                  : 'team1' in i
                  ? `${showTranslated(i.team1.name, l)} - ${showTranslated(
                      i.team2.name,
                      l,
                    )}`
                  : showTranslated(i.name, l)}
              </span>
            </button>
          ))}
        </div>
      )}
      <Button
        type="button"
        onClick={onReset}
        color="secondary"
        className="reset-form">
        <span>{translate('reset', l)}</span>
      </Button>
    </FormGroup>
  );
}

SearchInput.defaultProps = {
  disabled: false,
  isFocused: false,
  index: undefined,
  className: undefined,
  onFocus: undefined,
  selectedItem: undefined,
};

export default SearchInput;
// reload
