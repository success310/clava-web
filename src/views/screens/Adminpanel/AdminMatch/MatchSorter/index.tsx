import React, {
  KeyboardEvent,
  MouseEvent,
  useCallback,
  useContext,
} from 'react';
import { faCaretDown, faCaretUp } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SortDirections, SortTypes } from '../types';
import { translate, TranslatorKeys } from '../../../../../config/translator';
import { ClavaContext } from '../../../../../config/contexts';

type MatchSorterProps = {
  by: SortTypes;
  title: TranslatorKeys;
  onSort: (by: SortTypes, direction: SortDirections) => void;
  currentDirection: SortDirections;
  currentSorted: SortTypes;
};

const MatchSorter: React.FC<MatchSorterProps> = ({
  onSort,
  currentDirection,
  title,
  by,
  currentSorted,
}) => {
  const { l } = useContext(ClavaContext);

  const onSortASC = useCallback(
    (event?: KeyboardEvent<HTMLDivElement> | MouseEvent<HTMLDivElement>) => {
      if (
        !event ||
        'button' in event ||
        ('key' in event && event.key === 'Space')
      )
        onSort(by, 'ASC');
    },
    [onSort, by],
  );
  const onSortDESC = useCallback(
    (event?: KeyboardEvent<HTMLDivElement> | MouseEvent<HTMLDivElement>) => {
      if (
        !event ||
        'button' in event ||
        ('key' in event && event.key === 'Space')
      )
        onSort(by, 'DESC');
    },
    [onSort, by],
  );
  const onSortCont = useCallback(() => {
    if (
      (currentDirection === 'ASC' && currentSorted === by) ||
      currentSorted !== by
    )
      onSortDESC();
    else onSortASC();
  }, [by, currentDirection, onSortASC, onSortDESC, currentSorted]);
  return (
    <div
      role="button"
      tabIndex={0}
      title={translate(title, l)}
      className="match-sorter"
      onClick={onSortCont}
      onKeyPress={onSortCont}>
      <span>{translate(title, l)}</span>
      <div className={`arrows ${currentSorted === by ? 'selected' : ''}`}>
        <div
          role="button"
          tabIndex={0}
          className={`sort-up ${currentDirection === 'ASC' ? 'selected' : ''}`}
          onClick={onSortASC}
          onKeyPress={onSortASC}>
          <FontAwesomeIcon
            icon={faCaretUp}
            fillRule="evenodd"
            fillOpacity={1}
          />
        </div>

        <div
          role="button"
          tabIndex={0}
          className={`sort-down ${
            currentDirection === 'DESC' ? 'selected' : ''
          }`}
          onClick={onSortDESC}
          onKeyPress={onSortASC}>
          <FontAwesomeIcon
            icon={faCaretDown}
            fillRule="nonzero"
            fillOpacity={1}
          />
        </div>
      </div>
    </div>
  );
};

export default MatchSorter;
// relo ad
