import { ConnectedProps } from 'react-redux';
import React, {
  ChangeEvent,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  Button,
  Col,
  FormGroup,
  Input,
  InputGroup,
  Label,
  Row,
} from 'reactstrap';
import { connector } from './redux';
import { ClavaContext } from '../../../../../config/contexts';
import { showTranslated, translate } from '../../../../../config/translator';
import SearchInput from '../../SearchInput';
import { League, TeamListElement } from '../../../../../client/api';

const MatchFilter: React.FC<ConnectedProps<typeof connector>> = ({
  filter,
  addFilter,
  aois,
  reset,
  teams,
  leagues,
  canApplyFilter,
  searching,
  getAois,
  applyFilter,
  getLeagues,
  getTeams,
  searchingTeam,
}) => {
  const { l, aoi } = useContext(ClavaContext);
  const filteredAoi = useMemo(() => {
    const a = filter.find((oldFilter) => oldFilter.type === 'aoiId');
    if (a) return a.value;
    return aoi;
  }, [aoi, filter]);
  useEffect(() => {
    if (aois.length === 0) getAois();
  }, [aois, getAois]);
  useEffect(() => {
    if (leagues.length === 0) getLeagues(filteredAoi);
  }, [leagues, getLeagues, filteredAoi]);
  const setAoiFilter = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const aoiId = parseInt(event.target.value, 10);
      if (Number.isNaN(aoiId)) reset({ type: 'aoiId' });
      else {
        addFilter({ type: 'aoiId', value: aoiId });
        getLeagues(aoiId);
      }
    },
    [addFilter, getLeagues, reset],
  );

  const [leagueQuery, setLeagueQuery] = useState('');
  const filteredLeagueResults = useMemo(() => {
    if (leagueQuery.length === 0) return [];
    return leagues.filter(
      (league) =>
        showTranslated(league.name, l)
          .toLowerCase()
          .indexOf(leagueQuery.toLowerCase()) !== -1,
    );
  }, [l, leagueQuery, leagues]);
  const filteredLeague = useMemo(() => {
    const fil = filter.find((filt) => filt.type === 'leagueId');
    if (fil) return leagues.find((league) => league.id === fil.value);
    return undefined;
  }, [leagues, filter]);
  const filteredTeam = useMemo(() => {
    const fil = filter.find((filt) => filt.type === 'teamId');
    if (fil) return teams.find((team) => team.id === fil.value);
    return undefined;
  }, [filter, teams]);
  const setLeagueFilter = useCallback(
    (league: League | undefined) => {
      if (league) {
        getTeams(league.id);
        addFilter({ type: 'leagueId', value: league.id });
      } else reset({ type: 'leagueId' });
    },
    [addFilter, getTeams, reset],
  );
  const [teamQuery, setTeamQuery] = useState('');
  const filteredTeamResults = useMemo(() => {
    if (teamQuery.length === 0) return [];
    return teams.filter(
      (team) =>
        showTranslated(team.name, l)
          .toLowerCase()
          .indexOf(teamQuery.toLowerCase()) !== -1,
    );
  }, [l, teamQuery, teams]);
  const setTeamFilter = useCallback(
    (team: TeamListElement | undefined) => {
      if (team) {
        addFilter({ type: 'teamId', value: team.id });
      } else reset({ type: 'teamId' });
    },
    [addFilter, reset],
  );
  const setMatchdayFilter = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = parseInt(event.target.value, 10);
      if (Number.isNaN(value)) reset({ type: 'matchDay' });
      else addFilter({ type: 'matchDay', value });
    },
    [addFilter, reset],
  );
  const filteredMatchday = useMemo(() => {
    const fil = filter.find((filt) => filt.type === 'matchDay');
    if (fil) return fil.value;
    return -1;
  }, [filter]);

  const filteredDateFrom = useMemo(() => {
    const fil = filter.find((filt) => filt.type === 'dateFrom');
    if (fil && fil.value)
      return new Date(fil.value).toISOString().split('T')[0];
    return undefined;
  }, [filter]);
  const filteredDateTo = useMemo(() => {
    const fil = filter.find((filt) => filt.type === 'dateTo');
    if (fil && fil.value)
      return new Date(fil.value).toISOString().split('T')[0];
    return undefined;
  }, [filter]);
  const setDateFromFilter = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = new Date(event.target.value).getTime();
      if (Number.isNaN(value)) reset({ type: 'dateFrom' });
      else addFilter({ type: 'dateFrom', value });
    },
    [reset, addFilter],
  );
  const setDateToFilter = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = new Date(event.target.value).getTime();
      if (Number.isNaN(value)) reset({ type: 'dateTo' });
      else addFilter({ type: 'dateTo', value });
    },
    [reset, addFilter],
  );
  const applyFilterCont = useCallback(() => {
    if (!canApplyFilter) {
      setTeamQuery('');
      setLeagueQuery('');
    }
    applyFilter();
  }, [applyFilter, canApplyFilter]);
  return (
    <Row className="match-section match-filter">
      <Col xs={2}>
        <FormGroup>
          <Label htmlFor="region">{translate('areaOfInterest', l)}</Label>
          <InputGroup>
            <Input
              type="select"
              color="secondary"
              id="region"
              value={filteredAoi ?? 1}
              onChange={setAoiFilter}>
              {aois.map((ao) => (
                <option value={ao.id} key={`aoi-${ao.id}`}>
                  {showTranslated(ao.name, l)}
                </option>
              ))}
            </Input>
          </InputGroup>
        </FormGroup>
      </Col>
      <Col xs={2}>
        <SearchInput
          label="searchLeagueExpl"
          onChange={setLeagueQuery}
          value={leagueQuery}
          name="searchLeagues"
          selectedItem={filteredLeague}
          onSelect={setLeagueFilter}
          isFocused
          searching={false}
          items={filteredLeagueResults}
        />
      </Col>
      <Col xs={2}>
        <SearchInput
          label="searchTeamExpl"
          onChange={setTeamQuery}
          isFocused
          value={teamQuery}
          selectedItem={filteredTeam}
          name="searchTeam"
          onSelect={setTeamFilter}
          searching={searchingTeam}
          items={filteredTeamResults}
        />
      </Col>
      <Col xs={2}>
        <FormGroup>
          <Label htmlFor="matchday">{translate('matchDay', l)}</Label>
          <InputGroup>
            <Input
              type="number"
              color="secondary"
              onChange={setMatchdayFilter}
              value={filteredMatchday === -1 ? '' : filteredMatchday}
            />
          </InputGroup>
        </FormGroup>
      </Col>
      <Col xs={2}>
        <FormGroup>
          <Label htmlFor="dateFrom">{translate('date', l)}</Label>
          <InputGroup>
            <Input
              type="date"
              id="dateFrom"
              color="secondary"
              onChange={setDateFromFilter}
              value={filteredDateFrom ?? ''}
            />
            <span>-</span>
            <Input
              type="date"
              id="dateTo"
              color="secondary"
              onChange={setDateToFilter}
              value={filteredDateTo ?? ''}
            />
          </InputGroup>
        </FormGroup>
      </Col>
      <Col xs={2}>
        <Button type="button" color="primary" onClick={applyFilterCont}>
          {translate(canApplyFilter ? 'applyFilter' : 'reset', l)}
        </Button>
      </Col>
    </Row>
  );
};

export default connector(MatchFilter);
// reload
