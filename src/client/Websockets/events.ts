/* eslint-disable camelcase */
import * as Sentry from '@sentry/react';
import { io, Socket } from 'socket.io-client';
import { DisconnectDescription } from 'socket.io-client/build/esm/socket';
import { IDType } from '../../config/types';
import { dayToNumber, sameDay } from '../../config/utils';
import client from '../index';
import { addLog } from '../../store/middleware/logger';
import {
  getInsiderByTeam,
  refreshToken,
} from '../../store/actions/userActions';
import { store } from '../../store';
import {
  fetchLeagueMatchesOfDay,
  fetchLeagueMatchesOfDayLeague,
  fetchMatch,
  fetchMatchOfTeam,
} from '../../store/actions/matchActions';
import { MatchActionTypes, NewsActionTypes } from '../../store/actions/types';
import { fetchByLeague } from '../../store/actions/standingActions';
import {
  BETA_ENDPOINT,
  BETA_SOCKET_ENDPOINT,
  DEV_ENDPOINT,
  DEV_SOCKET_ENDPOINT,
  PROD_SOCKET_ENDPOINT,
} from '../../config/constants';

export interface EventSocketType {
  setUser: (id: IDType, aoi: IDType) => void;
  close: () => void;
}

type EventSocketMessage = {
  match_id: IDType;
  league_id: IDType;
  team_id: IDType;
  type: 'event';
};
type LineupSocketMessage = {
  match_id: IDType;
  team_id: IDType;
  type: 'lineup';
};
type UserSocketMessage = {
  user_id: IDType;
  type: 'user';
};

type TransfersSocketMessage = {
  team_from_id: IDType;
  team_to_id: IDType;
  player_id: IDType;
  type: 'transfer';
};

type MatchSocketMessage = {
  add_date: string;
  remove_date: string;
  match_id: IDType;
  type: 'match';
};

type SocketMessage =
  | EventSocketMessage
  | LineupSocketMessage
  | UserSocketMessage
  | TransfersSocketMessage
  | MatchSocketMessage
  | { type: 'ping' };

class EventsSocket implements EventSocketType {
  private static __instance: EventsSocket;

  private static alive: number | undefined;

  private static readonly ALIVE_TIMEOUT = 120000;

  private websocket: Socket | undefined;

  private userID: IDType = -1;

  private aoiID: IDType = -1;

  private endpoint = `wss://${PROD_SOCKET_ENDPOINT}/`;

  private ignoreUserRefreshs = 0;

  private constructor(endpoint: string) {
    this.endpoint = `wss://${endpoint}/`;
    // TODO remove comment this.open();
  }

  static getInstance(endpoint?: string): EventsSocket {
    if (!EventsSocket.__instance) {
      if (!endpoint) endpoint = PROD_SOCKET_ENDPOINT;
      if (endpoint === BETA_ENDPOINT)
        EventsSocket.__instance = new EventsSocket(BETA_SOCKET_ENDPOINT);
      else if (endpoint === DEV_ENDPOINT)
        EventsSocket.__instance = new EventsSocket(DEV_SOCKET_ENDPOINT);
      else EventsSocket.__instance = new EventsSocket(PROD_SOCKET_ENDPOINT);
    }
    return EventsSocket.__instance;
  }

  public static isOpen(websocket: Socket | undefined): websocket is Socket {
    return !!websocket && websocket.active;
  }

  /**
   *
   * @private
   * @param reason
   * @param description
   */
  private static onClose(
    reason: Socket.DisconnectReason,
    description?: DisconnectDescription,
  ) {
    console.log('WS closed: ', reason);
    addLog('socket', `WS closed due to: ${reason}`, '#faa');
  }

  /**
   *
   * @private
   * @deprecated with Socket.IO
   */
  private static checkAlive() {
    const ws = socket().websocket;
    if (EventsSocket.isOpen(ws)) {
      // TODO ignore?
    } else {
      socket().open();
    }
    EventsSocket.alive = undefined;
  }

  private static onOpen() {
    console.log(`WS open to ${socket().endpoint}`);
    addLog('socket', `WS open to ${socket().endpoint}`, '#faa');
    setTimeout(() => {
      const sock = socket().websocket;
      if (sock) sock.emit('user_id', socket().userID);
      setTimeout(() => {
        if (sock) sock.emit('room', `aoi_${socket().aoiID}`);
      }, 1000);
    }, 1000);
  }

  private static onError(error: Error) {
    console.log('Error:', error);
    addLog('socket', `WS Error: ${error}`, '#faa');
  }

  private static handleUserMessage(userId: IDType) {
    if (userId === socket().userID) {
      refreshToken(store.dispatch);
    } else {
      const possibleInsider = store
        .getState()
        .user.values.find((u) => u.user.id === userId);
      if (possibleInsider)
        getInsiderByTeam(store.dispatch, possibleInsider.team.id);
    }
  }

  private static handleTransferMessage(
    teamFrom: IDType,
    teamTo: IDType,
    playerId: IDType,
  ) {
    store.dispatch({
      type: NewsActionTypes.REFRESH,
      payload: { transfers: [] },
    });
  }

