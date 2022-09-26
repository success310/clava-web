/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { League } from './League';
import type { MatchListElement } from './MatchListElement';

export type LeagueMatch = {
    league: League;
    matches: Array<MatchListElement>;
};
