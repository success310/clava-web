/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { FootEnum } from './FootEnum';
import type { PlayerPositionEnum } from './PlayerPositionEnum';

export type PlayerCreate = {
    givenName: string;
    familyName: string;
    birthdate?: string;
    thumbId?: number;
    jersey: number;
    foot?: FootEnum;
    height?: number;
    playerPositionKey: PlayerPositionEnum;
    team_ids: Array<number>;
};
