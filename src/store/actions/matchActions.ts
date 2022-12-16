import { Dispatch } from 'redux';
import { IDType } from '../../config/types';
import { defaultGet, fetchError } from './all';
import {
  LineupCreate,
  ManOfTheMatchVote,
  MatchLocationEnum,
} from '../../client/api';
import { MatchActions, MatchActionTypes } from './types';
import { numberToDay } from '../../config/utils';
import client from '../../client';

export function fetchMatch(dispatch: Dispatch<MatchActions>, id: IDType) {
  defaultGet(
    dispatch,
    MatchActionTypes.FETCH_SUCCESS_MATCHES,
    MatchActionTypes.FETCH_ERROR,
    MatchActionTypes.FETCH_MATCH,
    client().getMatch,
    false,
    false,
    id,
  );
}

export function fetchMatchDays(
  dispatch: Dispatch<MatchActions>,
  aoi: IDType,
  date: Date,
  type: 'today' | 'bigger' | 'smaller' | 'month',
) {
  defaultGet(
    dispatch,
    MatchActionTypes.FETCH_SUCCESS_MATCH_DAYS,
    MatchActionTypes.FETCH_ERROR,
    MatchActionTypes.FETCH_MATCH_DAYS,
    client().getMatchDays,
    false,
    false,
    date,
    { type, aoi },
  );
}

export function fetchMatchDaysOfLeague(
  dispatch: Dispatch<MatchActions>,
  league: IDType,
  date: Date,
  type: 'today' | 'bigger' | 'smaller' | 'month',
) {
  client()
    .getMatchDays(date, { type, league })
    .then(
      (response) => {
        dispatch({
          type: MatchActionTypes.FETCH_SUCCESS_MATCH_DAYS_LEAGUE,
          payload: {
            id: league,
            response: response.map((d) => new Date(d)),
            fetchDate: new Date(),
          },
        });
      },
      (e) => fetchError(e, MatchActionTypes.FETCH_ERROR, dispatch),
    );
  dispatch({ type: MatchActionTypes.FETCH_MATCH_DAYS_LEAGUE });
}

export function fetchLeagueMatchesOfDay(
  dispatch: Dispatch<MatchActions>,
  aoi: IDType,
  date: number,
) {
  defaultGet(
    dispatch,
    MatchActionTypes.FETCH_SUCCESS_LEAGUE_MATCHES,
    MatchActionTypes.FETCH_ERROR,
    MatchActionTypes.FETCH_LEAGUE_MATCHES_DAY,
    client().getLeagueMatchesOfDay,
    false,
    { id: aoi, date },
    numberToDay(date),
    aoi,
  );
}

export function fetchLeagueMatchesOfDayLeague(
  dispatch: Dispatch<MatchActions>,
  date: number,
  leagueID: IDType,
) {
  defaultGet(
    dispatch,
    MatchActionTypes.FETCH_SUCCESS_MATCHES_OF_LEAGUE,
    MatchActionTypes.FETCH_ERROR,
    MatchActionTypes.FETCH_MATCHES_OF_LEAGUE,
    client().getLeagueMatchesOfDayLeague,
    false,
    { id: leagueID, date },
    numberToDay(date),
    leagueID,
  );
}

export function fetchLeagueMatchesOfMatchDay(
  dispatch: Dispatch<MatchActions>,
  day: number,
  leagueID: IDType,
) {
  defaultGet(
    dispatch,
    MatchActionTypes.FETCH_SUCCESS_MATCHES_OF_LEAGUE,
    MatchActionTypes.FETCH_ERROR,
    MatchActionTypes.FETCH_MATCHES_OF_LEAGUE,
    client().getLeagueMatchesOfMatchDayLeague,
    false,
    { id: leagueID, date: day },
    day,
    leagueID,
  );
}

export function fetchMatchBet(
  dispatch: Dispatch<MatchActions>,
  matchId: IDType,
) {
  defaultGet(
    dispatch,
    MatchActionTypes.FETCH_MATCH_BET_SUCCESS,
    MatchActionTypes.FETCH_ERROR,
    MatchActionTypes.FETCH_MATCH_BET,
    client().getMatchBet,
    false,
    { id: matchId },
    matchId,
  );
}

