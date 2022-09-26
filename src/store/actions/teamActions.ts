import {Action, Dispatch} from 'redux';
import client from '../../client';
import {IDType} from '../../config/types';
import {defaultGet, fetchError} from './all';
import {TeamActions, TeamActionTypes} from './types';
import {
  LocationCreate,
  PlayerCreate,
  PlayerPatch,
  SponsorCreate,
  SponsorPatch,
  StatisticKeyEnum,
  TeamPatch,
} from '../../client/api';
import {numberedHash} from '../../config/utils';

export function fetchTeamsOfLeague(
  dispatch: Dispatch<TeamActions>,
  id: IDType,
) {
  defaultGet(
    dispatch,
    TeamActionTypes.FETCH_SUCCESS_OF_LEAGUE,
    TeamActionTypes.FETCH_ERROR,
    TeamActionTypes.FETCH_TEAMS_OF_LEAGUE,
    client().getTeamsOfLeague,
    false,
    {id},
    id,
  );
}

export function fetchTeam(dispatch: Dispatch<TeamActions>, id: IDType) {
  defaultGet(
    dispatch,
    TeamActionTypes.FETCH_SUCCESS,
    TeamActionTypes.FETCH_ERROR,
    TeamActionTypes.FETCH_TEAM,
    client().getTeam,
    false,
    false,
    id,
  );
}

export function searchTeamAutocomplete(
  dispatch: Dispatch<Action<TeamActionTypes>>,
  query: string,
) {
  if (query === '') dispatch({type: TeamActionTypes.TEAM_FOUND, payload: []});
  else {
    defaultGet(
      dispatch,
      TeamActionTypes.TEAM_FOUND,
      TeamActionTypes.SEARCH_ERROR,
      TeamActionTypes.SEARCH,
      client().searchTeamAutocomplete,
      false,
      false,
      query,
    );
  }
}
export function fetchPlayers(dispatch: Dispatch<TeamActions>, id: IDType) {
  defaultGet(
    dispatch,
    TeamActionTypes.FETCH_SUCCESS_PLAYERS,
    TeamActionTypes.FETCH_ERROR,
    TeamActionTypes.FETCH_PLAYERS,
    client().getPlayersOfTeam,
    false,
    {id},
    id,
  );
}

export function fetchPlayer(dispatch: Dispatch<TeamActions>, id: IDType) {
  defaultGet(
    dispatch,
    TeamActionTypes.FETCH_SUCCESS_PLAYER,
    TeamActionTypes.FETCH_ERROR,
    TeamActionTypes.FETCH_PLAYER,
    client().getPlayer,
    false,
    false,
    id,
  );
}

export function patchPlayer(
  dispatch: Dispatch<Action<TeamActionTypes>>,
  playerID: IDType,
  teamId: IDType,
  player: PlayerPatch,
) {
  defaultGet(
    dispatch,
    TeamActionTypes.PATCH_SUCCESS_PLAYER,
    TeamActionTypes.FETCH_ERROR,
    TeamActionTypes.FETCH_PLAYER,
    client().patchPlayer,
    false,
    {id: teamId},
    playerID,
    player,
  );
}

export function patchPlayerSquad(
  dispatch: Dispatch<Action<TeamActionTypes>>,
  playerID: IDType,
  teamId: IDType,
  player: PlayerPatch,
) {
  dispatch({type: TeamActionTypes.FETCH_SQUAD});
  client()
    .patchPlayer(playerID, player)
    .then(
      _ => {
        getSquad(dispatch, teamId);
      },
      e => fetchError(e, TeamActionTypes.FETCH_ERROR, dispatch),
    );
}

export function doTransfer(
  dispatch: Dispatch<Action<TeamActionTypes>>,
  playerId: IDType,
  teamId: IDType,
  newTeamId: IDType,
) {
  dispatch({type: TeamActionTypes.FETCH_SQUAD});
  client()
    .doTransfer(playerId, teamId, newTeamId)
    .then(
      _ => {
        getSquad(dispatch, teamId);
        getSquad(dispatch, newTeamId);
      },
      e => fetchError(e, TeamActionTypes.FETCH_ERROR, dispatch),
    );
}
export function addPlayer(
  dispatch: Dispatch<Action<TeamActionTypes>>,
  teamID: IDType,
  playerPost: PlayerCreate,
) {
  dispatch({type: TeamActionTypes.FETCH_SQUAD});
  client()
    .addPlayer(playerPost)
    .then(
      _ => {
        getSquad(dispatch, teamID);
      },
      e => fetchError(e, TeamActionTypes.FETCH_ERROR, dispatch),
    );
}
export function removePlayer(
  dispatch: Dispatch<Action<TeamActionTypes>>,
  teamID: IDType,
  playerID: IDType,
) {
  dispatch({type: TeamActionTypes.FETCH_SQUAD});
  client()
    .removePlayer(playerID)
    .then(
      _ => {
        getSquad(dispatch, teamID);
      },
      e => fetchError(e, TeamActionTypes.FETCH_ERROR, dispatch),
    );
}

