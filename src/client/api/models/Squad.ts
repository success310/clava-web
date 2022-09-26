/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { PlayerListElement } from './PlayerListElement';
import type { TeamListElement } from './TeamListElement';

export type Squad = {
    matches: number;
    minutes: number;
    goals: number;
    id: number;
    player: PlayerListElement;
    team: TeamListElement;
};
