import { ConnectedProps } from 'react-redux';
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useParams } from 'react-router';
import { faChevronDown, faChevronUp } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'reactstrap';
import { ClavaContext } from '../../../../config/contexts';
import { translate } from '../../../../config/translator';
import { connector } from './redux';
import SearchInput from '../SearchInput';
import { formatDate, getMatchDate } from '../../../../config/utils';
import {
  LeagueListElement,
  Match,
  MatchListElement,
  TeamListElement,
} from '../../../../client/api';
import TextInput from '../TextInput';

const AdminpanelMatch: React.FC<ConnectedProps<typeof connector>> = ({
  match,
  matches,
  patchMatch,
  getMatch,
  createMatch,
  status,
  searching,
  deleteMatch,
  searchMatch,
  leagues,
  searchLeague,
  teams,
  searchTeams,
}) => {
  const { l } = useContext(ClavaContext);
  const { adminMethod, adminElemId } = useParams();
  const [method, setMethod] = useState<string>(adminMethod ?? 'search');
  const [query, setQuery] = useState('');
  const [queryLeague, setQueryLeague] = useState('');
  const [queryTeam1, setQueryTeam1] = useState('');
  const [queryTeam2, setQueryTeam2] = useState('');

  const [selectedMatch, setSelectedMatch] = useState<
    Match | MatchListElement
  >();
  const [selectedLeague, setSelectedLeague] = useState<LeagueListElement>();
  const [selectedTeam1, setSelectedTeam1] = useState<TeamListElement>();
  const [selectedTeam2, setSelectedTeam2] = useState<TeamListElement>();
  const [date, setDate] = useState<Date>(new Date());
  const [matchDay, setMatchDay] = useState<number>(-1);
  const timeout = useRef<number>(-1);

  useEffect(() => {
    if (
      adminElemId &&
      !Number.isNaN(parseInt(adminElemId, 10)) &&
      status === 'idle'
    ) {
      if (!match) getMatch(parseInt(adminElemId, 10));
      if (match) {
        if (adminMethod === 'edit') {
          setMatchDay(match.matchDay);
          setSelectedTeam1(match.team1);
          setSelectedTeam2(match.team2);
          setSelectedLeague(match.league);
          setDate(getMatchDate(match));
        }
        setSelectedMatch(match);
      }
    } else if (adminMethod === 'edit' && status !== 'loading') {
      setMethod('search');
    }
  }, [adminElemId, getMatch, method, status, match]);
  const reset = useCallback(() => {
    setSelectedMatch(undefined);
    setSelectedLeague(undefined);
    setSelectedTeam1(undefined);
    setSelectedTeam2(undefined);
    setDate(new Date());
    setMatchDay(-1);
  }, []);
  const toggleCreate = useCallback(() => {
    reset();
    setMethod((m) => (m === 'create' ? 'search' : 'create'));
  }, [reset]);
  const toggleSearch = useCallback(() => {
    setMethod('search');
  }, []);
  const toggleEdit = useCallback(() => {
    if (selectedMatch) {
      setMatchDay(selectedMatch.matchDay);
      setSelectedTeam1(selectedMatch.team1);
      setSelectedTeam2(selectedMatch.team2);
      setSelectedLeague(selectedMatch.league);
      setDate(getMatchDate(selectedMatch));
      setMethod((m) => (m === 'edit' ? 'search' : 'edit'));
    } else {
      reset();
      setMethod('search');
    }
  }, [reset, selectedMatch]);
  const toggleDelete = useCallback(() => {
    setMethod((m) => (m === 'delete' ? 'search' : 'delete'));
  }, []);
  const onSearch = useCallback(
    (q: string) => {
      if (timeout.current !== -1) {
        window.clearTimeout(timeout.current);
      }
      setQuery(q);
      window.setTimeout(() => {
        searchMatch(q);
      }, 100);
    },
    [searchMatch],
  );
  const onSearchLeague = useCallback(
    (q: string) => {
      if (timeout.current !== -1) {
        window.clearTimeout(timeout.current);
      }
      setQueryLeague(q);
      window.setTimeout(() => {
        searchLeague(q);
      }, 100);
    },
    [searchLeague],
  );
  const onSearchTeam1 = useCallback(
    (q: string) => {
      if (timeout.current !== -1) {
        window.clearTimeout(timeout.current);
      }
      setQueryTeam1(q);
      window.setTimeout(() => {
        searchTeams(q);
      }, 100);
    },
    [searchTeams],
  );
  const onSearchTeam2 = useCallback(
    (q: string) => {
      if (timeout.current !== -1) {
        window.clearTimeout(timeout.current);
      }
      setQueryTeam2(q);
      window.setTimeout(() => {
        searchTeams(q);
      }, 100);
    },
    [searchTeams],
  );
  const onEdit = useCallback(() => {
    if (selectedMatch) {
      patchMatch(selectedMatch.id, { cancelled: false });
    }
  }, [patchMatch, selectedMatch]);
  const onCreate = useCallback(() => {
    if (selectedLeague && selectedTeam1 && selectedTeam2)
      createMatch({
        matchDay,
        leagueId: selectedLeague.id,
        team1Id: selectedTeam1.id,
        team2Id: selectedTeam2.id,
        originalStartTime: formatDate(date, l, true),
      });
  }, [
    createMatch,
    date,
    l,
    matchDay,
    selectedLeague,
    selectedTeam1,
    selectedTeam2,
  ]);
  const setSelectedLeagueCont = useCallback(
    (league: LeagueListElement | undefined) => {
      setSelectedLeague(league);
      if (league) setMatchDay(league.matchDays);
    },
    [],
  );
  return (
    <div>
      <fieldset className={`form ${method === 'search' ? 'open' : 'close'}`}>
        <button className="form-toggler" onClick={toggleSearch} type="button">
          <h6>{translate('search', l)}</h6>
          <FontAwesomeIcon
            icon={method === 'search' ? faChevronUp : faChevronDown}
          />
        </button>
        <SearchInput
          value={query}
          onChange={onSearch}
          label="searchMatches"
          onSelect={setSelectedMatch}
          items={matches}
          searching={searching}
        />
        {selectedMatch && (
          <div className="options">
            <Button color="primary" onClick={toggleEdit}>
              {translate('editMatch', l)}
            </Button>
            <Button color="danger" onClick={toggleDelete}>
              {translate('deleteMatch', l)}
            </Button>
          </div>
        )}
      </fieldset>
      <fieldset className={`form ${method === 'create' ? 'open' : 'close'}`}>
        <button className="form-toggler" onClick={toggleCreate} type="button">
          <h6>{translate('createMatch', l)}</h6>
          <FontAwesomeIcon
            icon={method === 'create' ? faChevronUp : faChevronDown}
          />
        </button>
        <SearchInput
          value={queryLeague}
          searching={searching}
          onChange={onSearchLeague}
          label="searchLeague"
          items={leagues}
          onSelect={setSelectedLeagueCont}
        />
        {selectedLeague && (
          <SearchInput
            value={queryTeam1}
            searching={searching}
            onChange={onSearchTeam1}
            label="searchTeam1"
            items={teams}
            onSelect={setSelectedTeam1}
          />
        )}
        {selectedLeague && selectedTeam1 && (
          <SearchInput
            value={queryTeam2}
            searching={searching}
            onChange={onSearchTeam2}
            label="searchTeam2"
            items={teams}
            onSelect={setSelectedTeam2}
          />
        )}
        {selectedTeam2 && (
          <TextInput
            label="matchDay"
            onChange={setMatchDay}
            name="matchday"
            value={matchDay}
          />
        )}
        {selectedTeam2 && selectedTeam1 && selectedLeague && (
          <Button color="primary" onClick={onCreate}>
            {translate('submit', l)}
          </Button>
        )}
      </fieldset>
    </div>
  );
};

export default connector(AdminpanelMatch);
// r el