  private static handleMatchMessage(
    addDate: string,
    removeDate: string | undefined,
    matchId: IDType,
  ) {
    // TODO refresh match
    const add = new Date(addDate);
    if (add) {
      const dateAsNumber = dayToNumber(add);
      let found = false;
      let min = Infinity;
      let max = 0;
      const state = store.getState();
      state.match.matchDays.forEach((day) => {
        if (sameDay(day, add)) {
          found = true;
        }
        if (day.getTime() > max) max = day.getTime();
        if (day.getTime() < min) min = day.getTime();
      });
      if (!found && add.getTime() < max && add.getTime() > min) {
        store.dispatch({
          type: MatchActionTypes.FETCH_SUCCESS_MATCH_DAYS,
          payload: [add.toISOString()],
        });
      }
      // TODO matchday
      if (
        found &&
        state.match.leagueMatches &&
        state.match.leagueMatches.date === dateAsNumber
      ) {
        fetchLeagueMatchesOfDay(store.dispatch, socket().aoiID, dateAsNumber);
      }
      if (
        found &&
        state.match.matchElements &&
        state.match.matchElements.date === dateAsNumber
      ) {
        fetchLeagueMatchesOfDayLeague(
          store.dispatch,
          state.match.matchElements.id,
          dateAsNumber,
        );
      }
      if (
        state.match.matchesOfTeam &&
        !!state.match.matchesOfTeam.response.find((m) => m.id === matchId)
      ) {
        fetchMatchOfTeam(store.dispatch, state.match.matchesOfTeam.id);
      }
    }
    const remove = removeDate ? new Date(removeDate) : undefined;
    if (remove) {
      let found = false;
      client()
        .getMatchDays(remove, { aoi: socket().aoiID, type: 'month' })
        .then((matchDays) => {
          matchDays.forEach((md) => {
            const day = new Date(md);
            if (sameDay(day, remove)) found = true;
          });
          if (!found) {
            store.dispatch({
              type: MatchActionTypes.REMOVE_MATCH_DAY,
              payload: remove,
            });
          }
        });
    }
  }

  private static handleEventMessage(
    leagueId: IDType,
    matchId: IDType,
    teamId: IDType,
  ) {
    const state = store.getState();
    if (state.standing.value.find((v) => v.id === leagueId)) {
      fetchByLeague(store.dispatch, leagueId);
    }
    const match = state.match.matches.find((m) => m.id === matchId);
    if (match) {
      fetchMatch(store.dispatch, match.id);
    }
    const { leagueMatches } = state.match;
    if (leagueMatches && leagueMatches.id === socket().aoiID) {
      if (
        leagueMatches.response.filter(
          (lm) =>
            lm.league.id === leagueId &&
            !!lm.matches.find((m) => m.id === matchId),
        ).length !== 0
      ) {
        fetchLeagueMatchesOfDay(
          store.dispatch,
          socket().aoiID,
          leagueMatches.date as number,
        );
      }
    }

    if (
      state.match.matchesOfTeam &&
      !!state.match.matchesOfTeam.response.find((m) => m.id === matchId)
    ) {
      fetchMatchOfTeam(store.dispatch, state.match.matchesOfTeam.id);
    }
    // TODO Statistct aktualisiern
    // TODO matchElements
    // goalDistribution
    // league stats ? eher lei periodisch
  }

  private static onMessage(payload: any) {
    console.log(`Message from Socket: `, payload);
    addLog('socket', `WS Message: ${JSON.stringify(payload)}`, '#faa');
    const ws = socket().websocket;
    try {
      const message: SocketMessage = JSON.parse(payload as string);
      if (message.type === 'user') {
        if (socket().ignoreUserRefreshs) {
          socket().ignoreUserRefreshs--;
        } else {
          EventsSocket.handleUserMessage(message.user_id);
        }
      }
      if (message.type === 'ping') {
        if (EventsSocket.isOpen(ws)) {
          if (EventsSocket.alive) {
            clearTimeout(EventsSocket.alive);
          }
          EventsSocket.alive = window.setTimeout(
            EventsSocket.checkAlive,
            EventsSocket.ALIVE_TIMEOUT,
          );
          ws.send(JSON.stringify({ type: 'pong' }));
        }
      }
      if (message.type === 'event') {
        EventsSocket.handleEventMessage(
          message.league_id,
          message.match_id,
          message.team_id,
        );
      }
      if (message.type === 'transfer') {
        EventsSocket.handleTransferMessage(
          message.team_from_id,
          message.team_to_id,
          message.player_id,
        );
      }
      if (message.type === 'match') {
        EventsSocket.handleMatchMessage(
          message.add_date,
          message.remove_date,
          message.match_id,
        );
      }
      // TODO do fahlt villeicht no wos
    } catch (e) {
      Sentry.captureException(e);
    }
  }

  open() {
    this.close();
    this.websocket = io(socket().endpoint);
    this.websocket.on('message', EventsSocket.onMessage);
    this.websocket.on('connect', EventsSocket.onOpen);
    this.websocket.on('connect_error', EventsSocket.onError);
    this.websocket.on('disconnect', EventsSocket.onClose);
  }

  setUser(id: IDType, aoi: IDType) {
    this.userID = id;
    this.aoiID = aoi;
  }

  close() {
    if (EventsSocket.isOpen(this.websocket)) this.websocket.close();
  }

  setEndpoint(endpoint: string) {
    const newEndpoint =
      endpoint === DEV_ENDPOINT
        ? DEV_SOCKET_ENDPOINT
        : endpoint === BETA_ENDPOINT
        ? BETA_SOCKET_ENDPOINT
        : PROD_SOCKET_ENDPOINT;
    if (`wss://${newEndpoint}/` !== this.endpoint) {
      this.endpoint = `wss://${newEndpoint}/`;
      this.close();
      this.open();
    }
  }

  ignoreUserRefresh(length: number) {
    this.ignoreUserRefreshs = length;
  }
}

const socket = EventsSocket.getInstance;
export default socket;
