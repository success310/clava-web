/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { EventType } from './EventType';
import type { LeagueListElement } from './LeagueListElement';
import type { Lineup } from './Lineup';
import type { Location } from './Location';
import type { Person } from './Person';
import type { Punishment } from './Punishment';
import type { TeamListElement } from './TeamListElement';

export type Match = {
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
    location?: Location;
    referee?: Person;
    lineupTeam1?: Lineup;
    lineupTeam2?: Lineup;
    events: Array<EventType>;
    punishments: Array<Punishment>;
    report?: string;
};
