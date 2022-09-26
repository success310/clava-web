/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { PlayerPositionEnum } from './PlayerPositionEnum';

export type PlayerCreate = {
    givenName: string;
    familyName: string;
    birthdate?: string;
    thumbId?: number;
    jersey: number;
    playerPositionKey: PlayerPositionEnum;
    team_ids: Array<number>;
};
