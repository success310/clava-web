import {
  CardEvent,
  LanguageLocaleEnum,
  League,
  Lineup,
  LineupPositionPlayer,
  MatchLocationEnum,
  PlayerListElement,
  PlayerSearchElement,
  Standing,
  TeamListElement,
} from '../client/api';
import { FontAwesome5Glyphs } from './fa5Glyphs';

export declare type LanguageISO = LanguageLocaleEnum;
export declare type IDType = number;

export declare type CollectionType = {
  id: IDType;
};
export declare type Credentials =
  | {
      email: string;
      password: string;
    }
  | { googleToken: string }
  | { facebookToken: string };

export declare type LineupPositionPlayersExtended = LineupPositionPlayer & {
  team: TeamListElement;
  card?: CardEvent;
  change?: boolean;
  goals?: number;
};

export declare type LineupExtended = Omit<Lineup, 'players'> & {
  players: LineupPositionPlayersExtended[];
};

export declare type QueryTarget =
  | {
      query: PlayerSearchElement;
      type: 'player';
    }
  | {
      query: League;
      type: 'league';
    }
  | {
      query: TeamListElement;
      type: 'team';
    };
export declare type SearchQuery = {
  lastPerformed: number;
  hits: number;
} & QueryTarget;
export declare type AllStanding = {
  [T in MatchLocationEnum]: Standing[];
};

export declare type Notification = {
  title: string;
  text: string;
  data?: { matchId?: IDType };
  icon?: FontAwesome5Glyphs;
  iconColor?: string;
};

export declare type ClavaRootContextType = {
  theme: 'dark' | 'light';
  fbToken: string | null;
  initialized: boolean;
};

export declare type ClavaContextType = {
  l: LanguageLocaleEnum;
  aoi: IDType;
};

export declare type PlayerInFocusMatch = {
  team1: PlayerListElement[];
  team2: PlayerListElement[];
};
