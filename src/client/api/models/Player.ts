/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { File } from './File';
import type { PlayerPosition } from './PlayerPosition';
import type { TeamListElement } from './TeamListElement';

export type Player = {
    givenName: string;
    familyName: string;
    birthdate?: string;
    id: number;
    thumb?: File;
    jersey: number;
    playerPosition: PlayerPosition;
    teams: Array<TeamListElement>;
};
