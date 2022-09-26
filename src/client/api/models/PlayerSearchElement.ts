/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { PlayerPosition } from './PlayerPosition';
import type { TeamListElement } from './TeamListElement';

export type PlayerSearchElement = {
    givenName: string;
    familyName: string;
    birthdate?: string;
    id: number;
    jersey: number;
    playerPosition: PlayerPosition;
    teams: Array<TeamListElement>;
};
