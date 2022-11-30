import { Action, Dispatch } from 'redux';
import { NewsActions, NewsActionTypes } from './types';
import { defaultGet } from './all';
import client from '../../client';
import { IDType } from '../../config/types';
import { ExternalVideoCreateRaw } from '../../client/api';

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
    NewsActionTypes.FETCH_VIDEOS,
    client().fetchVideos,
    false,
    false,
    aoiId,
    offset,
    limit,
  );
}

export function createVideo(
  dispatch: Dispatch<Action<NewsActions>>,
  video: ExternalVideoCreateRaw,
) {
  defaultGet(
    dispatch,
    NewsActionTypes.FETCH_VIDEOS_SUCCESS,
    NewsActionTypes.FETCH_ERROR,
    NewsActionTypes.FETCH_VIDEOS,
    client().createVideo,
    false,
    false,
    video,
  );
}

export function fetchBulletins(
  dispatch: Dispatch<Action<NewsActions>>,
  aoiId: IDType,
  offset: number,
  limit: number,
) {
  defaultGet(
    dispatch,
    NewsActionTypes.FETCH_BULLETINS_SUCCESS,
    NewsActionTypes.FETCH_ERROR,
    NewsActionTypes.FETCH_BULLETINS,
    client().fetchBulletins,
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
    NewsActionTypes.FETCH_TRANSFERS,
    client().fetchTransfers,
    false,
    false,
    aoiId,
    offset,
    limit,
  );
}

export function fetchMixed(
  dispatch: Dispatch<Action<NewsActions>>,
  aoiId: IDType,
) {
  defaultGet(
    dispatch,
    NewsActionTypes.FETCH_MIXED_SUCCESS,
    NewsActionTypes.FETCH_ERROR,
    NewsActionTypes.FETCH_TRANSFERS,
    client().fetchMixed,
    false,
    false,
    aoiId,
  );
}
