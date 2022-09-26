import { Reducer } from 'redux';
import { TeamState } from '../constants';
import {
  PLAYERS_PREFIX,
  SQUAD_PREFIX,
  TeamActions,
  TeamActionTypes,
} from '../actions/types';
import { replaceOrAddResponseSingle, unique } from '../../config/utils';

const initialState: TeamState = {
  value: [],
  searchValue: [],
  ofLeague: [],
  error: null,
  status: 'idle',
  players: {},
  squad: {},
  statistics: [],
  statisticsDetail: [],
  player: undefined,
  positions: [],
  squadStatus: 'idle',
};

const reducer: Reducer<TeamState> = (
  // eslint-disable-next-line default-param-last
  state = initialState,
  action: TeamActions,
) => {
  switch (action.type) {
    case TeamActionTypes.RESET: {
      return {
        value: [],
        searchValue: [],
        ofLeague: [],
        error: null,
        status: 'idle',
        players: {},
        squad: {},
        statistics: [],
        statisticsDetail: [],
        player: undefined,
        positions: [],
        squadStatus: 'idle',
      };
    }
    case TeamActionTypes.FETCH_TEAM:
    case TeamActionTypes.FETCH_PLAYERS:
    case TeamActionTypes.ADD_LOCATION:
    case TeamActionTypes.FETCH_POSITIONS:
    case TeamActionTypes.FETCH_PLAYER:
    case TeamActionTypes.FETCH_STATISTICS:
    case TeamActionTypes.SEARCH:
    case TeamActionTypes.FETCH_TEAMS_OF_LEAGUE: {
      return { ...state, status: 'loading' };
    }
    case TeamActionTypes.FETCH_SQUAD: {
      return { ...state, squadStatus: 'loading' };
    }
    case TeamActionTypes.FETCH_SUCCESS: {
      let found = false;
      return {
        ...state,
        status: 'idle',
        value:
          action.payload === null
            ? state.value
            : state.value
                .map((t) => {
                  if (t.id === action.payload.id) {
                    found = true;
                    return action.payload;
                  }
                  return t;
                })
                .concat(found ? [] : [action.payload]),
      };
    }
    case TeamActionTypes.FETCH_SUCCESS_POSITIONS: {
      return {
        ...state,
        status: 'idle',
        positions: action.payload,
      };
    }
    case TeamActionTypes.FETCH_SUCCESS_SQUAD: {
      const newSquads = state.squad;
      newSquads[`${SQUAD_PREFIX}${action.payload.id}`] = action.payload;
      return {
        ...state,
        status: 'idle',
        squadStatus: 'idle',
        squad: newSquads,
      };
    }
    case TeamActionTypes.TEAM_FOUND: {
      return {
        ...state,
        status: 'idle',
        searchValue: unique(state.searchValue.concat(action.payload)),
      };
    }
    case TeamActionTypes.FETCH_SUCCESS_PLAYERS: {
      const newPlayers = state.players;
      newPlayers[`${PLAYERS_PREFIX}${action.payload.id}`] = action.payload;
      return {
        ...state,
        status: 'idle',
        players: newPlayers,
      };
    }
    case TeamActionTypes.ADD_SPONSOR_SUCCESS: {
      const teamId = action.payload.id;
      let found = false;
      return {
        ...state,
        status: 'idle',
        value: state.value.map((t) =>
          t.id === teamId
            ? {
                ...t,
                sponsors: t.sponsors
                  .map((s) => {
                    if (s.id === action.payload.response.id) {
                      found = true;
                      return action.payload.response;
                    }
                    return s;
                  })
                  .concat(found ? [] : [action.payload.response]),
              }
            : t,
        ),
      };
    }
    case TeamActionTypes.REMOVE_SPONSOR_SUCCESS: {
      const teamId = action.payload.id;
      return {
        ...state,
        status: 'idle',
        value: state.value.map((t) =>
          t.id === teamId
            ? {
                ...t,
                sponsors: t.sponsors.filter(
                  (s) => s.id !== action.payload.response,
                ),
              }
            : t,
        ),
      };
    }
    case TeamActionTypes.ADD_LOCATION_SUCCESS: {
      return {
        ...state,
        status: 'idle',
        value: state.value.map((t) =>
          t.id === action.payload.id ? action.payload : t,
        ),
      };
    }
    case TeamActionTypes.FETCH_SUCCESS_PLAYER: {
      return {
        ...state,
        status: 'idle',
        player: action.payload,
      };
    }
    case TeamActionTypes.PATCH_SUCCESS_PLAYER: {
      const newSquad = state.squad;
      if (`${SQUAD_PREFIX}${action.payload.id}` in newSquad) {
        newSquad[`${SQUAD_PREFIX}${action.payload.id}`].response = newSquad[
          `${SQUAD_PREFIX}${action.payload.id}`
        ].response.map((p) => {
          if (p.player.id === action.payload.response.id) {
            return { ...p, player: action.payload.response };
          }
          return p;
        });
      }
      const newPlayers = state.players;
      if (`${PLAYERS_PREFIX}${action.payload.id}` in newPlayers) {
        newPlayers[`${PLAYERS_PREFIX}${action.payload.id}`].response =
          newPlayers[`${PLAYERS_PREFIX}${action.payload.id}`].response.map(
            (p) => {
              if (p.id === action.payload.response.id) {
                return { ...action.payload.response };
              }
              return p;
            },
          );
      }
      return {
        ...state,
        status: 'idle',
        player: action.payload.response,
        squad: newSquad,
        players: newPlayers,
      };
    }
    case TeamActionTypes.FETCH_SUCCESS_STATISTICS_DETAIL: {
      return {
        ...state,
        status: 'idle',
        statisticsDetail: replaceOrAddResponseSingle(
          action.payload,
          state.statisticsDetail,
          (a, b) => a.id === b.id && a.date === b.date,
        ),
      };
    }
    case TeamActionTypes.FETCH_SUCCESS_STATISTICS: {
      return {
        ...state,
        status: 'idle',
        statistics: replaceOrAddResponseSingle(
          action.payload,
          state.statistics,
        ),
      };
    }
    case TeamActionTypes.FETCH_SUCCESS_OF_LEAGUE: {
      const { ofLeague } = state;
      ofLeague.push(action.payload);
      const { response } = action.payload;
      return {
        ...state,
        status: 'idle',
        ofLeague,
        searchValue: unique(state.searchValue.concat(response)),
      };
    }
    case TeamActionTypes.SEARCH_ERROR:
    case TeamActionTypes.FETCH_ERROR: {
      return { ...state, status: 'failed', error: action.payload };
    }
    default: {
      return state;
    }
  }
};

export { reducer as teamReducer };
