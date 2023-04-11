/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CardType } from './CardType';
import type { PlayerListElement } from './PlayerListElement';

export type CardEvent = {
    minute?: number;
    id: number;
    teamId: number;
    cardType: CardType;
    type: 'CARD';
    player?: PlayerListElement;
};
