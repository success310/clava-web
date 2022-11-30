/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { LeagueListElement } from './LeagueListElement';
import type { MatchListElement } from './MatchListElement';
import type { TeamListElement } from './TeamListElement';
import type { Translation } from './Translation';

export type Punishment = {
    deduction: number;
    id: number;
    team: TeamListElement;
    match?: MatchListElement;
    league: LeagueListElement;
    cause: Translation;
    hasPunishment: boolean;
};
