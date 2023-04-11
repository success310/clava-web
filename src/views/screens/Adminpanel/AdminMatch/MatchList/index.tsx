import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Button, Col, Label, Row } from 'reactstrap';
import { faPlus } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import BulkMatchRow from '../BulkMatchRow';
import { MatchChange, SortDirections, SortTypes } from '../types';
import { getMatchDate } from '../../../../../config/utils';
import { showTranslated, translate } from '../../../../../config/translator';
import { Match, MatchListElement } from '../../../../../client/api';
import { ClavaContext } from '../../../../../config/contexts';

type MatchListProps = {
  matches: Match[] | MatchListElement[];
  selectedMatches: number[];
  selectMatch: (index: number) => void;
  addChange: (c: MatchChange) => void;
  changes: MatchChange[];
};

const MatchList: React.FC<MatchListProps> = ({
  matches,
  selectedMatches,
  addChange,
  changes,
  selectMatch,
}) => {
  const { l } = useContext(ClavaContext);
  const [sortDirection, setSortDirection] = useState<SortDirections>('DESC');
  const [sortType, setSortType] = useState<SortTypes>('none');
  const [newRows, setNewRos] = useState<number[]>([]);
  useEffect(() => {
    if (changes.length === 0) {
      setNewRos([]);
    }
  }, [changes.length, matches.length]);
  const sortedMatches = useMemo(() => {
    if (sortType === 'none') return matches.sort((a, b) => a.id - b.id);
    return matches.sort((a, b) => {
      const aTime = getMatchDate(a);
      const bTime = getMatchDate(a);
      switch (sortType) {
        case 'date':
          if (sortDirection === 'ASC') return bTime.getTime() - aTime.getTime();
          return aTime.getTime() - bTime.getTime();
        case 'time':
          aTime.setFullYear(2000, 1, 1);
          bTime.setFullYear(2000, 1, 1);
          if (sortDirection === 'ASC') return bTime.getTime() - aTime.getTime();
          return aTime.getTime() - bTime.getTime();
        case 'league':
        case 'team1':
        case 'team2':
          if (sortDirection === 'ASC')
            return showTranslated(b[sortType].name, l).localeCompare(
              showTranslated(a[sortType].name, l),
            );
          return showTranslated(a[sortType].name, l).localeCompare(
            showTranslated(b[sortType].name, l),
          );

        case 'matchday':
          if (sortDirection === 'ASC') return b.matchDay - a.matchDay;
          return a.matchDay - b.matchDay;
        default:
          return a.id - b.id;
      }
    });
  }, [l, matches, sortDirection, sortType]);

  const sortMatches = useCallback(
    (by: SortTypes, direction: SortDirections) => {
      setSortType(by);
      setSortDirection(direction);
    },
    [],
  );
  const addRow = useCallback(() => {
    setNewRos((newR) => newR.concat([sortedMatches.length + newR.length]));
  }, [sortedMatches.length]);
  return (
    <>
      <Label htmlFor="selectAll">{translate('selectAll', l)}</Label>
      <BulkMatchRow
        header
        currentSorted={sortType}
        currentDirection={sortDirection}
        onSort={sortMatches}
        selected={
          selectedMatches.length === matches.length && matches.length !== 0
        }
        onSelect={selectMatch}
      />
      {sortedMatches.map((m, i) => (
        <BulkMatchRow
          match={m}
          index={i}
          change={changes.find((c) => c.index === i)}
          onSelect={selectMatch}
          selected={selectedMatches.indexOf(i) !== -1}
          onChange={addChange}
          key={`match-row-${m.id}`}
        />
      ))}
      {newRows.map((i) => (
        <BulkMatchRow
          onChange={addChange}
          change={changes.find((c) => c.index === i)}
          selected
          index={i}
          key={`match-row-${i}`}
        />
      ))}
      <Row>
        <Col xs={12} className="text-center">
          <Button color="secondary" onClick={addRow}>
            <FontAwesomeIcon icon={faPlus} />
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default MatchList;

// rel oad