export function betOnMatch(
  dispatch: Dispatch<MatchActions>,
  on: MatchLocationEnum,
  matchId: IDType,
) {
  defaultGet(
    dispatch,
    MatchActionTypes.FETCH_MATCH_BET_SUCCESS,
    MatchActionTypes.FETCH_ERROR,
    MatchActionTypes.FETCH_MATCH_BET,
    client().putMatchBet,
    false,
    { id: matchId },
    matchId,
    on,
  );
}

export function fetchMatchOfTeam(
  dispatch: Dispatch<MatchActions>,
  id: IDType,
  limit = 100,
  playedOnly = false,
) {
  defaultGet(
    dispatch,
    MatchActionTypes.FETCH_SUCCESS_MATCHES_OF_TEAM,
    MatchActionTypes.FETCH_ERROR,
    MatchActionTypes.FETCH_MATCHES_OF_TEAM,
    client().getMatchesOfTeam,
    false,
    { id },
    id,
    limit,
    playedOnly,
  );
}
export function getShapeComparison(
  dispatch: Dispatch<MatchActions>,
  id: IDType,
  limit = 100,
  playedOnly = false,
) {
  defaultGet(
    dispatch,
    MatchActionTypes.FETCH_SUCCESS_SHAPE_COMPARISON,
    MatchActionTypes.FETCH_ERROR,
    MatchActionTypes.FETCH_MATCHES_OF_TEAM,
    client().getMatchesOfTeam,
    false,
    { id },
    id,
    limit,
    playedOnly,
  );
}

export function fetchEvents(dispatch: Dispatch<MatchActions>, id: IDType) {
  defaultGet(
    dispatch,
    MatchActionTypes.FETCH_EVENTS_SUCCESS,
    MatchActionTypes.FETCH_ERROR,
    MatchActionTypes.FETCH_EVENTS,
    client().getEvents,
    false,
    { id },
    id,
  );
}

export function deleteEvent(
  dispatch: Dispatch<MatchActions>,
  eventId: IDType,
  matchID: IDType,
) {
  defaultGet(
    dispatch,
    MatchActionTypes.DELETE_EVENT_SUCCESS,
    MatchActionTypes.FETCH_ERROR,
    MatchActionTypes.POST_EVENT,
    client().deleteEvent,
    false,
    { id: matchID },
    eventId,
  );
}
export function startMatch(
  dispatch: Dispatch<MatchActions>,
  matchID: IDType,
  minutes: number,
) {
  defaultGet(
    dispatch,
    MatchActionTypes.POST_MATCH_SUCCESS,
    MatchActionTypes.FETCH_ERROR,
    MatchActionTypes.POST_MATCH,
    client().startMatch,
    false,
    false,
    matchID,
    minutes,
  );
}

export function postGoalEvent(
  dispatch: Dispatch<MatchActions>,
  matchID: IDType,
  minute: number,
  teamId: IDType,
  goal1: number,
  goal2: number,
  playerId?: IDType,
  assistId?: IDType,
  goalTypeId?: IDType,
) {
  defaultGet(
    dispatch,
    MatchActionTypes.POST_EVENT_SUCCESS,
    MatchActionTypes.FETCH_ERROR,
    MatchActionTypes.POST_EVENT,
    client().postGoalEvent,
    false,
    { id: matchID },
    matchID,
    minute,
    teamId,
    goal1,
    goal2,
    playerId,
    assistId,
    goalTypeId,
  );
}
export function postCardEvent(
  dispatch: Dispatch<MatchActions>,
  matchID: IDType,
  minute: number,
  teamId: IDType,
  playerId: IDType,
  cardTypeId: IDType,
) {
  defaultGet(
    dispatch,
    MatchActionTypes.POST_EVENT_SUCCESS,
    MatchActionTypes.FETCH_ERROR,
    MatchActionTypes.POST_EVENT,
    client().postCardEvent,
    false,
    { id: matchID },
    matchID,
    minute,
    teamId,
    playerId,
    cardTypeId,
  );
}
export function postChanceEvent(
  dispatch: Dispatch<MatchActions>,
  matchID: IDType,
  minute: number,
  teamId: IDType,
  chanceTypeId: IDType,
  playerId?: IDType,
) {
  defaultGet(
    dispatch,
    MatchActionTypes.POST_EVENT_SUCCESS,
    MatchActionTypes.FETCH_ERROR,
    MatchActionTypes.POST_EVENT,
    client().postChanceEvent,
    false,
    { id: matchID },
    matchID,
    minute,
    teamId,
    chanceTypeId,
    playerId,
  );
}
export function postChangeEvent(
  dispatch: Dispatch<MatchActions>,
  matchID: IDType,
  minute: number,
  teamId: IDType,
  playerOutId: IDType,
  injured: boolean,
  playerInId: IDType,
) {
  defaultGet(
    dispatch,
    MatchActionTypes.POST_EVENT_SUCCESS,
    MatchActionTypes.FETCH_ERROR,
    MatchActionTypes.POST_EVENT,
    client().postChangeEvent,
    false,
    { id: matchID },
    matchID,
    minute,
    teamId,
    playerOutId,
    injured,
    playerInId,
  );
}

