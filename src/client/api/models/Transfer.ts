/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { PlayerListElement } from './PlayerListElement';
import type { TeamListElement } from './TeamListElement';

export type Transfer = {
    player: PlayerListElement;
    teamFrom: TeamListElement;
    teamTo: TeamListElement;
    date: string;
};
