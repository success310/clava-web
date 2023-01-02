/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AreaOfInterest } from './AreaOfInterest';
import type { File } from './File';
import type { Group } from './Group';
import type { Language } from './Language';
import type { LeagueListElement } from './LeagueListElement';
import type { MatchListElement } from './MatchListElement';
import type { Scope } from './Scope';
import type { TeamListElement } from './TeamListElement';

export type User = {
    id: number;
    username: string;
    givenName?: string;
    familyName?: string;
    email?: string;
    tel?: string;
    premium: boolean;
    emailConfirmed: boolean;
    anonymous: boolean;
    thumb?: File;
    language: Language;
    groups: Array<Group>;
    scopes: Array<Scope>;
    areaOfInterest: AreaOfInterest;
    favoriteMatches: Array<MatchListElement>;
    favoriteTeams: Array<TeamListElement>;
    favoriteLeagues: Array<LeagueListElement>;
};
