import * as Sentry from '@sentry/react';
import { DateTimeFormat } from 'intl';
import {
  browserName,
  isMobile,
  mobileModel,
  mobileVendor,
  osName,
  osVersion,
} from 'react-device-detect';
import React from 'react';
import {
  CollectionType,
  Favorite,
  FavoriteType,
  IDType,
  LanguageISO,
} from './types';
import {
  CardEvent,
  CardTypeEnum,
  ChanceEvent,
  ChangeEvent,
  EventType,
  EventTypeEnum,
  GoalEvent,
  Group,
  GroupEnum,
  LanguageLocaleEnum,
  League,
  LeagueListElement,
  LineupPosition,
  Match,
  MatchListElement,
  PlayerListElement,
  ScopeEnum,
  Team,
  Translation,
  User,
} from '../client/api';
import { Translatable } from './translator';

export function errorLogging(
  error: object | string,
  type?: Sentry.Severity,
): void {
  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    console.log(JSON.stringify(error));
    console.trace('Error at: ');
  } else {
    Sentry.addBreadcrumb({
      level: type ?? Sentry.Severity.Warning,
      data: { error },
    });
  }
}

export function generatePW(length = 12, bigCharset = true): string {
  let charset =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ01234567890123456789';
  if (bigCharset) {
    charset += '-_#+*!§$%&/()=?ß{[]}';
  }
  let retVal = '';
  for (let i = 0, n = charset.length; i < length; ++i) {
    retVal += charset.charAt(Math.floor(Math.random() * n));
  }
  return retVal;
}

export function toSpongebobCase(text: string): string {
  let j = 0;
  return text
    .split('')
    .map((letter) => {
      if (!letter.match(/[^A-Za-z]/g)) {
        j++;
      }
      return j % 2 ? letter.toUpperCase() : letter.toLowerCase();
    })
    .join('');
}

export function toSnakeCase(text: string): string {
  return text.replace(/([A-Z]{1,2})/g, (match) => `_${match.toLowerCase()}`);
}

export function toCamelCase(text: string): string {
  return text.replace(/_([a-z]{2})/g, (match) =>
    match === '_id'
      ? match.slice(1, 3).toUpperCase()
      : `${match.charAt(1).toUpperCase()}${match.charAt(2)}`,
  );
}

export function arrayDiff<T extends string | boolean | number>(
  a: T[],
  b: T[],
): T[] {
  return a.filter((t) => !b.includes(t));
}

export function isIDType(test: CollectionType | IDType): test is IDType {
  return typeof test === 'number';
}

export function arrayDiffObjectsMixed(
  a: CollectionType[],
  b: IDType[],
): CollectionType[] {
  return a.filter((t) => b.includes(t.id));
}

export function arrayDiffIdsMixed(a: IDType[], b: CollectionType[]): IDType[] {
  return a.filter((t) => !includesCustom(b, t));
}

export function includesCustom<T extends CollectionType>(
  array: T[],
  searchObj: T | IDType,
): boolean {
  return !!array.find((val) =>
    isIDType(searchObj) ? val.id === searchObj : val.id === searchObj.id,
  );
}

export const DAY_IN_MS = 1000 * 60 * 60 * 24;

const MATCH_LENGTH = 1000 * 60 * 105;

/**
 * Return true if match done, flase if match not startet or the number of minutes passed
 * @param match
 */
export function matchStatus(match: Match | MatchListElement): boolean | number {
  const startDate = getMatchDate(match).getTime();
  const now = new Date().getTime();
  return now > startDate && now < startDate + MATCH_LENGTH
    ? Math.ceil((now - startDate) / 60000)
    : now > startDate;
}
/**
 * Return true if match done, flase if match not startet or the number of minutes passed
 * @param match
 */
export function matchStatusDate(startDate: number): boolean | number {
  const now = new Date().getTime();
  return now > startDate && now < startDate + MATCH_LENGTH
    ? Math.ceil((now - startDate) / 60000)
    : now > startDate;
}

export function removeDuplicateMatchDays(dates: Date[]): Date[] {
  return dates
    .map((date) => date.getTime())
    .filter((date, index, arr) => arr.indexOf(date) === index)
    .map((date) => new Date(date));
}

export function intlLang(l: LanguageISO): string {
  return l === 'de' ? 'de-DE' : l === 'it' ? 'it-IT' : 'en-US';
}

