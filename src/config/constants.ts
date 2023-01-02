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
];

export const PROD_ENDPOINT = 'api.clava-sports.com';
export const DEV_ENDPOINT = 'api.clava.kivi.bz.it';
export const BETA_ENDPOINT = 'api.beta.clava-sports.com';

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
