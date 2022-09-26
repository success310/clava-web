/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { PlayerPosition } from './PlayerPosition';

export type PlayerListElement = {
    givenName: string;
    familyName: string;
    birthdate?: string;
    id: number;
    jersey: number;
    playerPosition: PlayerPosition;
};
