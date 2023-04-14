import * as Sentry from '@sentry/react';
import { io, Socket } from 'socket.io-client';
import { DisconnectDescription } from 'socket.io-client/build/esm/socket';
import {
  BETA_ENDPOINT,
  BETA_SOCKET_ENDPOINT,
  DEV_ENDPOINT,
  DEV_SOCKET_ENDPOINT,
  PROD_SOCKET_ENDPOINT,
  STAG_ENDPOINT,
  STAG_SOCKET_ENDPOINT,
} from '../../config/constants';
import { store } from '../../store';
import {
  getInsiderByTeam,
  refreshToken,
} from '../../store/actions/userActions';
import { fetchByLeague } from '../../store/actions/standingActions';
import { getLineupOfMatch } from '../../store/actions/matchActions';
import { MatchActionTypes, NewsActionTypes } from '../../store/actions/types';
import { errorLogging } from '../../config/utils';
import client from '../index';
import { addLog } from '../../store/middleware/logger';
import { EventTypeEnum, Match, MatchLocationEnum } from '../api';
import { ValueStore } from '../../store/constants';
import {
  fetchTransfers,
  TRANSFERS_LIMIT,
} from '../../store/actions/newsActions';
import { IDType } from '../../config/types';

type EventSocketMessage = {
  match_id: IDType;
  league_id: IDType;
  sub_type: EventTypeEnum;
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

type FileUploadMessage = {
  file_id: IDType;
  type: 'file_formats_created';
};
type MatchFeedMessage = {
  match_id: IDType;
  post_id: IDType;
  type: 'match_feed';
};
type PostMessage = {
  post_id: IDType;
  type: 'post';
};
type UserFeedMessage = {
  post_id: IDType;
  type: 'user_feed';
};

type FileUploadCompleteListener = (id: IDType) => void;

type SocketMessage =
  | FileUploadMessage
  | EventSocketMessage
  | LineupSocketMessage
  | UserSocketMessage
  | TransfersSocketMessage
  | MatchSocketMessage
  | PostMessage
  | UserFeedMessage
  | MatchFeedMessage
  | { type: 'ping' };

class EventsSocket {
  private static alive: number;

  private static readonly ALIVE_TIMEOUT = 120000;

  private static websocket: Socket | undefined;

  private static userID: IDType = -1;

  private static aoiID: IDType = -1;

  private static endpoint = `wss://${PROD_SOCKET_ENDPOINT}/`;

  private static ignoreUserRefreshs = 0;

  private static fileUploadCompleteListener:
    | FileUploadCompleteListener
    | undefined;

  static init(endpoint: string | undefined | null) {
    if (!endpoint) endpoint = PROD_SOCKET_ENDPOINT;
    if (endpoint === BETA_ENDPOINT) endpoint = BETA_SOCKET_ENDPOINT;
    else if (endpoint === DEV_ENDPOINT) endpoint = DEV_SOCKET_ENDPOINT;
    else if (endpoint === STAG_ENDPOINT) endpoint = STAG_SOCKET_ENDPOINT;
    else endpoint = PROD_SOCKET_ENDPOINT;
    EventsSocket.endpoint = `wss://${endpoint}/`;
    EventsSocket.open();
  }

  public static isOpen(websocket: Socket | undefined): websocket is Socket {
    return !!websocket && websocket.active;
  }

  static setFileUploadListener(listener: FileUploadCompleteListener) {
    EventsSocket.fileUploadCompleteListener = listener;
  }

  static setUser(id?: IDType, aoi?: IDType) {
    if (id && aoi) {
      EventsSocket.userID = id;
      EventsSocket.aoiID = aoi;
      const sock = EventsSocket.websocket;
      if (sock) {
        sock.emit('user_id', id);
        addLog('socket', { User: id });
      }
      setTimeout(() => {
        if (sock) {
          sock.emit('room', `aoi_${aoi}`);
          addLog('socket', { Room: `aoi_${aoi}` });
        }
      }, 1000);
      if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development')
        console.log(`Identify as ${id} in room aoi_${aoi}`);
      else
        Sentry.addBreadcrumb({
          type: 'info',
          category: 'socket',
          data: { user_id: id, room: `aoi_${aoi}` },
        });
    } else if (EventsSocket.userID && EventsSocket.aoiID) {
      const sock = EventsSocket.websocket;
      if (sock) {
        sock.emit('user_id', EventsSocket.userID);
        addLog('socket', { User: id });
      }
      setTimeout(() => {
        if (sock) {
          sock.emit('room', `aoi_${EventsSocket.aoiID}`);
          addLog('socket', { Room: `aoi_${aoi}` });
        }
      }, 1000);
      if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development')
        console.log(
          `Identify as ${EventsSocket.userID} in room aoi_${EventsSocket.aoiID}`,
        );
      else
        Sentry.addBreadcrumb({
          type: 'info',
          category: 'socket',
          data: {
            user_id: EventsSocket.userID,
            room: `aoi_${EventsSocket.aoiID}`,
          },
        });
    }
  }

  static open() {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development')
      console.log('\x1b[35m%s%O\x1b[0m', `Open WS to ${EventsSocket.endpoint}`);
    addLog('socket', { Open: EventsSocket.endpoint });
    EventsSocket.close();
    EventsSocket.websocket = io(EventsSocket.endpoint);
    EventsSocket.websocket.on('message', EventsSocket.onMessage);
    EventsSocket.websocket.on('connect', EventsSocket.onOpen);
    EventsSocket.websocket.on('connect_error', EventsSocket.onError);
    EventsSocket.websocket.on('disconnect', EventsSocket.onClose);
  }

  static close() {
    if (EventsSocket.isOpen(EventsSocket.websocket))
      EventsSocket.websocket.close();
  }

  static setEndpoint(endpoint: string) {
    const newEndpoint =
      endpoint === DEV_ENDPOINT
        ? DEV_SOCKET_ENDPOINT
        : endpoint === BETA_ENDPOINT
        ? BETA_SOCKET_ENDPOINT
        : endpoint === STAG_ENDPOINT
        ? STAG_SOCKET_ENDPOINT
        : PROD_SOCKET_ENDPOINT;
    if (`wss://${newEndpoint}/` !== EventsSocket.endpoint) {
      EventsSocket.endpoint = `wss://${newEndpoint}/`;
      EventsSocket.close();
      EventsSocket.open();
    }
  }

  static ignoreUserRefresh(length: number) {
    EventsSocket.ignoreUserRefreshs = length;
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
    console.log('\x1b[35m%s%O\x1b[0m', 'WS closed, reason: ', reason);
    addLog('socket', { Closed: { reason, description } });
  }

  private static handleUserMessage(userId: IDType) {
    if (userId === EventsSocket.userID) {
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
    fetchTransfers(store.dispatch, EventsSocket.aoiID, 0, TRANSFERS_LIMIT);
  }

  private static handleMatchMessage(
    addDate: string,
    removeDate: string,
    matchId: IDType,
  ) {
    client()
      .getMatch(matchId)
      .then((match) => {
        store.dispatch({
          type: MatchActionTypes.REFRESH_MATCH_DAYS,
          payload: {
            match,
            addDate,
            removeDate,
            aoiID: EventsSocket.aoiID,
          },
        });
      }, errorLogging);
  }

  private static handleEventMessage(
    leagueId: IDType,
    matchId: IDType,
    subType: EventTypeEnum,
  ) {
    const state = store.getState();
    if (state.standing.value.find((v) => v.id === leagueId)) {
      fetchByLeague(store.dispatch, leagueId);
    }
    client()
      .getMatch(matchId)
      .then((match) => {
        const payload: ValueStore<Match> = {
          id: EventsSocket.aoiID,
          fetchDate: new Date(),
          response: match,
        };
        store.dispatch({ type: MatchActionTypes.REFRESH_MATCH, payload });
      });
    // refreshMatch(store.dispatch, matchId, EventsSocket.aoiID);
  }

  private static handleLineupMessage(matchId: IDType, teamId: IDType) {
    const match = store.getState().match.matches.find((m) => m.id === matchId);
    if (match)
      getLineupOfMatch(
        store.dispatch,
        matchId,
        teamId === match.team1.id
          ? MatchLocationEnum.HOME
          : MatchLocationEnum.AWAY,
      );
  }

  /**
   *
   * @private
   * @deprecated with Socket.IO
   */
  private static checkAlive() {
    const ws = EventsSocket.websocket;
    if (EventsSocket.isOpen(ws)) {
      // IGNORE
    } else {
      EventsSocket.open();
    }
    EventsSocket.alive = -1;
  }

  private static onMessage(payload: any) {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development')
      console.log('\x1b[35m%s%O\x1b[0m', `WS Message: `, payload);
    addLog('socket', { Message: payload });
    try {
      const message: SocketMessage = JSON.parse(payload as string);
      if (message.type === 'user') {
        if (EventsSocket.ignoreUserRefreshs) {
          EventsSocket.ignoreUserRefreshs--;
        } else {
          EventsSocket.handleUserMessage(message.user_id);
        }
      }
      if (message.type === 'event') {
        EventsSocket.handleEventMessage(
          message.league_id,
          message.match_id,
          message.sub_type,
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
      if (message.type === 'lineup') {
        EventsSocket.handleLineupMessage(message.match_id, message.team_id);
      }
      if (message.type === 'file_formats_created') {
        const listener = EventsSocket.fileUploadCompleteListener;
        if (listener) listener(message.file_id);
      }
    } catch (e) {
      Sentry.captureException(e);
    }
  }

  private static onOpen() {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development')
      console.log('\x1b[35m%s%O\x1b[0m', `WS open to ${EventsSocket.endpoint}`);
    addLog('socket', { Connected: EventsSocket.endpoint });
    setTimeout(EventsSocket.setUser, 1000);
  }

  private static onError(error: Error) {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development')
      console.log('\x1b[35m%s%O\x1b[0m', 'WS Error:', error);
    addLog('socket', { Error: error });
  }
}

export default EventsSocket;
