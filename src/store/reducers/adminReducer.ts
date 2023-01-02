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
  SEARCH_VIDEOS,
} from '../actions/types';

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
  switch (action.type) {
    case AdminActionTypes.FETCH_MATCH:
    case AdminActionTypes.FETCH_USER:
    case AdminActionTypes.FETCH_TEAM:
    case AdminActionTypes.CREATE_TASK:
    case AdminActionTypes.FETCH_LEAGUE:
    case AdminActionTypes.FETCH_NEWS:
    case AdminActionTypes.FETCH_VIDEO:
    case AdminActionTypes.FETCH_AD:
      return { ...state, status: 'loading' };
    case AdminActionTypes.SEARCH:
      return { ...state, statusSearch: 'loading' };
    case AdminActionTypes.FETCH_VIDEO_SUCCESS: {
      return { ...state, status: 'idle', video: action.payload };
    }
    case AdminActionTypes.CREATE_TASK_SUCCESS: {
      return { ...state, status: 'idle' };
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
    default: {
      return state;
    }
  }
};

export { reducer as adminReducer };
// reloa d