export function getPositions(dispatch: Dispatch<Action<TeamActionTypes>>) {
  defaultGet(
    dispatch,
    TeamActionTypes.FETCH_SUCCESS_POSITIONS,
    TeamActionTypes.FETCH_ERROR,
    TeamActionTypes.FETCH_POSITIONS,
    client().getPLayerPositions,
    false,
    false,
  );
}

export function getSquad(
  dispatch: Dispatch<Action<TeamActionTypes>>,
  id: IDType,
) {
  defaultGet(
    dispatch,
    TeamActionTypes.FETCH_SUCCESS_SQUAD,
    TeamActionTypes.FETCH_ERROR,
    TeamActionTypes.FETCH_SQUAD,
    client().getSquad,
    false,
    {id},
    id,
  );
}

export function fetchTeamStatistics(
  dispatch: Dispatch<Action<TeamActionTypes>>,
  id: IDType,
) {
  defaultGet(
    dispatch,
    TeamActionTypes.FETCH_SUCCESS_STATISTICS,
    TeamActionTypes.FETCH_ERROR,
    TeamActionTypes.FETCH_STATISTICS,
    client().getTeamStatistics,
    false,
    {id},
    id,
  );
}

export function fetchTeamStatisticsDetail(
  dispatch: Dispatch<Action<TeamActionTypes>>,
  id: IDType,
  key: StatisticKeyEnum,
) {
  defaultGet(
    dispatch,
    TeamActionTypes.FETCH_SUCCESS_STATISTICS_DETAIL,
    TeamActionTypes.FETCH_ERROR,
    TeamActionTypes.FETCH_STATISTICS,
    client().getTeamStatisticsDetail,
    false,
    {id, date: numberedHash(key)},
    id,
    key,
  );
}

export function patchTeam(
  dispatch: Dispatch<Action<TeamActionTypes>>,
  id: IDType,
  body: TeamPatch,
) {
  defaultGet(
    dispatch,
    TeamActionTypes.FETCH_SUCCESS,
    TeamActionTypes.FETCH_ERROR,
    TeamActionTypes.FETCH_TEAM,
    client().patchTeam,
    false,
    false,
    id,
    body,
  );
}

export function addSponsor(
  dispatch: Dispatch<Action<TeamActionTypes>>,
  id: IDType,
  body: SponsorCreate,
) {
  defaultGet(
    dispatch,
    TeamActionTypes.ADD_SPONSOR_SUCCESS,
    TeamActionTypes.FETCH_ERROR,
    TeamActionTypes.ADD_SPONSOR,
    client().addSponsor,
    false,
    {id},
    id,
    body,
  );
}

export function createLocation(
  dispatch: Dispatch<Action<TeamActionTypes>>,
  id: IDType,
  body: LocationCreate,
  oldLocations: IDType[],
) {
  defaultGet(
    dispatch,
    TeamActionTypes.ADD_LOCATION_SUCCESS,
    TeamActionTypes.FETCH_ERROR,
    TeamActionTypes.ADD_LOCATION,
    client().createLocation,
    false,
    false,
    id,
    oldLocations,
    body,
  );
}
export function patchSponsor(
  dispatch: Dispatch<Action<TeamActionTypes>>,
  sponsorId: IDType,
  teamId: IDType,
  body: SponsorPatch,
) {
  defaultGet(
    dispatch,
    TeamActionTypes.ADD_SPONSOR_SUCCESS,
    TeamActionTypes.FETCH_ERROR,
    TeamActionTypes.ADD_SPONSOR,
    client().patchSponsor,
    false,
    {id: teamId},
    sponsorId,
    body,
  );
}

export function removeSponsor(
  dispatch: Dispatch<Action<TeamActionTypes>>,
  teamId: IDType,
  sponsorId: IDType,
) {
  defaultGet(
    dispatch,
    TeamActionTypes.REMOVE_SPONSOR_SUCCESS,
    TeamActionTypes.FETCH_ERROR,
    TeamActionTypes.REMOVE_SPONSOR,
    client().removeSponsor,
    false,
    {id: teamId},
    sponsorId,
  );
}
