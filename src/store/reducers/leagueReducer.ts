import { Reducer } from 'redux';
import { LeagueState } from '../constants';
import { LeagueActions, LeagueActionTypes } from '../actions/types';
import { replaceOrAddResponseSingle } from '../../config/utils';

const initialState: LeagueState = {
  value: [],
  error: null,
  status: 'idle',
  teamStatistics: [],
  playerStatistics: [],
  playerStatisticsDetail: [],
  teamStatisticsDetail: [],
  tow: [],
};

const reducer: Reducer<LeagueState> = (
  // eslint-disable-next-line default-param-last
  state = initialState,
  action: LeagueActions,
) => {
  switch (action.type) {
    case LeagueActionTypes.RESET: {
      return {
        value: [],
        error: null,
        status: 'idle',
        teamStatistics: [],
        playerStatistics: [],
        playerStatisticsDetail: [],
        teamStatisticsDetail: [],
        tow: [],
      };
    }
    case LeagueActionTypes.FETCH_STATISTIC:
    case LeagueActionTypes.FETCH_LEAGUES: {
      return { ...state, status: 'loading' };
    }
    case LeagueActionTypes.FETCH_SUCCESS: {
      return {
        ...state,
        status: 'idle',
        value: action.payload,
        error: null,
      };
    }
    case LeagueActionTypes.FETCH_SUCCESS_SINGLE: {
      return {
        ...state,
        status: 'idle',
        value: state.value.concat(action.payload),
        error: null,
      };
    }
    case LeagueActionTypes.FETCH_SUCCESS_STATISTIC_PLAYER: {
      return {
        ...state,
        status: 'idle',
        playerStatisticsDetail: replaceOrAddResponseSingle(
          action.payload,
          state.playerStatisticsDetail,
        ),
        error: null,
      };
    }
    case LeagueActionTypes.FETCH_SUCCESS_STATISTICS_PLAYER: {
      return {
        ...state,
        status: 'idle',
        playerStatistics: replaceOrAddResponseSingle(
          action.payload,
          state.playerStatistics,
        ),
        error: null,
      };
    }
    case LeagueActionTypes.FETCH_SUCCESS_STATISTIC_TEAM: {
      return {
        ...state,
        status: 'idle',
        error: null,
        teamStatisticsDetail: replaceOrAddResponseSingle(
          action.payload,
          state.teamStatisticsDetail,
        ),
      };
    }
    case LeagueActionTypes.FETCH_SUCCESS_TEAM_OF_THE_WEEK: {
      return {
        ...state,
        status: 'idle',
        error: null,
        tow: replaceOrAddResponseSingle(
          action.payload,
          state.tow,
          (a, b) => a.id === b.id && a.date === b.date,
        ),
      };
    }
    case LeagueActionTypes.FETCH_SUCCESS_STATISTICS_TEAM: {
      return {
        ...state,
        status: 'idle',
        error: null,
        teamStatistics: replaceOrAddResponseSingle(
          action.payload,
          state.teamStatistics,
        ),
      };
    }
    case LeagueActionTypes.FETCH_ERROR: {
      return { ...state, status: 'failed', error: action.payload };
    }
    default: {
      return state;
    }
  }
};

export { reducer as leagueReducer };