export function patchCardEvent(
  dispatch: Dispatch<MatchActions>,
  matchID: IDType,
  eventId: IDType,
  minute?: number,
  playerId?: IDType,
  cardTypeId?: IDType,
) {
  defaultGet(
    dispatch,
    MatchActionTypes.PATCH_EVENT_SUCCESS,
    MatchActionTypes.FETCH_ERROR,
    MatchActionTypes.POST_EVENT,
    client().patchCardEvent,
    false,
    { id: matchID },
    eventId,
    minute,
    playerId,
    cardTypeId,
  );
}

export function patchChanceEvent(
  dispatch: Dispatch<MatchActions>,
  matchID: IDType,
  eventId: IDType,
  minute?: number,
  chanceTypeId?: IDType,
  playerId?: IDType,
) {
  defaultGet(
    dispatch,
    MatchActionTypes.PATCH_EVENT_SUCCESS,
    MatchActionTypes.FETCH_ERROR,
    MatchActionTypes.POST_EVENT,
    client().patchChanceEvent,
    false,
    { id: matchID },
    eventId,
    minute,
    chanceTypeId,
    playerId,
  );
}
export function patchChangeEvent(
  dispatch: Dispatch<MatchActions>,
  matchID: IDType,
  eventId: IDType,
  minute?: number,
  playerOutId?: IDType,
  injured?: boolean,
  playerInId?: IDType,
) {
  defaultGet(
    dispatch,
    MatchActionTypes.PATCH_EVENT_SUCCESS,
    MatchActionTypes.FETCH_ERROR,
    MatchActionTypes.POST_EVENT,
    client().patchChangeEvent,
    false,
    { id: matchID },
    eventId,
    minute,
    playerOutId,
    injured,
    playerInId,
  );
}
export function patchGoalEvent(
  dispatch: Dispatch<MatchActions>,
  matchID: IDType,
  eventId: IDType,
  minute?: number,
  playerId?: IDType,
  assistId?: IDType,
  goalTypeId?: IDType,
) {
  defaultGet(
    dispatch,
    MatchActionTypes.PATCH_EVENT_SUCCESS,
    MatchActionTypes.FETCH_ERROR,
    MatchActionTypes.POST_EVENT,
    client().patchGoalEvent,
    false,
    { id: matchID },
    eventId,
    minute,
    playerId,
    assistId,
    goalTypeId,
  );
}

export function getGoalTypes(dispatch: Dispatch<MatchActions>) {
  defaultGet(
    dispatch,
    MatchActionTypes.FETCH_EVENT_TYPE_SUCCESS,
    MatchActionTypes.FETCH_ERROR,
    MatchActionTypes.FETCH_EVENT_TYPE,
    client().getGoalTypes,
    false,
    { id: 1 },
  );
}

export function getCardTypes(dispatch: Dispatch<MatchActions>) {
  defaultGet(
    dispatch,
    MatchActionTypes.FETCH_EVENT_TYPE_SUCCESS,
    MatchActionTypes.FETCH_ERROR,
    MatchActionTypes.FETCH_EVENT_TYPE,
    client().getCardTypes,
    false,
    { id: 2 },
  );
}

export function getChanceTypes(dispatch: Dispatch<MatchActions>) {
  defaultGet(
    dispatch,
    MatchActionTypes.FETCH_EVENT_TYPE_SUCCESS,
    MatchActionTypes.FETCH_ERROR,
    MatchActionTypes.FETCH_EVENT_TYPE,
    client().getChanceTypes,
    false,
    { id: 3 },
  );
}

