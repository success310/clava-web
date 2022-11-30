import { Reducer } from 'redux';
import { NewsState } from '../constants';
import { NewsActions, NewsActionTypes } from '../actions/types';
import { unique } from '../../config/utils';

const initialState: NewsState = {
  statusBulletins: 'idle',
  statusNews: 'idle',
  statusTransfers: 'idle',
  statusVideos: 'idle',
  news: [],
  videos: [],
  transfers: [],
  bulletins: [],
  error: null,
};

const reducer: Reducer<NewsState> = (
  // eslint-disable-next-line default-param-last
  state = initialState,
  action: NewsActions,
) => {
  switch (action.type) {
    case NewsActionTypes.FETCH_NEWS: {
      return { ...state, statusNews: 'loading' };
    }
    case NewsActionTypes.FETCH_TRANSFERS: {
      return { ...state, statusTransfers: 'loading' };
    }
    case NewsActionTypes.FETCH_VIDEOS: {
      return { ...state, statusTransfers: 'loading' };
    }
    case NewsActionTypes.FETCH_BULLETINS: {
      return { ...state, statusBulletins: 'loading' };
    }
    case NewsActionTypes.FETCH_NEWS_SUCCESS: {
      return {
        ...state,
        statusNews: 'idle',
        news: unique(state.news.concat(action.payload)),
      };
    }
    case NewsActionTypes.FETCH_TRANSFERS_SUCCESS: {
      return {
        ...state,
        statusTransfers: 'idle',
        transfers: state.transfers.concat(action.payload),
      };
    }
    case NewsActionTypes.FETCH_VIDEOS_SUCCESS: {
      return {
        ...state,
        statusVideos: 'idle',
        videos: state.videos.concat(action.payload),
      };
    }
    case NewsActionTypes.CREATE_VIDEOS_SUCCESS: {
      return {
        ...state,
        statusVideos: 'idle',
        videos: state.videos.concat([action.payload]),
      };
    }
    case NewsActionTypes.FETCH_BULLETINS_SUCCESS: {
      return {
        ...state,
        statusBulletins: 'idle',
        bulletins: state.bulletins.concat(action.payload),
      };
    }
    case NewsActionTypes.FETCH_MIXED_SUCCESS: {
      return {
        ...state,
        statusNews: 'idle',
        ...action.payload,
      };
    }
    case NewsActionTypes.RESET: {
      return {
        ...state,
        statusVideos: 'loading',
        statusBulletins: 'loading',
        statusTransfers: 'loading',
        statusNews: 'loading',
        news: [],
        videos: [],
        transfers: [],
        bulletins: [],
      };
    }
    case NewsActionTypes.REFRESH: {
      return { ...state, ...action.payload };
    }
    case NewsActionTypes.FETCH_ERROR: {
      return {
        ...state,
        statusNews: 'failed',
        statusBulletins: 'failed',
        statusTransfers: 'failed',
        statusVideos: 'failed',
        error: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export { reducer as newsReducer };
