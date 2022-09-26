/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CardType } from './CardType';
import type { PlayerListElement } from './PlayerListElement';

export type CardEvent = {
    minute: number;
    id: number;
    teamId: number;
    cardType: CardType;
    type: CardEvent.type;
    player: PlayerListElement;
};

export namespace CardEvent {

    export enum type {
        CARD = 'CARD',
    }


}
