import {
  Ad,
  AreaOfInterest,
  Badge,
  Blog,
  Bulletin,
  CardType,
  ChanceType,
  EventType,
  ExternalVideo,
  File,
  GoalDistributionMatch,
  GoalEvent,
  GoalType,
  Group,
  Language,
  League,
  LeagueMatch,
  Lineup,
  LineupType,
  Location,
  ManOfTheMatch,
  Match,
  MatchBetVoting,
  MatchListElement,
  OutSummary,
  Player,
  PlayerListElement,
  PlayerPosition,
  PlayerStatistic,
  PlayerStatisticDetail,
  SearchResult,
  Sponsor,
  Squad,
  Team,
  TeamListElement,
  TeamStatistic,
  TeamStatisticDetail,
  Transfer,
  User,
} from '../../client/api';
import { TranslatorKeys } from '../../config/translator';
import { FormResponses, ValueStore } from '../constants';
import {
  AllStanding,
  Favorite,
  IDType,
  LineupExtended,
  Notification,
  PlayerInFocusMatch,
  QueryTarget,
  SearchQuery,
} from '../../config/types';

export enum AoiActionTypes {
  FETCH_AOI = '@@aoi/FETCH_AOI',
  FETCH_SUCCESS = '@@aoi/FETCH_SUCCESS',
  FETCH_ERROR = '@@aoi/FETCH_ERROR',
}

export type AoiActions =
  | { type: AoiActionTypes.FETCH_AOI }
  | { type: AoiActionTypes.FETCH_SUCCESS; payload: AreaOfInterest[] }
  | { type: AoiActionTypes.FETCH_ERROR; payload: TranslatorKeys };

export enum LanguageActionTypes {
  FETCH_LANGUAGES = '@@language/FETCH_LANGUAGES',
  FETCH_SUCCESS = '@@language/FETCH_SUCCESS',
  FETCH_ERROR = '@@language/FETCH_ERROR',
}

export type LanguageActions =
  | { type: LanguageActionTypes.FETCH_LANGUAGES }
  | { type: LanguageActionTypes.FETCH_SUCCESS; payload: Language[] }
  | { type: LanguageActionTypes.FETCH_ERROR; payload: TranslatorKeys };

export enum LeagueActionTypes {
  FETCH_LEAGUES = '@@league/FETCH_LEAGUES',
  FETCH_STATISTIC = '@@league/FETCH_STATISTIC',
  FETCH_SUCCESS = '@@league/FETCH_SUCCESS',
  FETCH_SUCCESS_SINGLE = '@@league/FETCH_SUCCESS_SINGLE',
  FETCH_SUCCESS_STATISTICS_TEAM = '@@league/FETCH_SUCCESS_STATISTICS_TEAM',
  FETCH_SUCCESS_STATISTICS_PLAYER = '@@league/FETCH_SUCCESS_STATISTICS_PLAYER',
  FETCH_SUCCESS_STATISTIC_TEAM = '@@league/FETCH_SUCCESS_STATISTIC_TEAM',
  FETCH_SUCCESS_STATISTIC_PLAYER = '@@league/FETCH_SUCCESS_STATISTIC_PLAYER',
  FETCH_SUCCESS_TEAM_OF_THE_WEEK = '@@league/FETCH_SUCCESS_TEAM_OF_THE_WEEK',
  FETCH_ERROR = '@@league/FETCH_ERROR',
  RESET = '@@league/RESET',
}

export type LeagueActions =
  | {
      type:
        | LeagueActionTypes.FETCH_LEAGUES
        | LeagueActionTypes.FETCH_STATISTIC
        | LeagueActionTypes.RESET;
    }
  | {
      type:
        | LeagueActionTypes.FETCH_SUCCESS_SINGLE
        | LeagueActionTypes.FETCH_SUCCESS;
      payload: League[];
    }
  | {
      type: LeagueActionTypes.FETCH_SUCCESS_STATISTICS_TEAM;
      payload: ValueStore<TeamStatistic[]>;
    }
  | {
      type: LeagueActionTypes.FETCH_SUCCESS_TEAM_OF_THE_WEEK;
      payload: ValueStore<LineupExtended>;
    }
  | {
      type: LeagueActionTypes.FETCH_SUCCESS_STATISTICS_PLAYER;
      payload: ValueStore<PlayerStatistic[]>;
    }
  | {
      type: LeagueActionTypes.FETCH_SUCCESS_STATISTIC_TEAM;
      payload: ValueStore<TeamStatisticDetail>;
    }
  | {
      type: LeagueActionTypes.FETCH_SUCCESS_STATISTIC_PLAYER;
      payload: ValueStore<PlayerStatisticDetail>;
    }
  | { type: LeagueActionTypes.FETCH_ERROR; payload: TranslatorKeys };

export enum SearchActionTypes {
  SEARCH = '@@search/SEARCH',
  RESET_SEARCH = '@@search/RESET_SEARCH',
  SEARCH_SUCCESS = '@@search/SEARCH_SUCCESS',
  SEARCH_SUCCESS_EXT = '@@search/SEARCH_SUCCESS_EXT',
  SEARCH_ERROR = '@@search/SEARCH_ERROR',
  GET_PREV_QUERIES = '@@search/GET_PREV_SEARCHES',
  FOUND_PREV_SEARCHES = '@@search/FOUND_PREV_SEARCHES',
  REMOVE_HISTORY_ELEM = '@@search/REMOVE_HISTORY_ELEM',
  CLICK_SEARCH_RESULT = '@@search/CLICK_SEARCH_RESULT',
}

