import { ConnectedProps } from 'react-redux';
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { NavLink } from 'react-router-dom';
import { connector } from './redux';
import { ClavaContext } from '../../../config/contexts';
import {
  LanguageLocaleEnum,
  MatchLocationEnum,
  Standing,
} from '../../../client/api';
import { showTranslated, translate } from '../../../config/translator';
import ClavaSwitch from '../Form/ClavaSwitch';
import ClavaImage from '../ClavaImage';

type SortFuncType = (a: Standing, b: Standing) => number;

const defaultSort: SortFuncType = (a, b) => a.placement - b.placement;
let lang: LanguageLocaleEnum = LanguageLocaleEnum.DE;
const nameSort: SortFuncType = (a, b) =>
  showTranslated(a.team.name, lang).localeCompare(
    showTranslated(b.team.name, lang),
  );
const playedSort: SortFuncType = (a, b) => a.matchDay - b.matchDay;
const winsSort: SortFuncType = (a, b) => a.wins - b.wins;
const drawsSort: SortFuncType = (a, b) => a.draws - b.draws;
const lossesSort: SortFuncType = (a, b) => a.losses - b.losses;
const goalsOutSort: SortFuncType = (a, b) => a.goalsOut - b.goalsOut;
const goalsInSort: SortFuncType = (a, b) => a.goalsIn - b.goalsIn;
const diffSort: SortFuncType = (a, b) =>
  a.goalsOut - a.goalsIn - (b.goalsOut - b.goalsIn);
const pointsSort: SortFuncType = (a, b) => a.points - b.points;
const sortFuncs: SortFuncType[] = [
  defaultSort,
  nameSort,
  playedSort,
  winsSort,
  drawsSort,
  lossesSort,
  goalsOutSort,
  goalsInSort,
  diffSort,
  pointsSort,
];
const Line: React.FC<{ standing: Standing }> = ({ standing }) => {
  const { l } = useContext(ClavaContext);
  return (
    <tr>
      <td>
        <span>{standing.placement}</span>
      </td>
      <td>
        <NavLink to={`/team/${standing.team.id}`}>
          <ClavaImage image={standing.team.thumb} width="30px" />
          <span>{showTranslated(standing.team.name, l)}</span>
        </NavLink>
      </td>
      <td>
        <span>{standing.matchDay}</span>
      </td>
      <td>
        <span>{standing.wins}</span>
      </td>
      <td>
        <span>{standing.draws}</span>
      </td>
      <td>
        <span>{standing.losses}</span>
      </td>
      <td>
        <span>{standing.goalsOut}</span>
      </td>
      <td>
        <span>{standing.goalsIn}</span>
      </td>
      <td>
        <span>{standing.goalsOut - standing.goalsIn}</span>
      </td>
      <td>
        <span>{standing.points}</span>
      </td>
    </tr>
  );
};

