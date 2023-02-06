/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { FootEnum } from './FootEnum';
import type { PlayerPositionEnum } from './PlayerPositionEnum';

export type PlayerPatch = {
    givenName?: string;
    familyName?: string;
    birthdate?: string;
    thumbId?: number;
    jersey?: number;
    playerPositionKey?: PlayerPositionEnum;
    foot?: FootEnum;
    height?: number;
};