export type SearchActions =
  | {
      type:
        | SearchActionTypes.SEARCH
        | SearchActionTypes.RESET_SEARCH
        | SearchActionTypes.GET_PREV_QUERIES;
    }
  | {
      type:
        | SearchActionTypes.SEARCH_SUCCESS
        | SearchActionTypes.SEARCH_SUCCESS_EXT;
      payload: SearchResult;
    }
  | {
      type:
        | SearchActionTypes.CLICK_SEARCH_RESULT
        | SearchActionTypes.REMOVE_HISTORY_ELEM;
      payload: QueryTarget;
    }
  | { type: SearchActionTypes.FOUND_PREV_SEARCHES; payload: SearchQuery[] }
  | { type: SearchActionTypes.SEARCH_ERROR; payload: TranslatorKeys };

export enum StandingActionTypes {
  FETCH_BY_LEAGUE = '@@standing/FETCH_BY_LEAGUE',
  FETCH_SUCCESS = '@@standing/FETCH_SUCCESS',
  FETCH_ERROR = '@@standing/FETCH_ERROR',
  REFRESH = '@@standing/REFRESH',
  RESET = '@@standing/RESET',
}

export type StandingActions =
  | {
      type: StandingActionTypes.FETCH_ERROR;
      payload: TranslatorKeys;
    }
  | { type: StandingActionTypes.FETCH_BY_LEAGUE | StandingActionTypes.RESET }
  | {
      type: StandingActionTypes.FETCH_SUCCESS;
      payload: ValueStore<AllStanding>;
    }
  | { type: StandingActionTypes.REFRESH; payload: IDType };

export enum TeamActionTypes {
  FETCH_TEAMS_OF_LEAGUE = '@@teams/FETCH_TEAMS_OF_LEAGUE',
  FETCH_TEAM = '@@teams/FETCH_TEAM',
  FETCH_PLAYERS = '@@teams/FETCH_PLAYERS',
  FETCH_PLAYER = '@@teams/FETCH_PLAYER',
  FETCH_STATISTICS = '@@teams/FETCH_STATISTICS',
  FETCH_SUCCESS = '@@teams/FETCH_SUCCESS',
  FETCH_SUCCESS_OF_LEAGUE = '@@teams/FETCH_SUCCESS_OF_LEAGUE',
  FETCH_SUCCESS_PLAYERS = '@@teams/FETCH_SUCCESS_PLAYERS',
  FETCH_SUCCESS_PLAYER = '@@teams/FETCH_SUCCESS_PLAYER',
  PATCH_SUCCESS_PLAYER = '@@teams/PATCH_SUCCESS_PLAYER',
  FETCH_SUCCESS_STATISTICS = '@@teams/FETCH_SUCCESS_STATISTICS',
  FETCH_SUCCESS_STATISTICS_DETAIL = '@@teams/FETCH_SUCCESS_STATISTICS_DETAIL',
  EDIT_TEAM_THUMB = '@@teams/EDIT_TEAM_THUMB',
  ADD_SPONSOR = '@@teams/ADD_SPONSOR',
  ADD_SPONSOR_SUCCESS = '@@teams/ADD_SPONSOR_SUCCESS',
  REMOVE_SPONSOR = '@@teams/REMOVE_SPONSOR',
  REMOVE_SPONSOR_SUCCESS = '@@teams/REMOVE_SPONSOR_SUCCESS',
  FETCH_ERROR = '@@teams/FETCH_ERROR',
  TEAM_FOUND = '@@teams/TEAM_FOUND',
  SEARCH = '@@teams/SEARCH',
  SEARCH_ERROR = '@@teams/SEARCH_ERROR',
  FETCH_SQUAD = '@@teams/FETCH_SQUAD',
  FETCH_SUCCESS_SQUAD = '@@teams/FETCH_SUCCESS_SQUAD',
  FETCH_POSITIONS = '@@teams/FETCH_POSITIONS',
  FETCH_SUCCESS_POSITIONS = '@@teams/FETCH_SUCCESS_POSITIONS',
  ADD_LOCATION = '@@teams/ADD_LOCATION',
  ADD_LOCATION_SUCCESS = '@@teams/ADD_LOCATION_SUCCESS',
  RESET = '@@teams/RESET',
}

export const SQUAD_PREFIX = 'st_';
export const PLAYERS_PREFIX = 'pt_';

