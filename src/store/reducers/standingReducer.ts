import { Reducer } from 'redux';
import { StandingState } from '../constants';
import { StandingActions, StandingActionTypes } from '../actions/types';
import { replaceOrAddResponseSingle } from '../../config/utils';

const initialState: StandingState = {
  value: [],
  error: null,
  status: 'idle',
};

const reducer: Reducer<StandingState> = (
  // eslint-disable-next-line default-param-last
  state = initialState,
  action: StandingActions,
) => {
  switch (action.type) {
    case StandingActionTypes.FETCH_BY_LEAGUE: {
      return { ...state, status: 'loading' };
    }
    case StandingActionTypes.FETCH_SUCCESS: {
      return {
        ...state,
        status: 'idle',
        value: replaceOrAddResponseSingle(action.payload, state.value),
      };
    }
    case StandingActionTypes.FETCH_ERROR: {
      return { ...state, status: 'failed', error: action.payload };
    }
    case StandingActionTypes.RESET:
    case StandingActionTypes.REFRESH:
      return {
        status: 'idle',
        error: null,
        value: [],
      };
    default: {
      return state;
    }
  }
};

export { reducer as standingReducer };