const Table: React.FC<ConnectedProps<typeof connector>> = ({
  leagueId,
  team1Id,
  team2Id,
  standing,
  getStanding,
}) => {
  const { l } = useContext(ClavaContext);
  lang = l;
  const [type, setType] = useState<MatchLocationEnum>(MatchLocationEnum.ALL);
  const [sortDir, setSortDir] = useState<boolean>(true);
  const [sortBy, setSortBy] = useState<number>(0);
  const sortFunc = useCallback<SortFuncType>(
    (a, b) => sortFuncs[sortBy](sortDir ? a : b, sortDir ? b : a),
    [sortBy, sortDir],
  );
  useEffect(() => {
    getStanding(leagueId);
  }, [leagueId]);
  const selectedStanding = useMemo(() => {
    if (!standing) return undefined;
    const st = standing[type];
    if (st) {
      console.log('Sort:  ', st);
      return st.sort(sortFunc);
    }
    return undefined;
  }, [type, standing, sortFunc]);
  const sortHelper = useCallback(
    (idx: number) => {
      if (sortBy === idx) setSortDir((d) => !d);
      else {
        setSortBy(idx);
        setSortDir(true);
      }
    },
    [sortBy],
  );
  const setSortByDefault = useCallback(() => {
    sortHelper(0);
  }, [sortHelper]);
  const setSortByName = useCallback(() => {
    sortHelper(1);
  }, [sortHelper]);
  const setSortByPlayed = useCallback(() => {
    sortHelper(2);
  }, [sortHelper]);
  const setSortByWins = useCallback(() => {
    sortHelper(3);
  }, [sortHelper]);
  const setSortByDraws = useCallback(() => {
    sortHelper(4);
  }, [sortHelper]);
  const setSortByLosses = useCallback(() => {
    sortHelper(5);
  }, [sortHelper]);
  const setSortByGoalsOut = useCallback(() => {
    sortHelper(6);
  }, [sortHelper]);
  const setSortByGoalsIn = useCallback(() => {
    sortHelper(7);
  }, [sortHelper]);
  const setSortByDiff = useCallback(() => {
    sortHelper(8);
  }, [sortHelper]);
  const setSortByPoints = useCallback(() => {
    sortHelper(9);
  }, [sortHelper]);
  return (
    <div className="table-container">
      <ClavaSwitch
        items={[
          { value: MatchLocationEnum.ALL, label: translate('overall', l) },
          { value: MatchLocationEnum.HOME, label: translate('home', l) },
          { value: MatchLocationEnum.AWAY, label: translate('away', l) },
        ]}
        value={type}
        onChange={setType}
      />
      {selectedStanding ? (
        <div className="clava-table">
          <table>
            <thead>
              <tr>
                <th>
                  <button
                    type="button"
                    onClick={setSortByDefault}
                    className={
                      sortBy === 0 ? (sortDir ? 'sort-asc' : 'sort-desc') : ''
                    }>
                    <span className="bold">#</span>
                  </button>
                </th>
                <th>
                  <button
                    type="button"
                    onClick={setSortByName}
                    className={
                      sortBy === 1 ? (sortDir ? 'sort-asc' : 'sort-desc') : ''
                    }>
                    <span>{translate('teams', l)}</span>
                  </button>
                </th>
                <th>
                  <button
                    type="button"
                    onClick={setSortByPlayed}
                    className={
                      sortBy === 2 ? (sortDir ? 'sort-asc' : 'sort-desc') : ''
                    }>
                    <span>{translate('matchesShort', l)}</span>
                  </button>
                </th>
                <th>
                  <button
                    type="button"
                    onClick={setSortByWins}
                    className={
                      sortBy === 3 ? (sortDir ? 'sort-asc' : 'sort-desc') : ''
                    }>
                    <span>{translate('wins', l)}</span>
                  </button>
                </th>
                <th>
                  <button
                    type="button"
                    onClick={setSortByDraws}
                    className={
                      sortBy === 4 ? (sortDir ? 'sort-asc' : 'sort-desc') : ''
                    }>
                    <span>{translate('draws', l)}</span>
                  </button>
                </th>
                <th>
                  <button
                    type="button"
                    onClick={setSortByLosses}
                    className={
                      sortBy === 5 ? (sortDir ? 'sort-asc' : 'sort-desc') : ''
                    }>
                    <span>{translate('losses', l)}</span>
                  </button>
                </th>
                <th>
                  <button
                    type="button"
                    onClick={setSortByGoalsOut}
                    className={
                      sortBy === 6 ? (sortDir ? 'sort-asc' : 'sort-desc') : ''
                    }>
                    <span>{translate('goalsOut', l)}</span>
                  </button>
                </th>
                <th>
                  <button
                    type="button"
                    onClick={setSortByGoalsIn}
                    className={
                      sortBy === 7 ? (sortDir ? 'sort-asc' : 'sort-desc') : ''
                    }>
                    <span>{translate('goalsIn', l)}</span>
                  </button>
                </th>
                <th>
                  <button
                    type="button"
                    onClick={setSortByDiff}
                    className={
                      sortBy === 8 ? (sortDir ? 'sort-asc' : 'sort-desc') : ''
                    }>
                    <span>{translate('difference', l)}</span>
                  </button>
                </th>
                <th>
                  <button
                    type="button"
                    onClick={setSortByPoints}
                    className={
                      sortBy === 9 ? (sortDir ? 'sort-asc' : 'sort-desc') : ''
                    }>
                    <span>{translate('points', l)}</span>
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
              {selectedStanding.map((st) => (
                <Line standing={st} key={`stand${st.team.id}`} />
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <span>{translate('loading', l)}</span>
      )}
    </div>
  );
};

export default connector(Table);
// r elo ad
