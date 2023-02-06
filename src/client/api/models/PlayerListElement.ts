/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { File } from './File';
import type { FootEnum } from './FootEnum';
import type { PlayerPosition } from './PlayerPosition';

export type PlayerListElement = {
    givenName: string;
    familyName: string;
    birthdate?: string;
    id: number;
    thumb?: File;
    jersey: number;
    foot?: FootEnum;
    height?: number;
    playerPosition: PlayerPosition;
};
