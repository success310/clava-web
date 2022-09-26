import { Reducer } from 'redux';
import { MatchState } from '../constants';
import {
  calcNewMatchStanding,
  removeDuplicateMatchDays,
  replaceOrAddResponseMultiple,
  replaceOrAddResponseSingle,
  sameDay,
} from '../../config/utils';
import { MatchActions, MatchActionTypes } from '../actions/types';
import { CardType, ChanceType, GoalType } from '../../client/api';

const initialState: MatchState = {
  matchDays: [],
  leagueMatchDays: [],
  matches: [],
  matchElements: undefined,
  matchesOfTeam: undefined,
  leagueMatches: undefined,
  error: null,
  status: 'idle',
  searchStatus: 'idle',
  statusMatchDays: 'idle',
  bet: undefined,
  goalTypes: [],
  cardTypes: [],
  chanceTypes: [],
  locations: [],
  motm: [],
  lineupTypes: [],
  shapeComparison: [],
  matchHistory: [],
  goalDistribution: [],
  playerInFocus: [],
};

const reducer: Reducer<MatchState> = (
  // eslint-disable-next-line default-param-last
  state = initialState,
  action: MatchActions,
) => {
  switch (action.type) {
    case MatchActionTypes.RESET: {
      return {
        matchDays: [],
        leagueMatchDays: [],
        matches: [],
        matchElements: undefined,
        matchesOfTeam: undefined,
        leagueMatches: undefined,
        error: null,
        status: 'idle',
        searchStatus: 'idle',
        statusMatchDays: 'idle',
        bet: undefined,
        goalTypes: [],
        cardTypes: [],
        chanceTypes: [],
        locations: [],
        motm: [],
        lineupTypes: [],
        shapeComparison: [],
        matchHistory: [],
        goalDistribution: [],
        playerInFocus: [],
      };
    }
    case MatchActionTypes.FETCH_LEAGUE_MATCHES_TEAM:
    case MatchActionTypes.FETCH_LEAGUE_MATCHES_DAY:
    case MatchActionTypes.FETCH_MATCHES_OF_LEAGUE:
    case MatchActionTypes.FETCH_MATCH:
    case MatchActionTypes.FETCH_LINEUP_TYPES:
    case MatchActionTypes.FETCH_LINEUP:
    case MatchActionTypes.FETCH_EVENT_TYPE:
    case MatchActionTypes.FETCH_EVENTS:
    case MatchActionTypes.POST_EVENT:
    case MatchActionTypes.FETCH_MOTM:
    case MatchActionTypes.POST_MATCH:
    case MatchActionTypes.FETCH_MATCHES_OF_TEAM:
    case MatchActionTypes.FETCH_MATCH_BET:
      return { ...state, status: 'loading' };
    case MatchActionTypes.SEARCH_LOCATIONS:
      return { ...state, searchStatus: 'loading' };
    case MatchActionTypes.FETCH_EVENT_TYPE_SUCCESS: {
      const retval = {
        goalTypes:
          action.payload.id === 1
            ? (action.payload.response as GoalType[])
            : state.goalTypes,
        cardTypes:
          action.payload.id === 2
            ? (action.payload.response as CardType[])
            : state.cardTypes,
        chanceTypes:
          action.payload.id === 3
            ? (action.payload.response as ChanceType[])
            : state.chanceTypes,
      };
      return { ...state, status: 'idle', ...retval };
    }
    case MatchActionTypes.FETCH_MATCH_DAYS_LEAGUE:
    case MatchActionTypes.FETCH_MATCH_DAYS: {
      return { ...state, statusMatchDays: 'loading' };
    }
    case MatchActionTypes.FETCH_LINEUP_SUCCESS: {
      const { id, date, response } = action.payload;
      return {
        ...state,
        status: 'idle',
        matches: state.matches.map((m) =>
          m.id === id
            ? {
                ...m,
                lineupTeam1: date === 1 ? response : m.lineupTeam1,
                lineupTeam2: date === 2 ? response : m.lineupTeam2,
              }
            : m,
        ),
      };
    }
    case MatchActionTypes.FETCH_SUCCESS_MOTM: {
      return {
        ...state,
        status: 'idle',
        motm: replaceOrAddResponseSingle(action.payload, state.motm),
      };
    }
    case MatchActionTypes.FETCH_SUCCESS_GOAL_DISTRIBUTION: {
      return {
        ...state,
        status: 'idle',
        goalDistribution: replaceOrAddResponseSingle(
          action.payload,
          state.goalDistribution,
        ),
      };
    }
    case MatchActionTypes.PUT_SUCCESS_MOTM: {
      return {
        ...state,
        status: 'idle',
        motm: replaceOrAddResponseSingle(action.payload, state.motm),
      };
    }
    case MatchActionTypes.FETCH_LINEUP_TYPES_SUCCESS: {
      return { ...state, status: 'idle', lineupTypes: action.payload };
    }
    case MatchActionTypes.FETCH_MATCH_BET_SUCCESS: {
      return {
        ...state,
        status: 'idle',
        bet: action.payload,
      };
    }
    case MatchActionTypes.LOCATION_FOUND: {
      return {
        ...state,
        searchStatus: 'idle',
        locations: replaceOrAddResponseMultiple(
          action.payload,
          state.locations,
        ),
      };
    }
    case MatchActionTypes.POST_EVENT_SUCCESS: {
      return {
        ...state,
        status: 'idle',
        matches: state.matches.map((m) => {
          if (m.id === action.payload.id) {
            const newEvents = m.events.concat([action.payload.response]);
            return {
              ...m,
              ...calcNewMatchStanding(m.team1.id, newEvents),
              events: newEvents,
            };
          }
          return m;
        }),
      };
    }
    case MatchActionTypes.PATCH_EVENT_SUCCESS: {
      return {
        ...state,
        status: 'idle',
        matches: state.matches.map((m) => {
          if (m.id === action.payload.id) {
            const newEvents = m.events
              .filter((e) => e.id !== action.payload.response.id)
              .concat([action.payload.response]);
            return {
              ...m,
              events: newEvents,
            };
          }
          return m;
        }),
      };
    }
    case MatchActionTypes.DELETE_EVENT_SUCCESS: {
      return {
        ...state,
        status: 'idle',
        matches: state.matches.map((m) => {
          if (m.id === action.payload.id) {
            const newEvents = m.events.filter(
              (e) => e.id !== action.payload.response,
            );
            return {
              ...m,
              ...calcNewMatchStanding(m.team1.id, newEvents),
              events: newEvents,
            };
          }
          return m;
        }),
      };
    }
    case MatchActionTypes.POST_MATCH_SUCCESS: {
      const { location } = action.payload;
      return {
        ...state,
        status: 'idle',
        matches: replaceOrAddResponseSingle(action.payload, state.matches),
        locations: location
          ? replaceOrAddResponseSingle(location, state.locations)
          : state.locations,
      };
    }
    case MatchActionTypes.FETCH_SUCCESS_MATCH_HISTORY: {
      return {
        ...state,
        status: 'idle',
        matchHistory: replaceOrAddResponseSingle(
          action.payload,
          state.matchHistory,
        ),
      };
    }
    case MatchActionTypes.FETCH_SUCCESS_PLAYER_IN_FOCUS: {
      return {
        ...state,
        status: 'idle',
        playerInFocus: replaceOrAddResponseSingle(
          action.payload,
          state.playerInFocus,
        ),
      };
    }
    case MatchActionTypes.FETCH_SUCCESS_MATCH_DAYS: {
      return {
        ...state,
        statusMatchDays: 'idle',
        matchDays: removeDuplicateMatchDays(
          state.matchDays.concat(action.payload.map((m) => new Date(m))),
        ),
      };
    }
    case MatchActionTypes.REMOVE_MATCH_DAY: {
      return {
        ...state,
        statusMatchDays: 'idle',
        matchDays: state.matchDays.filter((d) => !sameDay(d, action.payload)),
        leagueMatchDays: state.leagueMatchDays.map((lm) => ({
          ...lm,
          response: lm.response.filter((d) => !sameDay(d, action.payload)),
        })),
      };
    }
    case MatchActionTypes.RESTORE_MATCHDAYS: {
      return {
        ...state,
        statusMatchDays: 'idle',
        matchDays: [],
        leagueMatchDays: [],
      };
    }
    case MatchActionTypes.FETCH_SUCCESS_MATCH_DAYS_LEAGUE: {
      const league = action.payload.id;
      let notFetchedJet = true;
      const { leagueMatchDays } = state;
      leagueMatchDays.forEach((matchDay, index) => {
        if (matchDay.id === league) {
          leagueMatchDays[index].response.concat(action.payload.response);
          notFetchedJet = false;
        }
      });
      if (notFetchedJet) leagueMatchDays.push(action.payload);
      return {
        ...state,
        statusMatchDays: 'idle',
        leagueMatchDays: leagueMatchDays.map((leagueMatchDay) => ({
          id: leagueMatchDay.id,
          fetchDate: new Date(),
          response:
            league === leagueMatchDay.id
              ? removeDuplicateMatchDays(leagueMatchDay.response)
              : leagueMatchDay.response,
        })),
      };
    }
    case MatchActionTypes.FETCH_SUCCESS_MATCHES: {
      const { location } = action.payload;
      return {
        ...state,
        status: 'idle',
        matches: replaceOrAddResponseSingle(action.payload, state.matches),
        locations: location
          ? replaceOrAddResponseSingle(location, state.locations)
          : state.locations,
      };
    }
    case MatchActionTypes.FETCH_SUCCESS_LEAGUE_MATCHES: {
      return {
        ...state,
        status: 'idle',
        leagueMatches: action.payload,
      };
    }
    case MatchActionTypes.FETCH_SUCCESS_MATCHES_OF_LEAGUE: {
      return {
        ...state,
        status: 'idle',
        matchElements: action.payload,
      };
    }
    case MatchActionTypes.FETCH_ERROR: {
      return {
        ...state,
        status: 'failed',
        statusMatchDays: 'failed',
        error: action.payload,
      };
    }
    case MatchActionTypes.FETCH_SUCCESS_MATCHES_OF_TEAM: {
      return {
        ...state,
        status: 'idle',
        matchesOfTeam: action.payload,
      };
    }
    case MatchActionTypes.FETCH_SUCCESS_SHAPE_COMPARISON: {
      return {
        ...state,
        status: 'idle',
        shapeComparison: replaceOrAddResponseSingle(
          action.payload,
          state.shapeComparison,
        ),
      };
    }
    case MatchActionTypes.REFRESH:
      return {
        ...state,
        status: 'idle',
        matches: state.matches.filter((m) => m.id !== action.payload),
        bet:
          state.bet && state.bet.id !== action.payload ? state.bet : undefined,
      };
    case MatchActionTypes.FETCH_EVENTS_SUCCESS:
      return {
        ...state,
        status: 'idle',
        matches: state.matches.map((m) =>
          m.id === action.payload.id
            ? { ...m, events: action.payload.response }
            : m,
        ),
      };
    default: {
      return state;
    }
  }
};

export { reducer as matchReducer };