export type TeamActions =
  | {
      type: TeamActionTypes.FETCH_ERROR | TeamActionTypes.SEARCH_ERROR;
      payload: TranslatorKeys;
    }
  | {
      type: TeamActionTypes.RESET;
    }
  | {
      type:
        | TeamActionTypes.FETCH_TEAM
        | TeamActionTypes.FETCH_PLAYERS
        | TeamActionTypes.FETCH_PLAYER
        | TeamActionTypes.FETCH_SQUAD
        | TeamActionTypes.REMOVE_SPONSOR
        | TeamActionTypes.ADD_SPONSOR
        | TeamActionTypes.ADD_LOCATION
        | TeamActionTypes.SEARCH
        | TeamActionTypes.FETCH_POSITIONS
        | TeamActionTypes.FETCH_STATISTICS
        | TeamActionTypes.FETCH_TEAMS_OF_LEAGUE;
    }
  | { type: TeamActionTypes.FETCH_SUCCESS; payload: Team }
  | { type: TeamActionTypes.EDIT_TEAM_THUMB; payload: ValueStore<File> }
  | { type: TeamActionTypes.FETCH_SUCCESS_SQUAD; payload: ValueStore<Squad[]> }
  | { type: TeamActionTypes.FETCH_SUCCESS_POSITIONS; payload: PlayerPosition[] }
  | {
      type: TeamActionTypes.FETCH_SUCCESS_OF_LEAGUE;
      payload: ValueStore<TeamListElement[]>;
    }
  | {
      type: TeamActionTypes.ADD_SPONSOR_SUCCESS;
      payload: ValueStore<Sponsor>;
    }
  | {
      type: TeamActionTypes.ADD_LOCATION_SUCCESS;
      payload: Team;
    }
  | {
      type: TeamActionTypes.REMOVE_SPONSOR_SUCCESS;
      payload: ValueStore<IDType>;
    }
  | {
      type: TeamActionTypes.TEAM_FOUND;
      payload: TeamListElement[];
    }
  | {
      type: TeamActionTypes.FETCH_SUCCESS_PLAYER;
      payload: Player;
    }
  | {
      type: TeamActionTypes.PATCH_SUCCESS_PLAYER;
      payload: ValueStore<Player>;
    }
  | {
      type: TeamActionTypes.FETCH_SUCCESS_PLAYERS;
      payload: ValueStore<PlayerListElement[]>;
    }
  | {
      type: TeamActionTypes.FETCH_SUCCESS_STATISTICS;
      payload: ValueStore<PlayerStatistic[]>;
    }
  | {
      type: TeamActionTypes.FETCH_SUCCESS_STATISTICS_DETAIL;
      payload: ValueStore<PlayerStatisticDetail>;
    };

export enum UserActionTypes {
  FETCH_ME = '@@user/ME',
  LOGIN = '@@user/LOGIN',
  REGISTER = '@@user/REGISTER',
  REFRESH = '@@user/REFRESH',
  FETCH_SUCCESS = '@@user/FETCH_SUCCESS',
  FETCH_ERROR = '@@user/FETCH_ERROR',
  GET_BASE_DATA = '@@user/GET_BASE_DATA',
  BASE_DATA_MISSING = '@@user/BASE_DATA_MISSING',
  BASE_DATA_SUCCESS = '@@user/BASE_DATA_SUCCESS',
  ADD_FAVORITE = '@@user/ADD_FAVORITE',
  ADD_FAVORITE_SUCCESS = '@@user/ADD_FAVORITE_SUCCESS',
  REMOVE_FAVORITE = '@@user/REMOVE_FAVORITE',
  REMOVE_FAVORITE_SUCCESS = '@@user/REMOE_FAVORITE_SUCCESS',
  ALTER_FAVORITE = '@@user/ALTER_FAVORITE',
  ALTER_FAVORITE_SUCCESS = '@@user/ALTER_FAVORITE_FAVORITE_SUCCESS',
  SET_AOI = '@@user/SET_AOI',
  SET_AOI_SUCCESS = '@@user/SET_AOI_SUCCESS',
  SET_LANGUAGE = '@@user/SET_LANGUAGE',
  SET_LANGUAGE_SUCCESS = '@@user/SET_LANGUAGE_SUCCESS',
  PATCH_USER = '@@user/PATCH_USER',
  PATCH_SUCCESS = '@@user/PATCH_SUCCESS',
  PATCH_FAILED = '@@user/PATCH_FAILED',
  PW_FORGOT_FAILED = '@@user/PW_FORGOT_FAILED',
  REGISTER_FORM_INVALID = '@@user/REGISTER_FORM_INVALID',
  LOGIN_FORM_INVALID = '@@user/LOGIN_FORM_INVALID',
  INSIDER_FORM_INVALID = '@@user/INSIDER_FORM_INVALID',
  USER_FORM_INVALID = '@@user/USER_FORM_INVALID',
  RESET_FORM = '@@user/RESET_FORM',
  PW_FORGOT = '@@user/PW_FORGOT',
  UNAUTHORIZED = '@@user/UNAUTHORIZED',
  LOGOUT = '@@user/LOGOUT',
  MANAGE_USER = '@@user/MANAGE_USER',
  MANAGE_USER_FAILED = '@@user/MANAGE_USER_FAILED',
  MANAGE_USER_SUCCESS = '@@user/MANAGE_USER_SUCCESS',
  GET_INSIDERS_SUCCESS = '@@user/GET_INSIDERS_SUCCESS',
  GET_INSIDERS = '@@user/GET_INSIDERS',
  DECLINE_SUCCESS = '@@user/DECLINE_SUCCESS',
  GET_VERSION = '@@user/GET_VERSION',
  GET_VERSION_SUCCESS = '@@user/GET_VERSION_SUCCESS',
  CHECK_VERSION = '@@user/CHECK_VERSION',
  CHECK_VERSION_SUCCESS = '@@user/CHECK_VERSION_SUCCESS',
  DELETE_ME_SUCCESS = '@@user/DELETE_ME_SUCCESS',
}

