import { Button } from 'reactstrap';
import React, { useCallback, useContext, useRef, useState } from 'react';
import { ConnectedProps } from 'react-redux';
import SearchInput from '../../SearchInput';
import TextInput from '../../TextInput';
import { translate } from '../../../../../config/translator';
import { formatDate } from '../../../../../config/utils';
import {
  LeagueListElement,
  Location,
  TeamListElement,
} from '../../../../../client/api';
import { connector } from './redux';
import { ClavaContext } from '../../../../../config/contexts';
import DateInput from '../../DateInput';

const AdminCreateMatch: React.FC<ConnectedProps<typeof connector>> = ({
  searchTeams,
  searchLeague,
  searching,
  leagues,
  teams,
  searchLocation,
  locations,
  createMatch,
}) => {
  const { l } = useContext(ClavaContext);
  const [queryLeague, setQueryLeague] = useState('');
  const [queryTeam1, setQueryTeam1] = useState('');
  const [queryTeam2, setQueryTeam2] = useState('');
  const [queryLocation, setQueryLocation] = useState('');
  const [selectedLeague, setSelectedLeague] = useState<LeagueListElement>();
  const [selectedTeam1, setSelectedTeam1] = useState<TeamListElement>();
  const [selectedTeam2, setSelectedTeam2] = useState<TeamListElement>();
  const [selectedLocation, setSelectedLocation] = useState<Location>();
  const [date, setDate] = useState<Date>(new Date());
  const [matchDay, setMatchDay] = useState<number>(-1);
  const timeout = useRef<number>(-1);
  const onSearchLeague = useCallback(
    (q: string) => {
      if (timeout.current !== -1) {
        window.clearTimeout(timeout.current);
      }
      setQueryLeague(q);
      timeout.current = window.setTimeout(() => {
        searchLeague(q);
      }, 500);
    },
    [searchLeague],
  );
  const onSearchTeam1 = useCallback(
    (q: string) => {
      if (timeout.current !== -1) {
        window.clearTimeout(timeout.current);
      }
      setQueryTeam1(q);
      timeout.current = window.setTimeout(() => {
        searchTeams(q);
      }, 500);
    },
    [searchTeams],
  );
  const onSearchTeam2 = useCallback(
    (q: string) => {
      if (timeout.current !== -1) {
        window.clearTimeout(timeout.current);
      }
      setQueryTeam2(q);
      timeout.current = window.setTimeout(() => {
        searchTeams(q);
      }, 500);
    },
    [searchTeams],
  );

  const onSearchLocation = useCallback(
    (q: string) => {
      if (timeout.current !== -1) {
        window.clearTimeout(timeout.current);
      }
      setQueryLocation(q);
      timeout.current = window.setTimeout(() => {
        searchLocation(q);
      }, 500);
    },
    [searchLocation],
  );
  const onCreate = useCallback(() => {
    if (selectedLeague && selectedTeam1 && selectedTeam2)
      createMatch({
        matchDay,
        leagueId: selectedLeague.id,
        team1Id: selectedTeam1.id,
        team2Id: selectedTeam2.id,
        originalStartTime: formatDate(date, l, true),
        locationId: selectedLocation?.id,
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
    <>
      <DateInput
        value={date}
        onChange={setDate}
        name="match-date"
        label="date"
        type="datetime"
      />

      <SearchInput
        value={queryLocation}
        isFocused
        selectedItem={selectedLocation}
        searching={searching}
        onChange={onSearchLocation}
        label="searchLocation"
        name="searchLocation"
        items={locations}
        onSelect={setSelectedLocation}
      />
      <SearchInput
        value={queryLeague}
        searching={searching}
        selectedItem={selectedLeague}
        isFocused
        onChange={onSearchLeague}
        label="searchLeague"
        name="searchLeague"
        items={leagues}
        onSelect={setSelectedLeagueCont}
      />
      {selectedLeague && (
        <SearchInput
          value={queryTeam1}
          searching={searching}
          onChange={onSearchTeam1}
          isFocused
          selectedItem={selectedTeam1}
          label="searchTeam1"
          name="searchTeam1"
          items={teams}
          onSelect={setSelectedTeam1}
        />
      )}
      {selectedLeague && selectedTeam1 && (
        <SearchInput
          value={queryTeam2}
          searching={searching}
          isFocused
          selectedItem={selectedTeam2}
          onChange={onSearchTeam2}
          label="searchTeam2"
          name="searchTeam2"
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
    </>
  );
};

export default connector(AdminCreateMatch);
// relo ad
