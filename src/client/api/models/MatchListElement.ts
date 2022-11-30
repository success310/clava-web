/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { LeagueListElement } from './LeagueListElement';
import type { TeamListElement } from './TeamListElement';

export type MatchListElement = {
    originalStartTime: string;
    id: number;
    team1: TeamListElement;
    team2: TeamListElement;
    goal1: number;
    goal2: number;
    alternativeStartTime?: string;
    matchDay: number;
    leagueId: number;
    league: LeagueListElement;
    cancelled: boolean;
};