export declare type UserActions =
  | {
      type:
        | UserActionTypes.REFRESH
        | UserActionTypes.GET_BASE_DATA
        | UserActionTypes.ADD_FAVORITE
        | UserActionTypes.ALTER_FAVORITE
        | UserActionTypes.FETCH_ME
        | UserActionTypes.SET_AOI
        | UserActionTypes.SET_LANGUAGE
        | UserActionTypes.MANAGE_USER
        | UserActionTypes.LOGOUT
        | UserActionTypes.REGISTER
        | UserActionTypes.GET_INSIDERS
        | UserActionTypes.GET_VERSION
        | UserActionTypes.CHECK_VERSION
        | UserActionTypes.LOGIN
        | UserActionTypes.PATCH_USER
        | UserActionTypes.UNAUTHORIZED
        | UserActionTypes.RESET_FORM
        | UserActionTypes.REMOVE_FAVORITE;
    }
  | {
      type: UserActionTypes.FETCH_SUCCESS | UserActionTypes.PATCH_SUCCESS;
      payload: User;
    }
  | {
      type: UserActionTypes.GET_VERSION_SUCCESS;
      payload: string;
    }
  | {
      type: UserActionTypes.CHECK_VERSION_SUCCESS;
      payload: boolean;
    }
  | {
      type: UserActionTypes.DELETE_ME_SUCCESS;
      payload: number;
    }
  | {
      type: UserActionTypes.GET_INSIDERS_SUCCESS;
      payload: Group[];
    }
  | {
      type: UserActionTypes.MANAGE_USER_SUCCESS;
      payload: Group;
    }
  | {
      type: UserActionTypes.DECLINE_SUCCESS;
      payload: IDType;
    }
  | {
      type: UserActionTypes.PW_FORGOT;
      payload: string;
    }
  | {
      type:
        | UserActionTypes.REGISTER_FORM_INVALID
        | UserActionTypes.LOGIN_FORM_INVALID
        | UserActionTypes.USER_FORM_INVALID
        | UserActionTypes.INSIDER_FORM_INVALID;
      payload: FormResponses;
    }
  | {
      type:
        | UserActionTypes.MANAGE_USER_FAILED
        | UserActionTypes.FETCH_ERROR
        | UserActionTypes.PW_FORGOT_FAILED
        | UserActionTypes.BASE_DATA_MISSING
        | UserActionTypes.PATCH_FAILED;
      payload: TranslatorKeys;
    }
  | {
      type:
        | UserActionTypes.REMOVE_FAVORITE_SUCCESS
        | UserActionTypes.ALTER_FAVORITE_SUCCESS
        | UserActionTypes.ADD_FAVORITE_SUCCESS;
      payload: Favorite[];
    }
  | {
      type: UserActionTypes.SET_AOI_SUCCESS;
      payload: AreaOfInterest;
    }
  | {
      type: UserActionTypes.SET_LANGUAGE_SUCCESS;
      payload: Language;
    }
  | {
      type: UserActionTypes.BASE_DATA_SUCCESS;
      payload: {
        areaOfInterest: AreaOfInterest;
        favorites: Favorite[];
        language: Language;
      };
    };
export enum AdActionTypes {
  FETCH_BY_POS = '@@ad/FETCH_BY_POS',
  FETCH = '@@ad/FETCH',
  FETCH_SUCCESS = '@@ad/FETCH_SUCCESS',
  FETCH_SUCCESS_TEMP = '@@ad/FETCH_SUCCESS_TEMP',
  FETCH_ERROR = '@@ad/FETCH_ERROR',
  RESET = '@@ad/RESET',
}

export type AdActions =
  | {
      type: AdActionTypes.FETCH_ERROR;
      payload: TranslatorKeys;
    }
  | {
      type:
        | AdActionTypes.FETCH_BY_POS
        | AdActionTypes.RESET
        | AdActionTypes.FETCH;
    }
  | { type: AdActionTypes.FETCH_SUCCESS; payload: ValueStore<Ad[]> };

export enum ServerActionTypes {
  GONE = '@@server/gone',
  NO_CONNECTION = '@@server/NO_CONNECTION',
  OK = '@@server/OK',
  NEW_NOTIFICATION = '@@server/NEW_NOTIFICATION',
  NOTIFICATION_SHOWN = '@@server/NOTIFICATION_SHOWN',
}

export type ServerActions =
  | {
      type:
        | ServerActionTypes.NO_CONNECTION
        | ServerActionTypes.GONE
        | ServerActionTypes.OK
        | ServerActionTypes.NOTIFICATION_SHOWN;
    }
  | { type: ServerActionTypes.NEW_NOTIFICATION; payload: Notification };

export enum RouteActionTypes {
  OPEN_SETTINGS = '@@route/OPEN_SETTINGS',
  CLOSE_SETTINGS = '@@route/CLOSE_SETTINGS',
  OPEN_SEARCH = '@@route/OPEN_SEARCH',
  CLOSE_SEARCH = '@@route/CLOSE_SEARCH',
  OPEN_LOG = '@@route/OPEN_LOG',
  CLOSE_LOG = '@@route/CLOSE_LOG',
  SHARE = '@@route/SHARE',
  SHARE_EXIT = '@@route/SHARE_EXIT',
}

