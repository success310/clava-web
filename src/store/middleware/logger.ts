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

function replaceArrays(object: any): any {
  return object;
  /* this is only needed on web, here we have a proper console
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
  return object;*/
}

export declare type LogType =
  | 'all'
  | 'req'
  | 'reqData'
  | 'response'
  | 'socket'
  | 'firebase'
  | 'redux';

export const LOG_TYPES: LogType[] = [
  'all',
  'req',
  'reqData',
  'response',
  'socket',
  'redux',
  'firebase',
];
let logId = 0;
type LogElem = {
  type: LogType;
  color?: string;
  time: Date;
  msg: string;
  id: number;
};
const logs: LogElem[] = [];

export function addLog(type: LogType, msg: string, color?: string) {
  logs.push({ id: logId++, time: new Date(), msg, color, type });
  if (logs.length > 100) logs.shift();
}

export function getLog(): LogElem[] {
  return logs;
}

const logger: Middleware<any, any, any> = () => (next) => (action) => {
  console.log('\x1b[32m%s\x1b[0m', `Dispatch: ${action.type}`);
  addLog('redux', `Dispatch: ${action.type}`, '#0a0');
  if ('payload' in action) {
    const p = replaceArrays(action.payload);
    console.log('\x1b[32m%s%O\x1b[0m', 'Payload: ', p);
    addLog('redux', `Payload: ${JSON.stringify(p)}`, '#0a0');
  }
  // console.debug('Next state', store.getState());
  // console.groupEnd();
  return next(action);
};

export default logger;
