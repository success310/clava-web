import { Reducer } from 'redux';
import { ServerState } from '../constants';
import { ServerActions, ServerActionTypes } from '../actions/types';

const initialState: ServerState = {
  status: true,
  networkStatus: true,
  error: null,
  notifications: [],
};

const reducer: Reducer<ServerState> = (
  // eslint-disable-next-line default-param-last
  state = initialState,
  action: ServerActions,
) => {
  switch (action.type) {
    case ServerActionTypes.OK: {
      return { ...state, status: true, networkStatus: true };
    }
    case ServerActionTypes.NO_CONNECTION: {
      return { ...state, networkStatus: false };
    }
    case ServerActionTypes.GONE: {
      return { ...state, status: false };
    }
    case ServerActionTypes.NEW_NOTIFICATION: {
      return {
        ...state,
        notifications: state.notifications.concat([action.payload]),
      };
    }
    case ServerActionTypes.NOTIFICATION_SHOWN: {
      return { ...state, notifications: state.notifications.slice(1) };
    }
    default: {
      return state;
    }
  }
};

export { reducer as serverReducer };
