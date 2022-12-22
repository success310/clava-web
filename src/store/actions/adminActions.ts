import { Dispatch } from 'redux';
import client from '../../client';
import {
  AdminActions,
  AdminActionTypes,
  SEARCH_LEAGUES,
  SEARCH_TEAMS,
  SEARCH_TYPES,
  SEARCH_VIDEOS,
} from './types';
import { defaultGet } from './all';
import { IDType } from '../../config/types';
import {
  ExternalVideoCreateRaw,
  MatchCreate,
  MatchPatch,
} from '../../client/api';

export function getMatch(dispatch: Dispatch<AdminActions>, matchId: IDType) {
  defaultGet(
    dispatch,
    AdminActionTypes.FETCH_MATCH_SUCCESS,
    AdminActionTypes.FETCH_ERROR,
    AdminActionTypes.FETCH_MATCH,
    client().getMatch,
    false,
    false,
    matchId,
  );
}

export function createVideo(
  dispatch: Dispatch<AdminActions>,
  video: ExternalVideoCreateRaw,
) {
  defaultGet(
    dispatch,
    AdminActionTypes.FETCH_VIDEO_SUCCESS,
    AdminActionTypes.FETCH_ERROR,
    AdminActionTypes.FETCH_VIDEO,
    client().createVideo,
    false,
    false,
    video,
  );
}

export function createMatch(
  dispatch: Dispatch<AdminActions>,
  match: MatchCreate,
) {
  defaultGet(
    dispatch,
    AdminActionTypes.FETCH_MATCH_SUCCESS,
    AdminActionTypes.FETCH_ERROR,
    AdminActionTypes.FETCH_MATCH,
    client().createMatch,
    false,
    false,
    match,
  );
}
export function patchMatch(
  dispatch: Dispatch<AdminActions>,
  id: IDType,
  match: MatchPatch,
) {
  defaultGet(
    dispatch,
    AdminActionTypes.FETCH_MATCH_SUCCESS,
    AdminActionTypes.FETCH_ERROR,
    AdminActionTypes.FETCH_MATCH,
    client().patchMatch,
    false,
    false,
    id,
    match,
  );
}
export function getVideo(dispatch: Dispatch<AdminActions>, id: IDType) {
  dispatch({ type: AdminActionTypes.FETCH_VIDEO });
  client()
    .fetchVideos(1, 0, 10)
    .then(
      (v) => {
        const video = v.find((vi) => vi.id === id);
        if (video) {
          dispatch({
            type: AdminActionTypes.FETCH_VIDEO_SUCCESS,
            payload: video,
          });
        } else {
          dispatch({ type: AdminActionTypes.FETCH_ERROR, payload: 'failed' });
        }
      },
      () => {
        dispatch({ type: AdminActionTypes.FETCH_ERROR, payload: 'failed' });
      },
    );
}
// reload

export function searchAdmin(
  dispatch: Dispatch<AdminActions>,
  q: string,
  type: SEARCH_TYPES,
) {
  defaultGet(
    dispatch,
    AdminActionTypes.SEARCH_SUCCESS,
    AdminActionTypes.FETCH_ERROR,
    AdminActionTypes.SEARCH,
    type === SEARCH_VIDEOS
      ? client().searchVideos
      : type === SEARCH_LEAGUES
      ? client().searchLeagues
      : type === SEARCH_TEAMS
      ? client().searchTeams
      : client().searchLeagues,
    false,
    { id: type },
    q,
    0,
    100,
  );
}

// as f
