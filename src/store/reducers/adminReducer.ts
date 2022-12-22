import { Reducer } from 'redux';
import { AdminState } from '../constants';
import {
  AdminActions,
  AdminActionTypes,
  SEARCH_ADS,
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
    case AdminActionTypes.SEARCH_SUCCESS: {
      if (action.payload.id === SEARCH_VIDEOS)
        return {
          ...state,
          statusSearch: 'idle',
          videos: action.payload.response,
        };
      if (action.payload.id === SEARCH_ADS)
        return { ...state, statusSearch: 'idle', ads: action.payload.response };
      return state;
    }
    default: {
      return state;
    }
  }
};

export { reducer as adminReducer };