export type RouteActions =
  | {
      type:
        | RouteActionTypes.CLOSE_SEARCH
        | RouteActionTypes.OPEN_SEARCH
        | RouteActionTypes.CLOSE_SETTINGS
        | RouteActionTypes.SHARE_EXIT
        | RouteActionTypes.OPEN_LOG
        | RouteActionTypes.CLOSE_LOG
        | RouteActionTypes.OPEN_SETTINGS;
    }
  | {
      type: RouteActionTypes.SHARE;
      payload: Match | LineupExtended;
    };

export enum MatchActionTypes {
  FETCH_MATCH = '@@match/FETCH_MATCH',
  FETCH_MATCH_DAYS = '@@match/FETCH_MATCH_DAYS',
  REMOVE_MATCH_DAY = '@@match/REMOVE_MATCH_DAY',
  FETCH_MATCH_DAYS_LEAGUE = '@@match/FETCH_MATCH_DAYS_LEAGUE',
  FETCH_LEAGUE_MATCHES_DAY = '@@match/FETCH_LEAGUE_MATCHES_DAY',
  FETCH_LEAGUE_MATCHES_TEAM = '@@match/FETCH_LEAGUE_MATCHES_TEAM',
  FETCH_MATCHES_OF_LEAGUE = '@@match/FETCH_MATCHES_OF_LEAGUE',
  FETCH_SUCCESS_MATCHES_OF_LEAGUE = '@@match/FETCH_SUCCESS_MATCHES_OF_LEAGUE',
  FETCH_MATCHES_OF_TEAM = '@@match/FETCH_MATCHES_OF_TEAM',
  FETCH_SUCCESS_MATCHES_OF_TEAM = '@@match/FETCH_SUCCESS_MATCHES_OF_TEAM',
  FETCH_SUCCESS_LEAGUE_MATCHES = '@@match/FETCH_SUCCESS_LEAGUE_MATCHES',
  FETCH_SUCCESS_MATCHES = '@@match/FETCH_SUCCESS_MATCHES',
  FETCH_SUCCESS_MATCH_DAYS = '@@match/FETCH_SUCCESS_MATCHDAYS',
  RESTORE_MATCHDAYS = '@@match/RESTORE_MATCHDAYS',
  FETCH_SUCCESS_MATCH_DAYS_LEAGUE = '@@match/FETCH_SUCCESS_MATCH_DAYS_LEAGUE',
  FETCH_ERROR = '@@match/FETCH_ERROR',
  FETCH_MATCH_BET = '@@match/FETCH_MATCH_BET',
  FETCH_MATCH_BET_SUCCESS = '@@match/FETCH_MATCH_BET_SUCCESS',
  FETCH_EVENTS = '@@match/FETCH_EVENTS',
  FETCH_EVENTS_SUCCESS = '@@match/FETCH_EVENTS_SUCCESS',
  REFRESH = '@@match/REFRESH',
  POST_EVENT = '@@match/POST_EVENT',
  REFRESH_MATCH = '@@match/REFRESH_MATCH',
  REFRESH_MATCH_DAYS = '@@match/REFRESH_MATCH_DAYS',
  POST_EVENT_SUCCESS = '@@match/POST_EVENT_SUCCESS',
  PATCH_EVENT_SUCCESS = '@@match/PATCH_EVENT_SUCCESS',
  FETCH_EVENT_TYPE_SUCCESS = '@@match/FETCH_EVENT_TYPE_SUCCESS',
  FETCH_EVENT_TYPE = '@@match/FETCH_EVENT_TYPE',
  POST_MATCH = '@@match/POST_MATCH',
  POST_MATCH_SUCCESS = '@@match/POST_MATCH_SUCCESS',
  SEARCH_LOCATIONS = '@@match/SEARCH_LOCATIONS',
  LOCATION_FOUND = '@@match/LOCATION_FOUND',
  FETCH_LINEUP = '@@match/FETCH_LINEUP',
  FETCH_LINEUP_TYPES = '@@match/FETCH_LINEUP_TYPES',
  FETCH_LINEUP_SUCCESS = '@@match/FETCH_LINEUP_SUCCESS',
  FETCH_LINEUP_TYPES_SUCCESS = '@@match/FETCH_LINEUP_TYPES_SUCCESS',
  FETCH_MOTM = '@@match/FETCH_MOTM',
  FETCH_SUCCESS_MOTM = '@@match/FETCH_SUCCESS_MOTM',
  FETCH_SUCCESS_SHAPE_COMPARISON = '@@match/FETCH_SUCCESS_SHAPE_COMPARISON',
  PUT_SUCCESS_MOTM = '@@match/PUT_SUCCESS_MOTM',
  FETCH_SUCCESS_GOAL_DISTRIBUTION = '@@match/FETCH_SUCCESS_GOAL_DISTRIBUTION',
  FETCH_SUCCESS_MATCH_HISTORY = '@@match/FETCH_SUCCESS_MATCH_HISTORY',
  FETCH_SUCCESS_PLAYER_IN_FOCUS = '@@match/FETCH_SUCCESS_PLAYER_IN_FOCUS',
  DELETE_EVENT_SUCCESS = '@@match/DELETE_EVENT_SUCCESS',
  RESET = '@@match/RESET',
}

