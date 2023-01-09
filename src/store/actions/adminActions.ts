import { Dispatch } from 'redux';
import client from '../../client';
import {
  AdminActions,
  AdminActionTypes,
  CACHE_TASK,
  SEARCH_ADS,
  SEARCH_LEAGUES,
  SEARCH_LOCATION,
  SEARCH_MATCH,
  SEARCH_TEAMS,
  SEARCH_TYPES,
  SEARCH_VIDEOS,
  STATISTICS_TASK,
  TASK_TYPES,
} from './types';
import { defaultGet } from './all';
import { IDType } from '../../config/types';
import {
  AdCreate,
  AdPatch,
  ExternalVideoCreateRaw,
  LeagueCreate,
  LeaguePatch,
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
export function getLeague(dispatch: Dispatch<AdminActions>, leagueId: IDType) {
  defaultGet(
    dispatch,
    AdminActionTypes.FETCH_LEAGUE_SUCCESS,
    AdminActionTypes.FETCH_ERROR,
    AdminActionTypes.FETCH_LEAGUE,
    client().getLeague,
    false,
    false,
    leagueId,
  );
}

export function getAd(dispatch: Dispatch<AdminActions>, adId: IDType) {
  defaultGet(
    dispatch,
    AdminActionTypes.FETCH_AD_SUCCESS,
    AdminActionTypes.FETCH_ERROR,
    AdminActionTypes.FETCH_AD,
    client().getAd,
    false,
    false,
    adId,
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

export function createLeague(
  dispatch: Dispatch<AdminActions>,
  league: LeagueCreate,
) {
  defaultGet(
    dispatch,
    AdminActionTypes.FETCH_LEAGUE_SUCCESS,
    AdminActionTypes.FETCH_ERROR,
    AdminActionTypes.FETCH_LEAGUE,
    client().createLeague,
    false,
    false,
    league,
  );
}

export function deleteLeague(dispatch: Dispatch<AdminActions>, id: IDType) {
  defaultGet(
    dispatch,
    AdminActionTypes.FETCH_LEAGUE_SUCCESS,
    AdminActionTypes.FETCH_ERROR,
    AdminActionTypes.FETCH_LEAGUE,
    client().deleteLeague,
    false,
    false,
    id,
  );
}

export function patchLeague(
  dispatch: Dispatch<AdminActions>,
  id: IDType,
  league: LeaguePatch,
) {
  defaultGet(
    dispatch,
    AdminActionTypes.FETCH_LEAGUE_SUCCESS,
    AdminActionTypes.FETCH_ERROR,
    AdminActionTypes.FETCH_LEAGUE,
    client().patchLeague,
    false,
    false,
    id,
    league,
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
export function deleteMatch(dispatch: Dispatch<AdminActions>, id: IDType) {
  defaultGet(
    dispatch,
    AdminActionTypes.FETCH_MATCH_SUCCESS,
    AdminActionTypes.FETCH_ERROR,
    AdminActionTypes.FETCH_MATCH,
    client().deleteMatch,
    false,
    false,
    id,
  );
}
export function createMatchMultiple(
  dispatch: Dispatch<AdminActions>,
  match: MatchCreate[],
) {
  defaultGet(
    dispatch,
    AdminActionTypes.FETCH_MATCH_SUCCESS,
    AdminActionTypes.FETCH_ERROR,
    AdminActionTypes.FETCH_MATCH,
    client().createMatchMultiple,
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
export function patchAd(
  dispatch: Dispatch<AdminActions>,
  id: IDType,
  ad: AdPatch,
) {
  defaultGet(
    dispatch,
    AdminActionTypes.FETCH_AD_SUCCESS,
    AdminActionTypes.FETCH_ERROR,
    AdminActionTypes.FETCH_AD,
    client().patchAd,
    false,
    false,
    id,
    ad,
  );
}
export function createAd(dispatch: Dispatch<AdminActions>, ad: AdCreate) {
  defaultGet(
    dispatch,
    AdminActionTypes.FETCH_AD_SUCCESS,
    AdminActionTypes.FETCH_ERROR,
    AdminActionTypes.FETCH_AD,
    client().createAd,
    false,
    false,
    ad,
  );
}
export function deleteAd(dispatch: Dispatch<AdminActions>, id: IDType) {
  defaultGet(
    dispatch,
    AdminActionTypes.FETCH_AD_SUCCESS,
    AdminActionTypes.FETCH_ERROR,
    AdminActionTypes.FETCH_AD,
    client().deleteAd,
    false,
    false,
    id,
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
      : type === SEARCH_LOCATION
      ? client().searchLocations
      : type === SEARCH_MATCH
      ? client().searchMatches
      : type === SEARCH_ADS
      ? client().searchAds
      : client().searchLeagues,
    false,
    { id: type },
    q,
    0,
    100,
  );
}

export function createTask(
  dispatch: Dispatch<AdminActions>,
  key: string,
  type: TASK_TYPES,
) {
  defaultGet(
    dispatch,
    AdminActionTypes.CREATE_TASK_SUCCESS,
    AdminActionTypes.FETCH_ERROR,
    AdminActionTypes.CREATE_TASK,
    type === CACHE_TASK
      ? client().clearCache
      : type === STATISTICS_TASK
      ? client().forceRecalculateStatistics
      : client().forceRecalculateSquad,
    false,
    false,
    key,
  );
}

// asf
