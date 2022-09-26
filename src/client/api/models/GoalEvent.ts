/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { GoalType } from './GoalType';
import type { PlayerListElement } from './PlayerListElement';

export type GoalEvent = {
    minute: number;
    id: number;
    teamId: number;
    assist?: PlayerListElement;
    goalType?: GoalType;
    type: GoalEvent.type;
    player?: PlayerListElement;
};

export namespace GoalEvent {

    export enum type {
        GOAL = 'GOAL',
    }


}
