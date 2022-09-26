import { Reducer } from 'redux';
import { NewsState } from '../constants';
import { NewsActions, NewsActionTypes } from '../actions/types';
import { unique } from '../../config/utils';

const initialState: NewsState = {
  status: 'idle',
  news: [],
  videos: [],
  transfers: [],
  error: null,
};

const reducer: Reducer<NewsState> = (
  // eslint-disable-next-line default-param-last
  state = initialState,
  action: NewsActions,
) => {
  switch (action.type) {
    case NewsActionTypes.FETCH_NEWS: {
      return { ...state, status: 'loading' };
    }
    case NewsActionTypes.FETCH_NEWS_SUCCESS: {
      return {
        ...state,
        status: 'idle',
        news: unique(state.news.concat(action.payload)),
      };
    }
    case NewsActionTypes.FETCH_TRANSFERS_SUCCESS: {
      return {
        ...state,
        status: 'idle',
        transfers: state.transfers.concat(action.payload),
      };
    }
    case NewsActionTypes.FETCH_VIDEOS_SUCCESS: {
      return {
        ...state,
        status: 'idle',
        videos: state.videos.concat(action.payload),
      };
    }
    case NewsActionTypes.RESET: {
      return {
        ...state,
        status: 'loading',
        news: [],
        videos: [],
        transfers: [],
      };
    }
    case NewsActionTypes.REFRESH: {
      return { ...state, status: 'loading', ...action.payload };
    }
    case NewsActionTypes.FETCH_ERROR: {
      return { ...state, error: action.payload };
    }
    default: {
      return state;
    }
  }
};

export { reducer as newsReducer };
