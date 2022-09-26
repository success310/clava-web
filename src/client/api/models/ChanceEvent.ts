/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ChanceType } from './ChanceType';
import type { PlayerListElement } from './PlayerListElement';

export type ChanceEvent = {
    minute: number;
    id: number;
    teamId: number;
    chanceType: ChanceType;
    type: ChanceEvent.type;
    player?: PlayerListElement;
};

export namespace ChanceEvent {

    export enum type {
        CHANCE = 'CHANCE',
    }


}
