import React, {
  ChangeEventHandler,
  KeyboardEventHandler,
  useCallback,
  useContext,
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
  | MatchListElement;

type SearchInputProps<T extends Searchable> = {
  value: string;
  searching: boolean;
  disabled?: boolean;
  onChange: (text: string) => void;
  label: TranslatorKeys;
  items: T[];
  onSelect: (item: T | undefined) => void;
};

function SearchInput<T extends Searchable>({
  label,
  searching,
  items,
  onSelect,
  value,
  disabled,
  onChange,
}: SearchInputProps<T>) {
  const { l } = useContext(ClavaContext);
  const selected = useRef<Searchable>();
  const onValueChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (e) => {
      onChange(e.target.value);
    },
    [onChange],
  );
  const onClickItem = useCallback(
    (id: IDType) => {
      selected.current = items.find((i) => i.id === id);
      onSelect(items.find((i) => i.id === id));
    },
    [items, onSelect],
  );
  const onReset = useCallback(() => {
    onChange('');
    selected.current = undefined;
    onSelect(undefined);
  }, [onChange, onSelect]);
  const onKeyDownHandler = useCallback<KeyboardEventHandler<HTMLInputElement>>(
    (e) => {
      if (e.key === 'Backspace' && selected.current) {
        selected.current = undefined;
        onSelect(undefined);
      }
    },
    [onSelect],
  );
  return (
    <FormGroup>
      <Label htmlFor={`search${label}`}>{translate(label, l)}</Label>
      <InputGroup className={searching ? 'searching' : ''}>
        <Input
          disabled={disabled}
          type="text"
          value={
            selected.current
              ? `[${selected.current.id}] ${
                  'username' in selected.current
                    ? selected.current.username
                    : 'title' in selected.current
                    ? showTranslated(selected.current.title, l)
                    : 'fileMobile' in selected.current
                    ? selected.current.name
                    : 'team1' in selected.current
                    ? `${showTranslated(
                        selected.current.team1.name,
                        l,
                      )} - ${showTranslated(selected.current.team2.name, l)}`
                    : `${showTranslated(selected.current.name, l)} ${
                        'leagues' in selected.current &&
                        selected.current.leagues &&
                        getMainLeague(selected.current.leagues)
                          ? `( ${selected.current.leagues
                              .map(
                                (leag) =>
                                  `[${leag.id}] ${showTranslated(
                                    leag.name,
                                    l,
                                  )}`,
                              )
                              .join(', ')} )`
                          : ''
                      }`
                }`
              : value
          }
          name={`search${label}`}
          id={`search${label}`}
          onChange={onValueChange}
          onKeyDown={onKeyDownHandler}
        />
        <div className="input-group-addon refreshing">
          <FontAwesomeIcon icon={faRefresh} />
        </div>
      </InputGroup>
      {!!items.length && !selected.current && (
        <div className="search-addon">
          {items.map((i) => (
            <button
              key={`search-result-${i.id}`}
              type="button"
              onClick={() => {
                onClickItem(i.id);
              }}>
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
                  : `${showTranslated(i.name, l)} ${
                      'leagues' in i && i.leagues && getMainLeague(i.leagues)
                        ? `( ${i.leagues
                            .map(
                              (leag) =>
                                `[${leag.id}] ${showTranslated(leag.name, l)}`,
                            )
                            .join(', ')} )`
                        : ''
                    }`}
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
SearchInput.defaultProps = { disabled: false };

export default SearchInput;
// reload