export function postMatchInfo(
  dispatch: Dispatch<MatchActions>,
  id: IDType,
  newTime: Date,
  newLocation: IDType | undefined,
) {
  defaultGet(
    dispatch,
    MatchActionTypes.POST_MATCH_SUCCESS,
    MatchActionTypes.FETCH_ERROR,
    MatchActionTypes.POST_MATCH,
    client().postMatchInfo,
    false,
    false,
    id,
    newTime,
    newLocation,
  );
}

export function getLocations(dispatch: Dispatch<MatchActions>, q: string) {
  defaultGet(
    dispatch,
    MatchActionTypes.LOCATION_FOUND,
    MatchActionTypes.FETCH_ERROR,
    MatchActionTypes.SEARCH_LOCATIONS,
    client().getLocation,
    false,
    false,
    q,
  );
}

export function getLineupOfMatch(
  dispatch: Dispatch<MatchActions>,
  matchID: IDType,
  team: MatchLocationEnum,
) {
  defaultGet(
    dispatch,
    MatchActionTypes.FETCH_LINEUP_SUCCESS,
    MatchActionTypes.FETCH_ERROR,
    MatchActionTypes.FETCH_LINEUP,
    client().getLineup,
    false,
    { id: matchID, date: team === 'home' ? 1 : 2 },
    matchID,
    team,
  );
}
export function putLineupOfMatch(
  dispatch: Dispatch<MatchActions>,
  matchID: IDType,
  team: MatchLocationEnum,
  lineup: LineupCreate,
) {
  defaultGet(
    dispatch,
    MatchActionTypes.FETCH_LINEUP_SUCCESS,
    MatchActionTypes.FETCH_ERROR,
    MatchActionTypes.FETCH_LINEUP,
    client().putLineup,
    false,
    { id: matchID, date: team === 'home' ? 1 : 2 },
    matchID,
    team,
    lineup,
  );
}

export function getLineupTypes(dispatch: Dispatch<MatchActions>) {
  defaultGet(
    dispatch,
    MatchActionTypes.FETCH_LINEUP_TYPES_SUCCESS,
    MatchActionTypes.FETCH_ERROR,
    MatchActionTypes.FETCH_LINEUP_TYPES,
    client().getLineups,
    false,
    false,
  );
}

export function getMotm(dispatch: Dispatch<MatchActions>, id: IDType) {
  defaultGet(
    dispatch,
    MatchActionTypes.FETCH_SUCCESS_MOTM,
    MatchActionTypes.FETCH_ERROR,
    MatchActionTypes.FETCH_MOTM,
    client().getMomt,
    false,
    { id },
    id,
  );
}

export function voteMotm(
  dispatch: Dispatch<MatchActions>,
  vote: ManOfTheMatchVote,
) {
  defaultGet(
    dispatch,
    MatchActionTypes.PUT_SUCCESS_MOTM,
    MatchActionTypes.FETCH_ERROR,
    MatchActionTypes.FETCH_MOTM,
    client().voteMomt,
    false,
    { id: vote.matchId },
    vote,
  );
}

export function getMatchHistoryOfMatch(
  dispatch: Dispatch<MatchActions>,
  matchId: IDType,
) {
  defaultGet(
    dispatch,
    MatchActionTypes.FETCH_SUCCESS_MATCH_HISTORY,
    MatchActionTypes.FETCH_ERROR,
    MatchActionTypes.FETCH_MATCH,
    client().getMatchHistoryOfMatch,
    false,
    { id: matchId },
    matchId,
  );
}
export function getGoalDistribution(
  dispatch: Dispatch<MatchActions>,
  matchId: IDType,
) {
  defaultGet(
    dispatch,
    MatchActionTypes.FETCH_SUCCESS_GOAL_DISTRIBUTION,
    MatchActionTypes.FETCH_ERROR,
    MatchActionTypes.FETCH_MATCH,
    client().getGoalDistribution,
    false,
    { id: matchId },
    matchId,
  );
}

export function getPlayerInFocus(
  dispatch: Dispatch<MatchActions>,
  matchId: IDType,
  team1Id: IDType,
  team2Id: IDType,
) {
  defaultGet(
    dispatch,
    MatchActionTypes.FETCH_SUCCESS_PLAYER_IN_FOCUS,
    MatchActionTypes.FETCH_ERROR,
    MatchActionTypes.FETCH_MATCH,
    client().getPlayerInFocus,
    false,
    { id: matchId },
    matchId,
    team1Id,
    team2Id,
  );
}