export type MatchActions =
  | {
      type:
        | MatchActionTypes.FETCH_MATCH
        | MatchActionTypes.POST_MATCH
        | MatchActionTypes.FETCH_EVENTS
        | MatchActionTypes.FETCH_MATCH_DAYS
        | MatchActionTypes.FETCH_MATCHES_OF_TEAM
        | MatchActionTypes.FETCH_LEAGUE_MATCHES_DAY
        | MatchActionTypes.FETCH_LINEUP
        | MatchActionTypes.FETCH_MOTM
        | MatchActionTypes.FETCH_EVENT_TYPE
        | MatchActionTypes.FETCH_MATCH_DAYS_LEAGUE
        | MatchActionTypes.FETCH_LINEUP_TYPES
        | MatchActionTypes.RESET
        | MatchActionTypes.SEARCH_LOCATIONS
        | MatchActionTypes.FETCH_LEAGUE_MATCHES_TEAM
        | MatchActionTypes.RESTORE_MATCHDAYS
        | MatchActionTypes.POST_EVENT
        | MatchActionTypes.FETCH_MATCHES_OF_LEAGUE
        | MatchActionTypes.FETCH_MATCH_BET;
    }
  | {
      type: MatchActionTypes.FETCH_MATCH_BET_SUCCESS;
      payload: ValueStore<MatchBetVoting>;
    }
  | {
      type: MatchActionTypes.REFRESH_MATCH;
      payload: ValueStore<Match>;
    }
  | {
      type: MatchActionTypes.REFRESH_MATCH_DAYS;
      payload: {
        match: Match;
        addDate: string;
        removeDate: string;
        aoiID: IDType;
      };
    }
  | {
      type: MatchActionTypes.DELETE_EVENT_SUCCESS;
      payload: ValueStore<number>;
    }
  | {
      type: MatchActionTypes.REMOVE_MATCH_DAY;
      payload: Date;
    }
  | {
      type: MatchActionTypes.FETCH_LINEUP_SUCCESS;
      payload: ValueStore<Lineup>;
    }
  | {
      type: MatchActionTypes.FETCH_SUCCESS_GOAL_DISTRIBUTION;
      payload: ValueStore<GoalDistributionMatch>;
    }
  | {
      type:
        | MatchActionTypes.FETCH_SUCCESS_MOTM
        | MatchActionTypes.PUT_SUCCESS_MOTM;
      payload: ValueStore<ManOfTheMatch>;
    }
  | {
      type: MatchActionTypes.FETCH_LINEUP_TYPES_SUCCESS;
      payload: LineupType[];
    }
  | {
      type: MatchActionTypes.LOCATION_FOUND;
      payload: Location[];
    }
  | {
      type: MatchActionTypes.FETCH_EVENT_TYPE_SUCCESS;
      payload: ValueStore<GoalType[] | ChanceType[] | CardType[]>;
    }
  | {
      type: MatchActionTypes.FETCH_EVENTS_SUCCESS;
      payload: ValueStore<EventType[]>;
    }
  | {
      type:
        | MatchActionTypes.POST_EVENT_SUCCESS
        | MatchActionTypes.PATCH_EVENT_SUCCESS;
      payload: ValueStore<EventType>;
    }
  | {
      type: MatchActionTypes.FETCH_SUCCESS_MATCH_DAYS;
      payload: string[];
    }
  | {
      type: MatchActionTypes.FETCH_SUCCESS_MATCH_DAYS_LEAGUE;
      payload: ValueStore<Date[]>;
    }
  | {
      type: MatchActionTypes.FETCH_SUCCESS_MATCHES;
      payload: Match;
    }
  | {
      type: MatchActionTypes.POST_MATCH_SUCCESS;
      payload: Match;
    }
  | {
      type: MatchActionTypes.FETCH_SUCCESS_LEAGUE_MATCHES;
      payload: ValueStore<LeagueMatch[]>;
    }
  | {
      type:
        | MatchActionTypes.FETCH_SUCCESS_MATCHES_OF_TEAM
        | MatchActionTypes.FETCH_SUCCESS_SHAPE_COMPARISON
        | MatchActionTypes.FETCH_SUCCESS_MATCH_HISTORY
        | MatchActionTypes.FETCH_SUCCESS_MATCHES_OF_LEAGUE;
      payload: ValueStore<MatchListElement[]>;
    }
  | {
      type: MatchActionTypes.FETCH_ERROR;
      payload: TranslatorKeys;
    }
  | {
      type: MatchActionTypes.FETCH_SUCCESS_PLAYER_IN_FOCUS;
      payload: ValueStore<PlayerInFocusMatch>;
    }
  | {
      type: MatchActionTypes.REFRESH;
      payload: IDType;
    };

