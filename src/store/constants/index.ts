import {
  Ad,
  AreaOfInterest,
  Blog,
  Bulletin,
  CardType,
  ChanceType,
  ExternalVideo,
  GoalDistributionMatch,
  GoalType,
  Group,
  Language,
  League,
  LeagueListElement,
  LeagueMatch,
  LineupType,
  Location,
  ManOfTheMatch,
  Match,
  MatchBetVoting,
  MatchListElement,
  Player,
  PlayerListElement,
  PlayerPosition,
  PlayerStatistic,
  PlayerStatisticDetail,
  SearchResult,
  Squad,
  Standing,
  Team,
  TeamListElement,
  TeamStatistic,
  TeamStatisticDetail,
  Transfer,
  User,
} from '../../client/api';
import { TranslatorKeys } from '../../config/translator';
import {
  AllStanding,
  Favorite,
  IDType,
  LineupExtended,
  Notification,
  PlayerInFocusMatch,
  SearchQuery,
} from '../../config/types';

export interface UserState {
  readonly value: User | null;
  readonly values: Group[];
  readonly areaOfInterest: AreaOfInterest | null;
  readonly favorites: Favorite[];
  readonly language: Language | null;
  readonly error: TranslatorKeys | null;
  readonly status: 'idle' | 'loading' | 'failed';
  readonly registerStatus: FormResponses;
  readonly loginStatus: FormResponses;
  readonly insiderStatus: FormResponses;
  readonly userStatus: FormResponses;
  readonly version: string;
  readonly versionOk: boolean;
}
export interface AoiState {
  readonly value: AreaOfInterest[];
  readonly error: TranslatorKeys | null;
  readonly status: 'idle' | 'loading' | 'failed';
}
export interface RouteState {
  readonly settings: boolean;
  readonly search: boolean;
  readonly logs: boolean;
  readonly status: 'idle' | 'loading' | 'failed';
  readonly error: TranslatorKeys | null;
  readonly shareContent: undefined | Match | Standing[] | LineupExtended;
}
export interface SearchState {
  readonly result: SearchResult | undefined;
  readonly prevQueries: SearchQuery[];
  readonly status: 'idle' | 'loading' | 'failed';
  readonly error: TranslatorKeys | null;
}
export interface LanguageState {
  readonly value: Language[];
  readonly error: TranslatorKeys | null;
  readonly status: 'idle' | 'loading' | 'failed';
}

export interface LeagueState {
  readonly value: League[];
  readonly error: TranslatorKeys | null;
  readonly status: 'idle' | 'loading' | 'failed';
  readonly teamStatistics: ValueStore<TeamStatistic[]>[];
  readonly playerStatistics: ValueStore<PlayerStatistic[]>[];
  readonly teamStatisticsDetail: ValueStore<TeamStatisticDetail>[];
  readonly playerStatisticsDetail: ValueStore<PlayerStatisticDetail>[];
  readonly tow: ValueStore<LineupExtended>[];
}

export interface NewsState {
  readonly news: Blog[];
  readonly transfers: Transfer[];
  readonly bulletins: Bulletin[];
  readonly videos: ExternalVideo[];
  readonly statusNews: 'idle' | 'loading' | 'failed';
  readonly statusTransfers: 'idle' | 'loading' | 'failed';
  readonly statusBulletins: 'idle' | 'loading' | 'failed';
  readonly statusVideos: 'idle' | 'loading' | 'failed';
  readonly error: TranslatorKeys | null;
}
export interface TeamState {
  readonly value: Team[];
  readonly searchValue: TeamListElement[];
  readonly ofLeague: ValueStore<TeamListElement[]>[];
  readonly player: Player | undefined;
  readonly players: Record<string, ValueStore<PlayerListElement[]>>;
  readonly statistics: ValueStore<PlayerStatistic[]>[];
  readonly statisticsDetail: ValueStore<PlayerStatisticDetail>[];
  readonly error: TranslatorKeys | null;
  readonly squad: Record<string, ValueStore<Squad[]>>;
  readonly positions: PlayerPosition[];
  readonly status: 'idle' | 'loading' | 'failed';
  readonly squadStatus: 'idle' | 'loading' | 'failed';
}
export interface ServerState {
  readonly status: boolean;
  readonly networkStatus: boolean;
  readonly error: TranslatorKeys | null;
  readonly notifications: Notification[];
}

export interface MatchState {
  readonly matchDays: Date[];
  readonly leagueMatchDays: ValueStore<Date[]>[];
  readonly matches: Match[];
  readonly matchElements: ValueStore<MatchListElement[]> | undefined;
  readonly matchesOfTeam: ValueStore<MatchListElement[]> | undefined;
  readonly leagueMatches: ValueStore<LeagueMatch[]> | undefined;
  readonly error: TranslatorKeys | null;
  readonly status: 'idle' | 'loading' | 'failed';
  readonly statusMatchDays: 'idle' | 'loading' | 'failed';
  readonly bet: ValueStore<MatchBetVoting> | undefined;
  readonly goalTypes: GoalType[];
  readonly cardTypes: CardType[];
  readonly chanceTypes: ChanceType[];
  readonly locations: Location[];
  readonly searchStatus: 'idle' | 'loading' | 'failed';
  readonly lineupTypes: LineupType[];
  readonly motm: ValueStore<ManOfTheMatch>[];
  readonly matchHistory: ValueStore<MatchListElement[]>[];
  readonly shapeComparison: ValueStore<MatchListElement[]>[];
  readonly goalDistribution: ValueStore<GoalDistributionMatch>[];
  readonly playerInFocus: ValueStore<PlayerInFocusMatch>[];
}

export interface StandingState {
  readonly value: ValueStore<AllStanding>[];
  readonly error: TranslatorKeys | null;
  readonly status: 'idle' | 'loading' | 'failed';
}

export interface AdState {
  readonly value: ValueStore<Ad[]>[];
  readonly error: TranslatorKeys | null;
  readonly status: 'idle' | 'loading' | 'failed';
}

export interface AdminState {
  readonly match: Match | null;
  readonly matches: MatchListElement[];
  readonly user: User | null;
  readonly users: User[];
  readonly league: League | null;
  readonly leagues: LeagueListElement[];
  readonly ad: Ad | null;
  readonly ads: Ad[];
  readonly location: Location | null;
  readonly locations: Location[];
  readonly news: Blog | null;
  readonly newses: Blog[];
  readonly team: Team | null;
  readonly teams: TeamListElement[];
  readonly video: ExternalVideo | null;
  readonly videos: ExternalVideo[];
  readonly error: TranslatorKeys | null;
  readonly status: 'idle' | 'loading' | 'failed';
  readonly statusSearch: 'idle' | 'loading' | 'failed';
}

export type ValueStore<T> = {
  id: IDType;
  date?: number;
  response: T;
  fetchDate: Date;
};

export type FormResponses =
  | 'ok'
  | (TranslatorKeys &
      (
        | 'ok'
        | 'pwNotSame'
        | 'pwNotValid'
        | 'pwWrong'
        | 'notRegistered'
        | 'mailInvalid'
        | 'mailGiven'
        | 'usernameGiven'
        | 'failed'
      ));
export const SEARCH_STORAGE_KEY = 'search_queries_v2';
