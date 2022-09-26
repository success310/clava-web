/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { PlayerListElement } from './PlayerListElement';

export type ChangeEvent = {
    minute: number;
    id: number;
    teamId: number;
    playerIn: PlayerListElement;
    injured: boolean;
    type: ChangeEvent.type;
    player: PlayerListElement;
};

export namespace ChangeEvent {

    export enum type {
        CHANGE = 'CHANGE',
    }


}
