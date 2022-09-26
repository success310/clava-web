import { Dispatch } from 'redux';
import client from '../../client';
import { IDType } from '../../config/types';
import { defaultGet } from './all';
import { LeagueActions, LeagueActionTypes } from './types';
import { StatisticKeyEnum } from '../../client/api';
import { numberedHash } from '../../config/utils';

export function fetchLeagues(dispatch: Dispatch<LeagueActions>, aoiID: IDType) {
  defaultGet(
    dispatch,
    LeagueActionTypes.FETCH_SUCCESS,
    LeagueActionTypes.FETCH_ERROR,
    LeagueActionTypes.FETCH_LEAGUES,
    client().getLeaguesOfAoi,
    false,
    false,
    aoiID,
  );
}
export function fetchLeague(dispatch: Dispatch<LeagueActions>, id: IDType) {
  defaultGet(
    dispatch,
    LeagueActionTypes.FETCH_SUCCESS_SINGLE,
    LeagueActionTypes.FETCH_ERROR,
    LeagueActionTypes.FETCH_LEAGUES,
    client().getLeague,
    true,
    false,
    id,
  );
}

export function fetchPlayerStats(
  dispatch: Dispatch<LeagueActions>,
  id: IDType,
) {
  defaultGet(
    dispatch,
    LeagueActionTypes.FETCH_SUCCESS_STATISTICS_PLAYER,
    LeagueActionTypes.FETCH_ERROR,
    LeagueActionTypes.FETCH_STATISTIC,
    client().getLeaguePlayerStatistics,
    false,
    { id },
    id,
  );
}

export function fetchPlayerStatsDetail(
  dispatch: Dispatch<LeagueActions>,
  id: IDType,
  key: StatisticKeyEnum,
) {
  defaultGet(
    dispatch,
    LeagueActionTypes.FETCH_SUCCESS_STATISTIC_PLAYER,
    LeagueActionTypes.FETCH_ERROR,
    LeagueActionTypes.FETCH_STATISTIC,
    client().getDetailLeaguePlayerStatistics,
    false,
    { id, date: numberedHash(key) },
    id,
    key,
  );
}

export function fetchTeamStats(dispatch: Dispatch<LeagueActions>, id: IDType) {
  defaultGet(
    dispatch,
    LeagueActionTypes.FETCH_SUCCESS_STATISTICS_TEAM,
    LeagueActionTypes.FETCH_ERROR,
    LeagueActionTypes.FETCH_STATISTIC,
    client().getLeagueTeamStatistics,
    false,
    { id },
    id,
  );
}
export function fetchTeamOfTheWeek(
  dispatch: Dispatch<LeagueActions>,
  id: IDType,
  matchDay: number,
) {
  defaultGet(
    dispatch,
    LeagueActionTypes.FETCH_SUCCESS_TEAM_OF_THE_WEEK,
    LeagueActionTypes.FETCH_ERROR,
    LeagueActionTypes.FETCH_STATISTIC,
    client().getTeamOfTheWeek,
    false,
    { id, date: matchDay },
    id,
    matchDay,
  );
}

export function fetchTeamStatsDetail(
  dispatch: Dispatch<LeagueActions>,
  id: IDType,
  key: StatisticKeyEnum,
) {
  defaultGet(
    dispatch,
    LeagueActionTypes.FETCH_SUCCESS_STATISTIC_TEAM,
    LeagueActionTypes.FETCH_ERROR,
    LeagueActionTypes.FETCH_STATISTIC,
    client().getDetailLeagueTeamStatistics,
    false,
    { id, date: numberedHash(key) },
    id,
    key,
  );
}
