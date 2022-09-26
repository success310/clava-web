import { Reducer } from 'redux';
import { RouteState } from '../constants';
import { RouteActions, RouteActionTypes } from '../actions/types';

const initialState: RouteState = {
  settings: false,
  search: false,
  logs: false,
  status: 'idle',
  error: null,
  shareContent: undefined,
};

const reducer: Reducer<RouteState> = (
  // eslint-disable-next-line default-param-last
  state = initialState,
  action: RouteActions,
) => {
  switch (action.type) {
    case RouteActionTypes.OPEN_SETTINGS: {
      return { ...state, settings: true };
    }
    case RouteActionTypes.CLOSE_SETTINGS: {
      return { ...state, settings: false };
    }
    case RouteActionTypes.OPEN_LOG: {
      return { ...state, logs: true };
    }
    case RouteActionTypes.CLOSE_LOG: {
      return { ...state, logs: false };
    }
    case RouteActionTypes.OPEN_SEARCH: {
      return { ...state, search: true };
    }
    case RouteActionTypes.CLOSE_SEARCH: {
      return { ...state, search: false };
    }
    case RouteActionTypes.SHARE: {
      return { ...state, shareContent: action.payload };
    }
    case RouteActionTypes.SHARE_EXIT: {
      return { ...state, shareContent: undefined };
    }
    default: {
      return state;
    }
  }
};

export { reducer as routeReducer };