export function formatDate(
  date: Date | string,
  l: LanguageISO,
  forInput = false,
  onlyTime = false,
  onlyDate = false,
  long = false,
): string {
  const d = new Date(date);
  if (typeof d === 'undefined') {
    return '';
  }
  if (forInput) {
    const iso = d.toISOString();
    if (onlyDate) return iso.split('T')[0];
    if (onlyTime) return iso.split('T')[1];
    return iso;
  }
  let options: Intl.DateTimeFormatOptions;
  if (onlyTime) {
    options = {
      hour: '2-digit',
      minute: '2-digit',
    };
    if (long) options.second = '2-digit';
    return d.toLocaleTimeString(intlLang(l), options);
  }
  if (onlyDate) {
    options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    };
    if (long) options.weekday = 'long';
  } else {
    options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    };
  }

  return DateTimeFormat(intlLang(l), options).format(d);
}

export function getSeason(league: League | LeagueListElement): string {
  // TODO mol schaugn: am 01.09.2022 hobmo ausgemocht dass mo des iaz nimmer unzoagn, also
  return '';
  // eslint-disable-next-line no-unreachable
  const { year } = league;
  return `${year.toString(10).slice(2)}/${(year + 1).toString(10).slice(2)}`;
}

export function calendarDate(date: Date): string {
  return `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString(10)
    .padStart(2, '0')}-${date.getDate().toString(10).padStart(2, '0')}`;
}

export function dayToNumber(date: Date): number {
  return date.getFullYear() * 10000 + date.getMonth() * 100 + date.getDate();
}

export function numberToDay(date: number): Date {
  const year = Math.floor(date / 10000);
  const month = Math.floor((date - year * 10000) / 100);
  const day = Math.floor(date - year * 10000 - month * 100);
  return new Date(
    `${year}-${(month + 1).toString().padStart(2, '0')}-${day
      .toString()
      .padStart(2, '0')}`,
  );
}

export function sameDay(date1: Date | number, date2: Date): boolean {
  if (typeof date1 === 'number' || date1 === undefined) return false;
  return (
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  );
}

export function getMatchDate(match: Match | MatchListElement): Date {
  return match.alternativeStartTime
    ? new Date(match.alternativeStartTime)
    : new Date(match.originalStartTime);
}

export function sortMatchesByTime(
  a: MatchListElement | Match,
  b: MatchListElement | Match,
): number {
  return getMatchDate(a).getTime() - getMatchDate(b).getTime();
}

export function sortLeagueMatches(
  a: Match | MatchListElement,
  b: Match | MatchListElement,
): number {
  const atime = matchStatus(a);
  const btime = matchStatus(b);
  if (typeof btime === 'number' && typeof atime === 'number')
    return btime - atime;
  if (typeof btime === 'number') return 1;
  if (typeof atime === 'number') return -1;
  if (!btime) return 1;
  if (!btime) return -1;
  return 0;
}

export function isGoalEvent(event: EventType | undefined): event is GoalEvent {
  return !!event && event.type === EventTypeEnum.GOAL;
}

export function isCardEvent(event: EventType | undefined): event is CardEvent {
  return !!event && event.type === EventTypeEnum.CARD;
}

export function isChangeEvent(
  event: EventType | undefined,
): event is ChangeEvent {
  return !!event && event.type === EventTypeEnum.CHANGE;
}

export function isChanceEvent(
  event: EventType | undefined,
): event is ChanceEvent {
  return !!event && event.type === EventTypeEnum.CHANCE;
}

export function getLineupPos(
  pos: LineupPosition,
  layout: { width: number; height: number },
  objectHeight: number,
  rotated?: boolean,
  whole?: boolean,
) {
  const h = whole ? layout.height : layout.height / 2;
  const top =
    pos.y * (rotated && whole ? layout.height : h) -
    (rotated ? -objectHeight : objectHeight);
  const left = Math.max(
    pos.x * layout.width - (rotated ? -objectHeight : objectHeight),
    0,
  );

  return {
    transform: [
      {
        translateY: rotated ? (rotated && whole ? h / 2 : h) - top : top,
      },
      { translateX: rotated ? layout.width - left : left },
    ],
  };
}