export enum NewsActionTypes {
  FETCH_MIXED_SUCCESS = '@@news/FETCH_MIXED_SUCCESS',
  FETCH_NEWS = '@@news/FETCH_NEWS',
  FETCH_TRANSFERS = '@@news/FETCH_TRANSFERS',
  FETCH_BULLETINS = '@@news/FETCH_BULLETINS',
  FETCH_VIDEOS = '@@news/FETCH_VIDEOS',
  FETCH_NEWS_SUCCESS = '@@news/FETCH_NEWS_SUCCESS',
  FETCH_TRANSFERS_SUCCESS = '@@news/FETCH_TRANSFERS_SUCCESS',
  FETCH_VIDEOS_SUCCESS = '@@news/FETCH_VIDEOS_SUCCESS',
  CREATE_VIDEOS_SUCCESS = '@@news/CREATE_VIDEOS_SUCCESS',
  FETCH_BULLETINS_SUCCESS = '@@news/FETCH_BULLETINS_SUCCESS',
  FETCH_ERROR = '@@news/FETCH_ERROR',
  REFRESH = '@@news/REFRESH',
  RESET = '@@news/RESET',
}

export type NewsActions =
  | {
      type:
        | NewsActionTypes.FETCH_NEWS
        | NewsActionTypes.FETCH_BULLETINS
        | NewsActionTypes.FETCH_TRANSFERS
        | NewsActionTypes.FETCH_VIDEOS
        | NewsActionTypes.RESET;
    }
  | {
      type: NewsActionTypes.REFRESH;
      payload: {
        news: Blog[];
        videos: ExternalVideo[];
        transfers: Transfer[];
      };
    }
  | {
      type: NewsActionTypes.FETCH_NEWS_SUCCESS;
      payload: Blog[];
    }
  | {
      type: NewsActionTypes.FETCH_BULLETINS_SUCCESS;
      payload: Bulletin[];
    }
  | {
      type: NewsActionTypes.FETCH_MIXED_SUCCESS;
      payload: {
        news: Blog[];
        transfers: Transfer[];
        videos: ExternalVideo[];
      };
    }
  | {
      type: NewsActionTypes.FETCH_TRANSFERS_SUCCESS;
      payload: Transfer[];
    }
  | {
      type: NewsActionTypes.FETCH_VIDEOS_SUCCESS;
      payload: ExternalVideo[];
    }
  | {
      type: NewsActionTypes.CREATE_VIDEOS_SUCCESS;
      payload: ExternalVideo;
    }
  | {
      type: NewsActionTypes.FETCH_ERROR;
      payload: TranslatorKeys;
    };

export enum AdminActionTypes {
  FETCH_USER = '@@admin/FETCH_USER',
  FETCH_USER_SUCCESS = '@@admin/FETCH_USER_SUCCESS',
  FETCH_MATCH = '@@admin/FETCH_MATCH',
  FETCH_MATCH_SUCCESS = '@@admin/FETCH_MATCH_SUCCESS',
  PATCH_MATCH_SUCCESS = '@@admin/PATCH_MATCH_SUCCESS',
  DELETE_MATCH_SUCCESS = '@@admin/DELETE_MATCH_SUCCESS',
  FETCH_EVENT_SUCCESS = '@@admin/FETCH_EVENT_SUCCESS',
  DELETE_EVENT_SUCCESS = '@@admin/DELETE_EVENT_SUCCESS',
  FETCH_LEAGUE = '@@admin/FETCH_LEAGUE',
  FETCH_LEAGUE_SUCCESS = '@@admin/FETCH_LEAGUE_SUCCESS',
  FETCH_AD = '@@admin/FETCH_AD',
  FETCH_AD_SUCCESS = '@@admin/FETCH_AD_SUCCESS',
  FETCH_VIDEO = '@@admin/FETCH_VIDEO',
  FETCH_VIDEO_SUCCESS = '@@admin/FETCH_VIDEO_SUCCESS',
  FETCH_NEWS = '@@admin/FETCH_NEWS',
  FETCH_NEWS_SUCCESS = '@@admin/FETCH_NEWS_SUCCESS',
  FETCH_TEAM = '@@admin/FETCH_TEAM',
  FETCH_TEAM_SUCCESS = '@@admin/FETCH_TEAM_SUCCESS',
  SEARCH = '@@admin/SEARCH',
  FETCH_OUT = '@@admin/FETCH_OUT',
  FETCH_OUT_SUCCESS = '@@admin/FETCH_OUT_SUCCESS',
  SEARCH_SUCCESS = '@@admin/SEARCH_SUCCESS',
  FETCH_ERROR = '@@admin/FETCH_ERROR',
  CREATE_TASK = '@@admin/CREATE_TASK',
  FETCH_BADGES = '@@admin/FETCH_BADGES',
  FETCH_BADGES_SUCCESS = '@@admin/FETCH_BADGES_SUCCESS',
  PATCH_BADGE_SUCCESS = '@@admin/PATCH_BADGE_SUCCESS',
  CREATE_TASK_SUCCESS = '@@admin/CREATE_TASK_SUCCESS',
  BULK_DELETE_SUCCESS = '@@admin/BULK_DELETE_SUCCESS',
  BULK_DELETE = '@@admin/BULK_DELETE',
  RESET_MATCHES = '@@admin/RESET_MATCHES',
}

