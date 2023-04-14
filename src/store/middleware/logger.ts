import { Middleware } from 'redux';

/**
 *
 * Logger für request.tx
 *
 *
 *
 *                const start = new Date().getTime();
 *
 *                 const end = new Date().getTime();
 *
 *                console.log('\x1b[34m%s\x1b[0m', options.method+": " + url);
 *                 console.log('\x1b[34m%s%O\x1b[0m', "Headers:", headers);
 *                 if (formData)
 *                     console.log('\x1b[34m%s%O\x1b[0m',"Data:", formData);
 *                 if (body)
 *                     console.log('\x1b[34m%s%O\x1b[0m',"Body:", body);
 *                 console.log('\x1b[34m%s%O\x1b[0m', "Result ["+result.status+"]:",result.body);
 *
 * @param object
 */
export declare type LogType =
  | 'all'
  | 'appState'
  | 'req'
  | 'cam'
  | 'response'
  | 'socket'
  | 'firebase'
  | 'cache'
  | 'redux';
function replaceArrays(object: any): any {
  if (object) {
    if (Array.isArray(object)) {
      return {
        arrayLength: object.length,
        content: object.length ? replaceArrays(object[0]) : '{}',
      };
    }
    if (typeof object === 'object') {
      const retval = {};
      Object.keys(object).forEach((key) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        retval[key] = replaceArrays(object[key]);
      });
      return retval;
    }
  }
  return object;
}

export const LOG_COLORS: {
  [T in LogType]: string;
} = {
  all: '#fff',
  appState: '#45DF31',
  req: '#CD7F32',
  response: '#CD7F32',
  cam: '#00ff00',
  cache: '#45DF31',
  socket: '#5AA0E1',
  firebase: '#FF9C09',
  redux: '#EA4C89',
};
export const LOG_TYPES: LogType[] = [
  'all',
  'appState',
  'req',
  'response',
  'socket',
  'redux',
  'firebase',
  'cache',
  'cam',
];
let logId = 0;
export const loggerSettings = {
  enabled: true,
};

export declare type LogElem = {
  type: LogType;
  color: string;
  time: Date;
  msg: Record<string, any>;
  id: number;
};
const logs: LogElem[] = [];

export function addLog(type: LogType, msg: Record<string, any>) {
  if (loggerSettings.enabled) {
    logs.push({
      id: logId++,
      time: new Date(),
      msg,
      color: LOG_COLORS[type] ?? 'WHITE',
      type,
    });
    if (logs.length > 100) logs.shift();
  }
}

export function getLog(): LogElem[] {
  return logs;
}

const logger: Middleware<any, any, any> = (_) => (next) => (action) => {
  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development')
    console.log('\x1b[32m%s\x1b[0m', `Dispatch: ${action.type}`);
  const msg: Record<string, any> = { Dispatch: action.type };
  if ('payload' in action) {
    const p = replaceArrays(action.payload);
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development')
      console.log('\x1b[32m%s%O\x1b[0m', 'Payload: ', p);
    msg.Payload = p;
  }
  addLog('redux', msg);
  // console.debug('Next state', store.getState());
  // console.groupEnd();
  return next(action);
};

export default logger;
