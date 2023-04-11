/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AreaOfInterest } from './AreaOfInterest';
import type { File } from './File';
import type { Group } from './Group';
import type { Language } from './Language';
import type { LeagueListMinimum } from './LeagueListMinimum';
import type { MatchListMinimum } from './MatchListMinimum';
import type { PlayerListElement } from './PlayerListElement';
import type { Scope } from './Scope';
import type { TeamListMinimum } from './TeamListMinimum';
import type { UserBadge } from './UserBadge';

export type User = {
    id: number;
    username: string;
    givenName?: string;
    familyName?: string;
    email?: string;
    tel?: string;
    premium: boolean;
    emailConfirmed: boolean;
    telConfirmed: boolean;
    anonymous: boolean;
    thumb?: File;
    badges: Array<UserBadge>;
    playerId?: number;
    language: Language;
    groups: Array<Group>;
    scopes: Array<Scope>;
    areaOfInterest: AreaOfInterest;
    favoriteMatches: Array<MatchListMinimum>;
    favoriteTeams: Array<TeamListMinimum>;
    favoriteLeagues: Array<LeagueListMinimum>;
    player?: PlayerListElement;
    agbLevel?: string;
    newsletter: boolean;
    blocked: boolean;
};
