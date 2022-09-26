import { Reducer } from 'redux';
import { SEARCH_STORAGE_KEY, SearchState } from '../constants';
import { SearchActions, SearchActionTypes } from '../actions/types';

const initialState: SearchState = {
  prevQueries: [],
  status: 'idle',
  result: undefined,
  error: null,
};

const reducer: Reducer<SearchState> = (
  // eslint-disable-next-line default-param-last
  state = initialState,
  action: SearchActions,
) => {
  switch (action.type) {
    case SearchActionTypes.GET_PREV_QUERIES:
    case SearchActionTypes.SEARCH: {
      return { ...state, status: 'loading' };
    }
    case SearchActionTypes.RESET_SEARCH: {
      return { ...state, status: 'idle', result: undefined };
    }
    case SearchActionTypes.REMOVE_HISTORY_ELEM: {
      const { id } = action.payload.query;
      const newQueries = state.prevQueries.filter(
        (q) => !(q.query.id === id && q.type === action.payload.type),
      );
      window.localStorage.setItem(
        SEARCH_STORAGE_KEY,
        JSON.stringify(newQueries),
      );
      return { ...state, status: 'idle', prevQueries: newQueries };
    }
    case SearchActionTypes.SEARCH_SUCCESS: {
      const thisResult = action.payload;
      return {
        ...state,
        status: 'idle',
        result: thisResult,
      };
    }
    case SearchActionTypes.SEARCH_SUCCESS_EXT: {
      const thisResult = action.payload;
      const oldResult = state.result;
      if (oldResult && oldResult.query === thisResult.query)
        return {
          ...state,
          status: 'idle',
          result: {
            query: oldResult.query,
            leagues: oldResult.leagues.concat(thisResult.leagues),
            players: oldResult.players.concat(thisResult.players),
            teams: oldResult.teams.concat(thisResult.teams),
          },
        };
      return {
        ...state,
        status: 'idle',
        result: thisResult,
      };
    }
    case SearchActionTypes.CLICK_SEARCH_RESULT: {
      const { prevQueries } = state;
      let found = false;
      const { id } = action.payload.query;
      const newQueries = prevQueries.map((q) => {
        if (q.query.id === id) {
          found = true;
          return {
            ...q,
            hits: q.hits + 1,
          };
        }
        return q;
      });
      if (!found) {
        newQueries.push({
          ...action.payload,
          lastPerformed: new Date().getTime(),
          hits: 1,
        });
      }
      window.localStorage.setItem(
        SEARCH_STORAGE_KEY,
        JSON.stringify(newQueries),
      );
      return { ...state, prevQueries: newQueries };
    }
    case SearchActionTypes.FOUND_PREV_SEARCHES: {
      return { ...state, status: 'idle', prevQueries: action.payload };
    }
    default: {
      return state;
    }
  }
};

export { reducer as searchReducer };
