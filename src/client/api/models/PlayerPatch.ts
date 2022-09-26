/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { PlayerPositionEnum } from './PlayerPositionEnum';

export type PlayerPatch = {
    givenName?: string;
    familyName?: string;
    birthdate?: string;
    thumbId?: number;
    jersey?: number;
    playerPositionKey?: PlayerPositionEnum;
};
