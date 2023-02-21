import { Reducer } from 'redux';
import { AdminState } from '../constants';
import {
  AdminActions,
  AdminActionTypes,
  SEARCH_ADS,
  SEARCH_LEAGUES,
  SEARCH_LOCATION,
  SEARCH_MATCH,
  SEARCH_TEAMS,
  SEARCH_USERS,
  SEARCH_VIDEOS,
} from '../actions/types';
import { getGoalEvents } from '../../config/utils';

const initialState: AdminState = {
  user: null,
  users: [],
  league: null,
  leagues: [],
  match: null,
  matches: [],
  team: null,
  teams: [],
  location: null,
  locations: [],
  ad: null,
  ads: [],
  badges: [],
  news: null,
  newses: [],
  video: null,
  videos: [],
  error: null,
  status: 'idle',
  statusSearch: 'idle',
};

const reducer: Reducer<AdminState> = (
  // eslint-disable-next-line default-param-last
  state = initialState,
  action: AdminActions,
) => {
  let found = false;
  switch (action.type) {
    case AdminActionTypes.FETCH_MATCH:
    case AdminActionTypes.FETCH_USER:
    case AdminActionTypes.FETCH_TEAM:
    case AdminActionTypes.CREATE_TASK:
    case AdminActionTypes.FETCH_LEAGUE:
    case AdminActionTypes.FETCH_BADGES:
    case AdminActionTypes.FETCH_NEWS:
    case AdminActionTypes.FETCH_VIDEO:
    case AdminActionTypes.FETCH_AD:
      return { ...state, status: 'loading' };
    case AdminActionTypes.FETCH_BADGES_SUCCESS:
      return { ...state, status: 'idle', badges: action.payload };
    case AdminActionTypes.FETCH_ERROR: {
      return { ...state, status: 'failed', error: action.payload };
    }
    case AdminActionTypes.PATCH_BADGE_SUCCESS:
      return {
        ...state,
        status: 'idle',
        badges: state.badges
          .map((b) => {
            if (b.badgeType === action.payload.badgeType) {
              found = true;
              return action.payload;
            }
            return b;
          })
          .concat(found ? [] : [action.payload]),
      };
    case AdminActionTypes.SEARCH:
      return { ...state, statusSearch: 'loading' };
    case AdminActionTypes.FETCH_VIDEO_SUCCESS: {
      return { ...state, status: 'idle', video: action.payload };
    }
    case AdminActionTypes.FETCH_AD_SUCCESS: {
      return { ...state, status: 'idle', ad: action.payload };
    }
    case AdminActionTypes.CREATE_TASK_SUCCESS: {
      return { ...state, status: 'idle' };
    }
    case AdminActionTypes.FETCH_LEAGUE_SUCCESS: {
      return { ...state, status: 'idle', league: action.payload };
    }
    case AdminActionTypes.SEARCH_SUCCESS: {
      if (action.payload.id === SEARCH_VIDEOS)
        return {
          ...state,
          statusSearch: 'idle',
          videos: action.payload.response,
        };
      if (action.payload.id === SEARCH_LEAGUES)
        return {
          ...state,
          statusSearch: 'idle',
          leagues: action.payload.response,
        };
      if (action.payload.id === SEARCH_TEAMS)
        return {
          ...state,
          statusSearch: 'idle',
          teams: action.payload.response,
        };
      if (action.payload.id === SEARCH_ADS)
        return { ...state, statusSearch: 'idle', ads: action.payload.response };
      if (action.payload.id === SEARCH_MATCH)
        return {
          ...state,
          statusSearch: 'idle',
          matches: action.payload.response,
        };
      if (action.payload.id === SEARCH_LOCATION)
        return {
          ...state,
          statusSearch: 'idle',
          locations: action.payload.response,
        };
      if (action.payload.id === SEARCH_USERS)
        return {
          ...state,
          statusSearch: 'idle',
          users: action.payload.response,
        };
      return state;
    }
    case AdminActionTypes.FETCH_MATCH_SUCCESS:
      if (Array.isArray(action.payload))
        return {
          ...state,
          status: 'idle',
          matches: action.payload,
        };
      return {
        ...state,
        status: 'idle',
        match: action.payload,
      };
    case AdminActionTypes.FETCH_EVENT_SUCCESS: {
      if (state.match && state.match.id === action.payload.id) {
        const newEvents = state.match.events.concat([action.payload.response]);
        return {
          ...state,
          status: 'idle',
          match: {
            ...state.match,

            goal1: getGoalEvents(newEvents, state.match.team1.id).length,
            goal2: getGoalEvents(newEvents, state.match.team2.id).length,
            events: newEvents,
          },
        };
      }
      return {
        ...state,
        status: 'idle',
      };
    }
    case AdminActionTypes.DELETE_EVENT_SUCCESS: {
      if (state.match) {
        const newEvents = state.match.events.filter(
          (e) => e.id !== action.payload,
        );
        return {
          ...state,
          status: 'idle',
          match: state.match
            ? {
                ...state.match,
                goal1: getGoalEvents(newEvents, state.match.team1.id).length,
                goal2: getGoalEvents(newEvents, state.match.team2.id).length,
                events: newEvents,
              }
            : null,
        };
      }
      return {
        ...state,
        status: 'idle',
      };
    }
    default: {
      return state;
    }
  }
};

export { reducer as adminReducer };
// reloa d
