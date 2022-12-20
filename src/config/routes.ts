import { IDType } from './types';

const routes = [
  '/',
  '/home',
  '/home/:date',
  '/home/match/:matchId',
  '/home/match/:matchId/:view',
  '/league/:leagueId/:date',
  '/league/:leagueId/match/:matchId',
  '/league/:leagueId/match/:matchId/:view',
  '/league/:leagueId/:date/match/:matchId',
  '/league/:leagueId/:date/match/:matchId/:view',
  '/feed/:feedType/:feedId',
];

export declare type RouteParams = {
  date?: number;
  leagueId?: IDType;
  feedType?: 'news' | 'transfers' | 'videos' | 'bulletins';
  feedId?: IDType;
  matchId?: IDType;
  view?: 'highlights' | 'lineup' | 'table';
};

export function parseParams(params: RouteParams, old?: RouteParams): string {
  if ('feedType' in params)
    return `/feed/${params.feedType}${
      'feedId' in params ? `/${params.feedId}` : ''
    }`;
  params = { ...old, ...params };
  const date = 'date' in params && !!params.date ? `/${params.date}` : '';
  const view = 'view' in params && !!params.view ? `/${params.view}` : '';
  const match =
    'matchId' in params && !!params.matchId
      ? `/match/${params.matchId}${view}`
      : '';

  return `/${
    'leagueId' in params && !!params.leagueId
      ? `league/${params.leagueId}${date}${match}`
      : `home${date}${match}`
  }`;
}
// reload
