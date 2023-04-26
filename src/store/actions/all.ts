import { Action, Dispatch } from 'redux';
import * as Sentry from '@sentry/react';
import { ApiError, CancelablePromise } from '../../client/api';
import { ValueStore } from '../constants';
import {
  AllActions,
  InitAction,
  PayloadAction,
  ServerActionTypes,
  UserActionTypes,
  WithoutResponse,
} from './types';
import { TranslatorKeys } from '../../config/translator';
import ClavaActionQueue, { ClavaAction } from '../../config/queue';
import { store } from '../index';

export function fetchError(
  error: ApiError,
  actionType: string,
  dispatch: Dispatch<Action>,
): void {
  // TODO handle errors globally

  console.log('\x1b[31m%s\x1b[0m', `ERROR on ${actionType}`);
  console.log('\x1b[31m%O\x1b[0m', error);
  console.log('\x1b[31m%O\x1b[0m', error.body);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const errorKey: TranslatorKeys =
    error.status === 422 ||
    error.status === 401 ||
    error.status === 400 ||
    error.status === 403
      ? 'credentials_wrong'
      : error.status === 500 || error.status === 502 || error.status === 503
      ? 'serverError'
      : error.status === 404
      ? ''
      : 'noConnection';
  // 400 bad request
  // 401 Unauthorized lei wenn token eps fahlt
  // 403 Forbidden
  // 412 condition not supported, request passt obo des dorf man no net tian oder nimmer
  // 413 file too big
  // 415 unsupported media type
  // 422 unprocessable entity ( server error )
  // 451 Teams do not match / teams können nicht gegeneinander spieleb
  // 452 Player not in this match
  // 453 Match already started
  // 455 This goal has been reported more than one time
  // 457 You have already voted for this match
  // 458
  // 50x server error
  // 901 team not match to match ---> changed to 451
  // 902 player not in team/match ---> changed to 452
  // 903 match already startet on vote ---> changed to 453
  // event dublicate --> 455
  // TODO fehlermeldungen handlen
  dispatch({
    type: actionType,
    payload: errorKey,
  });
  if (error.status >= 500 && error.status < 505) {
    Sentry.captureException(error);
    dispatch({ type: ServerActionTypes.GONE });
  }
  if (error.status === 401) {
    dispatch({ type: UserActionTypes.UNAUTHORIZED });
    redoActionCondition(() => store.getState().user.error !== 'no_user_found');
  }
}

export function performAction<T extends (...funcArgs: any[]) => void>(
  action: ClavaAction<T>,
) {
  ClavaActionQueue.enqueue(action);
  action.f(...action.p);
}

export function redoAction() {
  const action = ClavaActionQueue.getLast();
  if (action) action.f(...action.p);
}
export function redoActionTimeout(ms = 2000) {
  const action = ClavaActionQueue.getLast();
  if (action) {
    setTimeout(() => {
      action.f(...action.p);
    }, ms);
  }
}
export function redoActionCondition(
  check: () => boolean,
  ms = 2000,
  action: ClavaAction<any> | undefined = undefined,
) {
  const actionTmp = action ?? ClavaActionQueue.getLast();
  if (actionTmp) {
    setTimeout(() => {
      if (check()) actionTmp.f(...actionTmp.p);
      else redoActionCondition(check, ms, actionTmp);
    }, ms);
  }
}

/**
 * if you do returnObject, it will return a the object you passed with an additional response param
 *
 * @param dispatch
 * @param actionSuccess
 * @param actionFail
 * @param actionInit
 * @param clientFunc
 * @param returnArray
 * @param returnObject
 * @param args
 */
export function defaultGet<
  A extends AllActions,
  US extends PayloadAction<A>,
  UE extends PayloadAction<A>,
  UI extends InitAction<A>,
  X extends (
    ...funcArgs: any[]
  ) => CancelablePromise<R extends ValueStore<any> ? R['response'] : any>,
  S extends US['type'],
  E extends UE['type'],
  I extends UI['type'],
  R extends ValueStore<any> | false,
>(
  dispatch: Dispatch<A | any>,
  actionSuccess: S,
  actionFail: E,
  actionInit: I,
  clientFunc: X,
  returnArray: boolean,
  returnObject: WithoutResponse<R>,
  ...args: Parameters<X>
) {
  dispatch({ type: actionInit });
  clientFunc(...args).then(
    (response) => {
      dispatch({
        type: actionSuccess,
        payload: returnObject
          ? {
              ...returnObject,
              response: returnArray ? [response] : response,
              fetchDate: new Date(),
            }
          : returnArray
          ? [response]
          : response,
      });
    },
    (e) => fetchError(e, actionFail, dispatch),
  );
}
/*
export function restoreOrFetch<
  T,
  S extends PayloadAction<AllActions>,
  U extends (
    dispatch: Dispatch<S | any>,
    id: IDType,
    ...funcArgs: any[]
  ) => void,
>(
  valueStore: ValueStore<T>[],
  restoreAction: S['type'],
  fetchFunc: U,
  [dispatch, id, ...args]: Parameters<U>,
  cmpFunc: (elem: ValueStore<T>) => boolean = elem => elem.id === id,
) {
  const filtered = valueStore.filter(cmpFunc);
  if (filtered.length) {
    dispatch({
      type: restoreAction,
      payload: filtered[0],
    });
  } else {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    performAction({f: fetchFunc, p: [dispatch, id, ...args]});
  }
}
 */
