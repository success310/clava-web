/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { LineupPositionPlayer } from './LineupPositionPlayer';
import type { LineupType } from './LineupType';

export type Lineup = {
    id: number;
    players: Array<LineupPositionPlayer>;
    type: LineupType;
};
