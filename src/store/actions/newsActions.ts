import { Action, Dispatch } from 'redux';
import { NewsActions, NewsActionTypes } from './types';
import { defaultGet } from './all';
import client from '../../client';
import { IDType } from '../../config/types';

export function fetchNews(
  dispatch: Dispatch<Action<NewsActions>>,
  aoiId: IDType,
  offset: number,
  limit: number,
) {
  defaultGet(
    dispatch,
    NewsActionTypes.FETCH_NEWS_SUCCESS,
    NewsActionTypes.FETCH_ERROR,
    NewsActionTypes.FETCH_NEWS,
    client().fetchNews,
    false,
    false,
    aoiId,
    offset,
    limit,
  );
}

export function fetchVideos(
  dispatch: Dispatch<Action<NewsActions>>,
  aoiId: IDType,
  offset: number,
  limit: number,
) {
  defaultGet(
    dispatch,
    NewsActionTypes.FETCH_VIDEOS_SUCCESS,
    NewsActionTypes.FETCH_ERROR,
    NewsActionTypes.FETCH_NEWS,
    client().fetchVideos,
    false,
    false,
    aoiId,
    offset,
    limit,
  );
}

export function fetchTransfers(
  dispatch: Dispatch<Action<NewsActions>>,
  aoiId: IDType,
  offset: number,
  limit: number,
) {
  defaultGet(
    dispatch,
    NewsActionTypes.FETCH_TRANSFERS_SUCCESS,
    NewsActionTypes.FETCH_ERROR,
    NewsActionTypes.FETCH_NEWS,
    client().fetchTransfers,
    false,
    false,
    aoiId,
    offset,
    limit,
  );
}
