import { IDType } from '../../../../config/types';
import { LeagueListElement, TeamListElement } from '../../../../client/api';

export declare type SortTypes =
  | 'matchday'
  | 'date'
  | 'time'
  | 'league'
  | 'team1'
  | 'none'
  | 'team2';

export declare type SortDirections = 'ASC' | 'DESC';

export declare type MatchCreateCont = {
  matchDay?: number;
  team1?: TeamListElement;
  team2?: TeamListElement;
  startTime?: Date;
  league?: LeagueListElement;
  goal1?: number;
  goal2?: number;
};

export declare type MatchDayFilter = {
  type: 'matchDay';
  value: number;
};

export declare type LeagueFilter = {
  type: 'leagueId';
  value: IDType;
};
export declare type TeamFilter = {
  type: 'teamId';
  value: IDType;
};
export declare type DateFromFilter = {
  type: 'dateFrom';
  value: number;
};

export declare type DateToFilter = {
  type: 'dateTo';
  value: number;
};

export declare type RegionFilter = {
  type: 'aoiId';
  value: IDType;
};

export declare type MatchFilterType =
  | MatchDayFilter
  | DateFromFilter
  | DateToFilter
  | TeamFilter
  | LeagueFilter
  | RegionFilter;

export declare type MatchFilterRemoveType = { type: MatchFilterType['type'] };
export type MatchPatchCont = {
  locationId?: number;
  leagueId?: number;
  startTime?: string;
  refereeId?: number;
  cancelled?: boolean;
  matchDay?: number;
  team1Id?: number;
  goal1?: number;
  team2Id?: number;
  goal2?: number;
  matchId?: number;
};

export declare type LastAction<T extends keyof MatchPatchCont> = Record<
  T,
  MatchPatchCont[T]
>;

export declare type MatchDeletion = {
  type: 'delete';
  index: number;
  lastAction: undefined;
  change: undefined;
};
export declare type MatchEdition = {
  type: 'edit';
  index: number;
  lastAction: LastAction<any>;
  change: MatchPatchCont;
};

export declare type MatchCreation = {
  type: 'create';
  index: number;
  lastAction: LastAction<any>;
  change: MatchPatchCont;
};

export declare type MatchChange = MatchCreation | MatchEdition | MatchDeletion;