const mailReg =
  /^[a-zA-Z0-9!#$%&'*+/=?^`{}|~_-]+[.a-zA-Z0-9!#$%&'*+/=?^`{}|~_-]*@[a-zA-Z0-9]+[._a-zA-Z0-9-]*\.[a-zA-Z0-9]+$/i;

export function checkMail(email: string): boolean {
  return mailReg.test(email);
}

export function calcNewMatchStanding(
  team1ID: IDType,
  events: EventType[],
): {
  goal1: number;
  goal2: number;
} {
  let goal1 = 0;
  let goal2 = 0;
  events.forEach((e) => {
    if (e.type === EventTypeEnum.GOAL) {
      if (e.teamId === team1ID) goal1++;
      else goal2++;
    }
  });
  return { goal1, goal2 };
}

export function isAdmin(user: User | undefined | null): boolean {
  return !!(
    user && !!user.scopes.find((scope) => scope.key === ScopeEnum.ADMIN)
  );
}

export function isContentCreator(user: User | undefined | null): boolean {
  return (
    isAdmin(user) ||
    !!(
      user &&
      !!user.scopes.find((scope) => scope.key === ScopeEnum.CONTENT_CREATOR)
    )
  );
}

export function isInsider(
  user: User | undefined | null,
  teamID?: IDType,
  skipRequest?: boolean,
): boolean {
  return (
    isAdmin(user) ||
    !!(
      user &&
      user.groups.find(
        (group) =>
          (group.key === GroupEnum.INSIDER ||
            group.key === GroupEnum.TEAM_INSIDER) &&
          (skipRequest || !group.request) &&
          (!teamID || group.team.id === teamID),
      )
    )
  );
}

export function isTeamInsider(
  user: User | undefined | null,
  teamID?: IDType,
  skipRequest?: boolean,
): boolean {
  return (
    isAdmin(user) ||
    !!(
      user &&
      user.groups.find(
        (group) =>
          group.key === GroupEnum.TEAM_INSIDER &&
          (skipRequest || !group.request) &&
          (!teamID || group.team.id === teamID),
      )
    )
  );
}

export function isPremium(user: User | null | undefined): boolean {
  return !!user && user.premium /* || isAdmin(user)*/;
}

export function isRegistered(user: User | undefined | null): boolean {
  return !!(user && !user.anonymous);
}

export function calcMinute(match: Match | undefined | null): number {
  if (match) {
    const now = new Date();
    return Math.ceil((now.getTime() - getMatchDate(match).getTime()) / 60000);
  }
  return 0;
}

export function searchFilter(t: Translatable, query: string) {
  if (query.length === 0) return false;
  const queries = query.toLowerCase().trim().split(' ');
  queries.push(query.trim());
  for (let i = 0; i < queries.length; i++) {
    if ('name' in t) {
      if (
        t.name.text.toLowerCase().indexOf(queries[i]) !== -1 ||
        t.name.textDE.toLowerCase().indexOf(queries[i]) !== -1 ||
        t.name.textIT.toLowerCase().indexOf(queries[i]) !== -1 ||
        t.name.textEN.toLowerCase().indexOf(queries[i]) !== -1
      )
        return true;
    } else if (t.customName.indexOf(queries[i]) !== -1) return true;
  }
  return false;
}

export function unique<T extends CollectionType>(elements: T[]): T[] {
  const ids = elements.map((e) => e.id);
  return elements.filter((e, idx) => ids.indexOf(e.id) === idx);
}

export function hexToRgb(hex: string): { r: number; g: number; b: number } {
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : { r: 0, g: 0, b: 0 };
}

export function numberedHash(str: string): number {
  let hash = 0;
  let i;
  let chr;
  if (str.length === 0) return hash;
  for (i = 0; i < str.length; i++) {
    chr = str.charCodeAt(i);
    // eslint-disable-next-line no-bitwise
    hash = (hash << 5) - hash + chr;
    // eslint-disable-next-line no-bitwise
    hash |= 0; // Convert to 32bit in teger
  }
  return hash;
}

export function sortGroups(g1: Group, g2: Group): number {
  let a = 0;
  if (g1.request) a = 3;
  if (g1.key === GroupEnum.TEAM_INSIDER) a = 1;
  a = 2;
  return g2.request ? a - 3 : g2.key === GroupEnum.TEAM_INSIDER ? a - 1 : a - 2;
}

export function replaceOrAddResponseSingle<T extends CollectionType>(
  elem: T,
  storeArray: T[],
  cmpFunc?: (a: T, b: T) => boolean,
): T[] {
  let found = false;
  return storeArray
    .map((e) => {
      if (cmpFunc ? cmpFunc(e, elem) : e.id === elem.id) {
        found = true;
        return elem;
      }
      return e;
    })
    .concat(found ? [] : [elem]);
}

export function replaceOrAddResponseMultiple<T extends CollectionType>(
  elems: T[],
  storeArray: T[],
): T[] {
  const found: IDType[] = [];
  return storeArray
    .map((e) => {
      const elem = elems.find((el) => el.id === e.id);
      if (elem) {
        found.push(elem.id);
        return elem;
      }
      return e;
    })
    .concat(elems.filter((e) => found.indexOf(e.id) === -1));
}

export function getChangeEvents(
  events: EventType[],
  teamId?: IDType,
): ChangeEvent[] {
  return events.filter(
    (e) => isChangeEvent(e) && (!teamId || e.teamId === teamId),
  ) as ChangeEvent[];
}

export function getCardEvents(
  events: EventType[],
  teamId?: IDType,
  cardTypes?: CardTypeEnum[],
): CardEvent[] {
  return events.filter(
    (e) =>
      isCardEvent(e) &&
      (!teamId || e.teamId === teamId) &&
      (!cardTypes || cardTypes.indexOf(e.cardType.key) === -1),
  ) as CardEvent[];
}
export function getGoalEvents(
  events: EventType[],
  teamId?: IDType,
): GoalEvent[] {
  return events.filter(
    (e) => isGoalEvent(e) && (!teamId || e.teamId === teamId),
  ) as GoalEvent[];
}

export function getClosestDate(dates: Date[]): Date {
  const nowDate = new Date();
  nowDate.setHours(5);
  const now = nowDate.getTime();
  const differences = dates.map((d) => Math.abs(d.getTime() - now));
  const closest = Math.min(...differences);
  const idx = differences.indexOf(closest);
  if (idx === -1) return dates[0];
  return dates[idx];
}

export function getPlayersForEvent(
  match: Match,
  teamId: IDType,
  allPlayers: PlayerListElement[],
): PlayerListElement[] {
  let finalPlayers: PlayerListElement[] = [];
  if (match.lineupTeam1 && match.team1.id === teamId)
    finalPlayers = match.lineupTeam1.players.map((lpp) => lpp.player);
  else if (match.lineupTeam2 && match.team2.id === teamId)
    finalPlayers = match.lineupTeam2.players.map((lpp) => lpp.player);
  else
    return allPlayers.sort((a, b) => a.familyName.localeCompare(b.familyName));
  const changeEvents = getChangeEvents(match.events, teamId);
  /* const redPlayers = getCardEvents(match.events, teamId, [
    CardTypeEnum.YELLOW,
  ]).map(e => e.player.id);*/
  return finalPlayers
    .concat(changeEvents.map((e) => e.playerIn))
    .sort((a, b) => a.familyName.localeCompare(b.familyName));
  /*  .filter(
      p =>
        changeEvents.map(e => e.player.id).indexOf(p.id) === -1 &&
        redPlayers.indexOf(p.id) === -1,
    ) */
}

export function isFavorite(
  favorites: Favorite[],
  id: IDType,
  type: FavoriteType,
  team1Id: IDType,
  team2Id: IDType,
): boolean {
  return !!favorites.find(
    (fav) =>
      (fav.id === id && fav.type === type) ||
      (fav.type === 'team' && fav.id === team1Id) ||
      (fav.type === 'team' && fav.id === team2Id),
  );
}

export function getDeviceInfo(): Record<string, string> {
  return {
    brand: isMobile ? mobileVendor : osName,
    buildNumber: '',
    model: isMobile ? mobileModel : osVersion,
    modelAlt: browserName,
    systemName: osName,
    systemVersion: osVersion,
    version: '',
    type: isMobile ? 'Mobile' : 'Desktop',
    userAgent: navigator.userAgent,
  };
}

export function browserLang(): LanguageLocaleEnum {
  return navigator.language === LanguageLocaleEnum.IT ||
    navigator.language === LanguageLocaleEnum.DE
    ? navigator.language
    : LanguageLocaleEnum.EN;
}

export function sortEventsMinute(e1: EventType, e2: EventType): number {
  return e1.minute - e2.minute;
}

export function getMainLeague<T extends League | LeagueListElement>(
  leagues: T[],
): T | undefined {
  let max = 0;
  leagues.forEach((l) => {
    if (l.main && l.year > max) max = l.year;
  });
  return leagues.find((l) => l.main && l.year === max);
}

export function isTeam(elem: Translatable): elem is Team {
  return 'leagues' in elem;
}

export const MIN_AD_DISTANCE = 8;
export const MAX_AD_DISTANCE = 20;

export function shouldAdBePlaced(
  matchCounter: number,
  numOfAds: number,
): boolean {
  return (
    numOfAds === 0 ||
    (matchCounter > MIN_AD_DISTANCE &&
      matchCounter - MIN_AD_DISTANCE > Math.random() * MAX_AD_DISTANCE * 3)
  );
}

export function filterTranslatable(name: Translation, q: string) {
  return (
    name.text.toLowerCase().indexOf(q.toLowerCase()) !== -1 ||
    name.textIT.toLowerCase().indexOf(q.toLowerCase()) !== -1 ||
    name.textEN.toLowerCase().indexOf(q.toLowerCase()) !== -1 ||
    name.textDE.toLowerCase().indexOf(q.toLowerCase()) !== -1
  );
}

export function setHead(title: string) {
  document.title = `Clava-Sports - ${title}`;
}