export const SEARCH_USERS = 1;
export const SEARCH_TEAMS = 2;
export const SEARCH_LEAGUES = 3;
export const SEARCH_NEWS = 4;
export const SEARCH_VIDEOS = 5;
export const SEARCH_ADS = 6;
export const SEARCH_MATCH = 7;
export const SEARCH_LOCATION = 8;
export const CACHE_TASK = 0;
export const STATISTICS_TASK = 1;
export const SQUAD_TASK = 2;

export declare type SEARCH_TYPES =
  | typeof SEARCH_LEAGUES
  | typeof SEARCH_ADS
  | typeof SEARCH_NEWS
  | typeof SEARCH_MATCH
  | typeof SEARCH_TEAMS
  | typeof SEARCH_USERS
  | typeof SEARCH_LOCATION
  | typeof SEARCH_VIDEOS;

export declare type TASK_TYPES =
  | typeof CACHE_TASK
  | typeof SQUAD_TASK
  | typeof STATISTICS_TASK;
export type AdminActions =
  | {
      type:
        | AdminActionTypes.FETCH_NEWS
        | AdminActionTypes.FETCH_AD
        | AdminActionTypes.FETCH_MATCH
        | AdminActionTypes.FETCH_VIDEO
        | AdminActionTypes.FETCH_LEAGUE
        | AdminActionTypes.RESET_MATCHES
        | AdminActionTypes.FETCH_TEAM
        | AdminActionTypes.FETCH_USER
        | AdminActionTypes.FETCH_BADGES
        | AdminActionTypes.FETCH_OUT
        | AdminActionTypes.BULK_DELETE
        | AdminActionTypes.CREATE_TASK
        | AdminActionTypes.SEARCH;
    }
  | {
      type: AdminActionTypes.FETCH_NEWS_SUCCESS;
      payload: Blog;
    }
  | {
      type: AdminActionTypes.BULK_DELETE_SUCCESS;
      payload: IDType[];
    }
  | {
      type: AdminActionTypes.FETCH_OUT_SUCCESS;
      payload: OutSummary[];
    }
  | {
      type: AdminActionTypes.DELETE_MATCH_SUCCESS;
      payload: IDType;
    }
  | {
      type: AdminActionTypes.DELETE_EVENT_SUCCESS;
      payload: number;
    }
  | {
      type: AdminActionTypes.FETCH_EVENT_SUCCESS;
      payload: ValueStore<GoalEvent>;
    }
  | {
      type: AdminActionTypes.CREATE_TASK_SUCCESS;
      payload: any;
    }
  | {
      type: AdminActionTypes.FETCH_TEAM_SUCCESS;
      payload: Team;
    }
  | {
      type:
        | AdminActionTypes.FETCH_MATCH_SUCCESS
        | AdminActionTypes.PATCH_MATCH_SUCCESS;
      payload: Match | Match[];
    }
  | {
      type: AdminActionTypes.FETCH_BADGES_SUCCESS;
      payload: Badge[];
    }
  | {
      type: AdminActionTypes.PATCH_BADGE_SUCCESS;
      payload: Badge;
    }
  | {
      type: AdminActionTypes.FETCH_USER_SUCCESS;
      payload: User;
    }
  | {
      type: AdminActionTypes.FETCH_VIDEO_SUCCESS;
      payload: ExternalVideo;
    }
  | {
      type: AdminActionTypes.FETCH_AD_SUCCESS;
      payload: Ad;
    }
  | {
      type: AdminActionTypes.FETCH_LEAGUE_SUCCESS;
      payload: League;
    }
  | {
      type: AdminActionTypes.SEARCH_SUCCESS;
      payload:
        | { id: typeof SEARCH_LEAGUES; response: League[] }
        | { id: typeof SEARCH_VIDEOS; response: ExternalVideo[] }
        | { id: typeof SEARCH_NEWS; response: Blog[] }
        | { id: typeof SEARCH_TEAMS; response: TeamListElement[] }
        | { id: typeof SEARCH_USERS; response: User[] }
        | { id: typeof SEARCH_ADS; response: Ad[] }
        | { id: typeof SEARCH_LOCATION; response: Location[] }
        | { id: typeof SEARCH_MATCH; response: MatchListElement[] };
    }
  | {
      type: AdminActionTypes.FETCH_ERROR;
      payload: TranslatorKeys;
    };

export declare type AllActionTypes =
  | AoiActionTypes
  | UserActionTypes
  | StandingActionTypes
  | TeamActionTypes
  | MatchActionTypes
  | NewsActionTypes
  | LeagueActionTypes
  | LanguageActionTypes
  | RouteActionTypes
  | AdActionTypes
  | AdminActionTypes
  | SearchActionTypes;

export declare type AllActions =
  | UserActions
  | TeamActions
  | StandingActions
  | MatchActions
  | LeagueActions
  | LanguageActions
  | AoiActions
  | RouteActions
  | NewsActions
  | AdActions
  | AdminActions
  | SearchActions;

export declare type PayloadAction<T extends AllActions> = T extends {
  type: T['type'];
  payload: any;
}
  ? T
  : never;

export declare type InitAction<T extends AllActions> = T extends {
  type: T['type'];
}
  ? T
  : never;

export type WithoutResponse<T extends ValueStore<any> | any> =
  T extends ValueStore<any>
    ? {
        id: IDType;
        date?: number;
      }
    : false;
