import { ConnectedProps } from 'react-redux';
import React, {
  ChangeEvent,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Col, Input, Row } from 'reactstrap';
import { connector } from './redux';
import { ClavaContext } from '../../../../../config/contexts';
import { showTranslated, translate } from '../../../../../config/translator';
import MatchSorter from '../MatchSorter';
import { getMatchDate } from '../../../../../config/utils';
import SearchInput from '../../SearchInput';
import {
  League,
  LeagueListElement,
  Team,
  TeamListElement,
} from '../../../../../client/api';
import { MatchCreateParsed, TranslatableSearch } from '../types';

const BulkMatchRow: React.FC<ConnectedProps<typeof connector>> = ({
  selected,
  onSort,
  onSelect,
  header,
  match,
  currentDirection,
  getTeams,
  currentSorted,
  rowFiller,
  index,
  leagues,
  teams,
  onChange,
}) => {
  const { l } = useContext(ClavaContext);
  const [matchDay, setMatchDay] = useState(match?.matchDay?.toString() ?? '');
  const [team1, setTeam1] = useState<
    Team | TeamListElement | TranslatableSearch | undefined
  >(match?.team1);
  const [team2, setTeam2] = useState<
    Team | TeamListElement | TranslatableSearch | undefined
  >(match?.team2);
  const [league, setLeague] = useState<
    League | LeagueListElement | undefined | TranslatableSearch
  >(match?.league);
  const [goals1, setGoals1] = useState(match?.goal1?.toString() ?? '');
  const [goals2, setGoals2] = useState(match?.goal2?.toString() ?? '');
  const [leagueQuery, setLeagueQuery] = useState('');
  const filteredLeagueResults = useMemo(() => {
    if (leagueQuery.length === 0) return [];
    return leagues.filter(
      (lea) =>
        showTranslated(lea.name, l)
          .toLowerCase()
          .indexOf(leagueQuery.toLowerCase()) !== -1,
    );
  }, [l, leagueQuery, leagues]);

  const [teamQuery, setTeam1Query] = useState('');
  const filteredTeamResults = useMemo(() => {
    if (teamQuery.length === 0 || !league) return [];
    const teamList = teams.find((team) => team.id === league.id);
    if (teamList)
      return teamList.response.filter(
        (team) =>
          showTranslated(team.name, l)
            .toLowerCase()
            .indexOf(teamQuery.toLowerCase()) !== -1,
      );
    return [];
  }, [l, league, teamQuery, teams]);
  const [teamQuery2, setTeam2Query] = useState('');
  const filteredTeamResults2 = useMemo(() => {
    if (teamQuery2.length === 0 || !league) return [];
    const teamList = teams.find((team) => team.id === league.id);
    if (teamList)
      return teamList.response.filter(
        (team) =>
          showTranslated(team.name, l)
            .toLowerCase()
            .indexOf(teamQuery2.toLowerCase()) !== -1,
      );
    return [];
  }, [l, league, teamQuery2, teams]);
  const originalDate = useMemo(
    () =>
      (match
        ? 'originalStartTime' in match
          ? getMatchDate(match)
          : match.startTime ?? new Date()
        : new Date()
      )
        .toISOString()
        .split('T')[0],
    [match],
  );
  const [date, setDate] = useState(originalDate);
  const originalTime = useMemo(
    () =>
      `${(match
        ? 'originalStartTime' in match
          ? getMatchDate(match)
          : match.startTime ?? new Date()
        : new Date()
      )
        .getHours()
        .toString()
        .padStart(2, '0')}:${(match
        ? 'originalStartTime' in match
          ? getMatchDate(match)
          : match.startTime ?? new Date()
        : new Date()
      )
        .getMinutes()
        .toString()
        .padStart(2, '0')}`,
    [match],
  );

  const [time, setTime] = useState(originalTime);
  const [dateError, setDateError] = useState(false);
  const [timeError, setTimeError] = useState(false);
  const onSelectCont = useCallback(() => {
    if (header) {
      onSelect(-1);
    } else if (onSelect) {
      onSelect(index);
    }
  }, [header, index, onSelect]);
  const currentMatchChange = useMemo(() => {
    let startTime = '';

    try {
      const newDate = new Date(`${date}T00:00:00.000Z`);
      const hours = parseInt(time.split(':')[0], 10);
      const minutes = parseInt(
        time.split(':').length === 2 ? time.split(':')[1] : '00',
        10,
      );

      if (!Number.isNaN(minutes)) newDate.setHours(hours, minutes, 0, 0);
      startTime = newDate.toISOString();
    } catch (e) {
      // nothing
    }
    return {
      matchId: match && 'id' in match ? match.id : undefined,
      matchDay: parseInt(matchDay, 10),
      team1Id: team1?.id,
      team2Id: team2?.id,
      leagueId: league?.id,
      startTime,
      goal2: parseInt(goals2, 10),
      goal1: parseInt(goals1, 10),
    };
  }, [
    date,
    goals1,
    goals2,
    league?.id,
    match,
    matchDay,
    team1?.id,
    team2?.id,
    time,
  ]);
  const setLeagueCont = useCallback(
    (lea: LeagueListElement | League | TranslatableSearch | undefined) => {
      setLeague(lea);
      if (lea) getTeams(lea.id);
      if (!header) {
        onChange({
          index,
          type: match ? 'edit' : 'create',
          lastAction: { leagueId: currentMatchChange.leagueId },
          change: {
            ...currentMatchChange,
            leagueId: lea?.id,
          },
        });
      }
    },
    [currentMatchChange, getTeams, header, index, match, onChange],
  );
  const setTeam1Cont = useCallback(
    (tea: Team | TeamListElement | TranslatableSearch | undefined) => {
      setTeam1(tea);
      if (!header) {
        onChange({
          index,
          type: match ? 'edit' : 'create',
          lastAction: { team1Id: currentMatchChange.team1Id },
          change: {
            ...currentMatchChange,
            team1Id: tea?.id,
          },
        });
      }
    },
    [currentMatchChange, header, index, match, onChange],
  );
  const setTeam2Cont = useCallback(
    (tea: Team | TeamListElement | TranslatableSearch | undefined) => {
      setTeam2(tea);
      if (!header) {
        onChange({
          index,
          type: match ? 'edit' : 'create',
          lastAction: { team2Id: currentMatchChange.team2Id },
          change: {
            ...currentMatchChange,
            team2Id: tea?.id,
          },
        });
      }
    },
    [currentMatchChange, header, index, match, onChange],
  );
  const changeGoals1 = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const g1 = parseInt(event.target.value, 10);
      if (!header) {
        onChange({
          index,
          type: match ? 'edit' : 'create',
          lastAction: { goal1: currentMatchChange.goal1 },
          change: {
            ...currentMatchChange,
            goal1: g1,
          },
        });
      }
      setGoals1(event.target.value);
    },
    [currentMatchChange, header, index, match, onChange],
  );
  const changeGoals2 = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const g2 = parseInt(event.target.value, 10);
      if (!header) {
        onChange({
          index,
          type: match ? 'edit' : 'create',
          lastAction: { goal2: currentMatchChange.goal2 },
          change: {
            ...currentMatchChange,
            goal2: g2,
          },
        });
      }
      setGoals2(event.target.value);
    },
    [currentMatchChange, header, index, match, onChange],
  );
  const changeMatchday = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (!header) {
        onChange({
          index,
          type: match ? 'edit' : 'create',
          lastAction: { matchDay: currentMatchChange.matchDay },
          change: {
            ...currentMatchChange,
            matchDay: parseInt(event.target.value, 10),
          },
        });
      }
      setMatchDay(event.target.value);
    },
    [currentMatchChange, header, index, match, onChange],
  );
  const changeDate = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (!header) {
        const newDateString = event.target.value;
        setDate(newDateString);
        try {
          const newDate = new Date(`${newDateString}T00:00:00.000Z`);
          const hours = parseInt(time.split(':')[0], 10);
          const minutes = parseInt(
            time.split(':').length === 2 ? time.split(':')[1] : '00',
            10,
          );
          newDate.setHours(hours, minutes, 0, 0);
          if (Number.isNaN(newDate.getTime())) {
            setDateError(true);
          } else {
            setDateError(false);
            onChange({
              index,
              type: match ? 'edit' : 'create',
              lastAction: { startTime: currentMatchChange.startTime },
              change: {
                ...currentMatchChange,
                startTime: newDate.toISOString(),
              },
            });
          }
        } catch (e) {
          // nothing
        }
      }
    },
    [currentMatchChange, header, index, match, onChange, time],
  );
  const changeTime = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (!header) {
        const newTime = event.target.value;
        setTime(newTime);
        const newDate = new Date(`${date}T00:00:00.000Z`);
        const hours = parseInt(newTime.split(':')[0], 10);
        const minutes = parseInt(
          newTime.split(':').length === 2 ? newTime.split(':')[1] : '00',
          10,
        );
        newDate.setHours(hours, minutes, 0, 0);
        if (Number.isNaN(newDate.getTime())) {
          setTimeError(true);
        } else {
          setTimeError(false);
          onChange({
            index,
            type: match ? 'edit' : 'create',
            lastAction: { startTime: currentMatchChange.startTime },
            change: {
              ...currentMatchChange,
              startTime: newDate.toISOString(),
            },
          });
        }
      }
    },
    [currentMatchChange, date, header, index, onChange],
  );
  const fillRow = useCallback(
    (m: MatchCreateParsed) => {
      setMatchDay(m.matchDay.toString(10));
      setLeagueQuery(m.leagueString);
      setTeam1Query(m.team1String);
      setTeam2Query(m.team2String);
      setTeam1(m.team1);
      setTeam2(m.team2);
      setLeague((oldLeague) =>
        m.league ? leagues.find((lea) => lea.id === m.league?.id) : oldLeague,
      );
      const d = (m.date ? m.date : new Date()).toISOString().split('T')[0];
      const t = `${(m.date ? m.date : new Date())
        .getHours()
        .toString()
        .padStart(2, '0')}:${(m.date ? m.date : new Date())
        .getMinutes()
        .toString()
        .padStart(2, '0')}`;
      setDate(d);
      setTime(t);
      setGoals1('0');
      setGoals2('0');
      if (onChange)
        onChange({
          index: index ?? 0,
          type: 'create',
          lastAction: {
            // empty
          },
          change: {
            matchDay: m.matchDay,
            startTime: m.date ? m.date.toISOString() : new Date().toISOString(),
            goal1: 0,
            goal2: 0,
            team1Id: m.team1?.id,
            team2Id: m.team2?.id,
            leagueId: m.league?.id,
          },
        });
    },
    [index, leagues, onChange],
  );
  useEffect(() => {
    if (rowFiller) {
      fillRow(rowFiller);
    }
  }, [fillRow, rowFiller]);
  return (
    <Row
      className={`bulk-table-row ${header ? 'bulk-header' : ''} ${
        (index ?? 1) % 2 === 0 ? 'even' : 'odd'
      }`}>
      <Col xs={1}>
        {onSelect ? (
          <>
            {match && 'id' in match && (
              <span className="match-id">{match.id} </span>
            )}
            <Input
              type="checkbox"
              onChange={onSelectCont}
              id={header ? 'selectAll' : `select-${match.id}`}
              checked={selected}
            />
          </>
        ) : (
          <span className="text-success">NEW</span>
        )}
      </Col>
      <Col xs={1} className={header ? 'bulk-header' : ''}>
        {header ? (
          <MatchSorter
            title="matchDay"
            by="matchday"
            onSort={onSort}
            currentDirection={currentDirection}
            currentSorted={currentSorted}
          />
        ) : (
          <Input
            type="number"
            className={
              match?.matchDay === parseInt(matchDay, 10) ? '' : 'changed'
            }
            onChange={changeMatchday}
            value={matchDay}
          />
        )}
      </Col>
      <Col
        xs={1}
        className={`${header ? 'bulk-header' : ''} ${
          dateError ? 'text-bg-danger' : ''
        }`}>
        {header ? (
          <MatchSorter
            title="date"
            by="date"
            onSort={onSort}
            currentDirection={currentDirection}
            currentSorted={currentSorted}
          />
        ) : (
          <Input
            type="date"
            onChange={changeDate}
            className={originalDate === date ? '' : 'changed'}
            value={date}
          />
        )}
      </Col>
      <Col
        xs={1}
        className={`${header ? 'bulk-header' : ''} ${
          timeError ? 'text-bg-danger' : ''
        }`}>
        {header ? (
          <MatchSorter
            title="time"
            by="time"
            onSort={onSort}
            currentDirection={currentDirection}
            currentSorted={currentSorted}
          />
        ) : (
          <Input
            type="time"
            onChange={changeTime}
            className={originalTime === time ? '' : 'changed'}
            value={time}
          />
        )}
      </Col>
      <Col xs={2} className={header ? 'bulk-header' : ''}>
        {header ? (
          <MatchSorter
            title="league"
            by="league"
            onSort={onSort}
            currentDirection={currentDirection}
            currentSorted={currentSorted}
          />
        ) : (
          <SearchInput
            onChange={setLeagueQuery}
            value={leagueQuery}
            name="searchLeagues"
            disabled={!!match}
            selectedItem={league}
            onSelect={setLeagueCont}
            className={league?.id === match?.league?.id ? '' : 'changed'}
            isFocused
            searching={false}
            items={filteredLeagueResults}
          />
        )}
      </Col>
      <Col xs={2} className={header ? 'bulk-header' : ''}>
        {header ? (
          <MatchSorter
            title="team1"
            by="team1"
            onSort={onSort}
            currentDirection={currentDirection}
            currentSorted={currentSorted}
          />
        ) : (
          <SearchInput
            onChange={setTeam1Query}
            isFocused
            value={teamQuery}
            disabled={!!match}
            selectedItem={team1}
            className={team1?.id === match?.team1?.id ? '' : 'changed'}
            name="searchTeam"
            onSelect={setTeam1Cont}
            searching={false}
            items={filteredTeamResults}
          />
        )}
      </Col>
      <Col xs={2} className={header ? 'bulk-header' : ''}>
        {header ? (
          <MatchSorter
            title="team2"
            by="team2"
            onSort={onSort}
            currentDirection={currentDirection}
            currentSorted={currentSorted}
          />
        ) : (
          <SearchInput
            onChange={setTeam2Query}
            isFocused
            value={teamQuery2}
            disabled={!!match}
            selectedItem={team2}
            className={team2?.id === match?.team2?.id ? '' : 'changed'}
            name="searchTeam"
            searching={false}
            onSelect={setTeam2Cont}
            items={filteredTeamResults2}
          />
        )}
      </Col>
      <Col xs={1} className={header ? 'bulk-header' : ''}>
        {header ? (
          <span>{translate('goals1', l)}</span>
        ) : (
          <Input
            type="number"
            onChange={changeGoals1}
            className={parseInt(goals1, 10) === match?.goal1 ? '' : 'changed'}
            value={goals1}
          />
        )}
      </Col>
      <Col xs={1} className={header ? 'bulk-header' : ''}>
        {header ? (
          <span>{translate('goals2', l)}</span>
        ) : (
          <Input
            type="number"
            onChange={changeGoals2}
            className={parseInt(goals2, 10) === match?.goal2 ? '' : 'changed'}
            value={goals2}
          />
        )}
      </Col>
    </Row>
  );
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export default connector(BulkMatchRow);

// reload
