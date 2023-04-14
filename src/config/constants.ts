import { LeagueCategoryEnum } from '../client/api';

export const APP_STORE_URL =
  'https://apps.apple.com/us/app/clava-sports/id1637227932';
export const PLAY_STORE_URL =
  'https://play.google.com/store/apps/details?id=com.clava';

export const AMOUNT_MATCHDAYS = 30;

export const LEAGUE_CATEGORIES: LeagueCategoryEnum[] = [
  LeagueCategoryEnum.LEAGUE,
  LeagueCategoryEnum.WOMEN,
  LeagueCategoryEnum.YOUTH,
  LeagueCategoryEnum.CUP,
  LeagueCategoryEnum.VSS_YOUTH,
  LeagueCategoryEnum.VSS_FREE_TIME,
  LeagueCategoryEnum.VIENNA,
];

export const PROD_ENDPOINT = 'api.clava-sports.com';
export const DEV_ENDPOINT = 'api.dev.clava-sports.com';
export const STAG_ENDPOINT = 'api.stag.clava-sports.com';
export const BETA_ENDPOINT = 'api.beta.clava-sports.com';

export const PROD_SOCKET_ENDPOINT = 'socket.clava-sports.com';
export const DEV_SOCKET_ENDPOINT = 'socket.dev.clava-sports.com';
export const BETA_SOCKET_ENDPOINT = 'socket.beta.clava-sports.com';
export const STAG_SOCKET_ENDPOINT = 'socket.stag.clava-sports.com';

export const AS_FIRST_OPEN = 'clava-f-o';
export const AS_LANG = 'clava-lang';
export const AS_THEME = 'clava-theme';
export const AS_ENDPOINT = 'clava-endpoint';
export const AS_ADMIN_KEY = 'clava-admin-key';
export const AS_THEME_VAL_DARK = 'dark';
export const AS_THEME_VAL_LIGHT = 'light';

export const AS_AOI = 'areaOfInterest';
export const AS_SEASON = 'season';
export const AS_FAVORITES = 'favorites';
export const AS_CUSTOM_USERNAME = 'customUsername';

export const DefaultFadeTrans = {
  timeout: 250,
  baseClass: 'default-modal',
};
export const AGB_LEVEL = 'v1.0';
