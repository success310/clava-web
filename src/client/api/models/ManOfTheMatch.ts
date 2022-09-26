/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ManOfTheMatchListElementList } from './ManOfTheMatchListElementList';
import type { PlayerListElementList } from './PlayerListElementList';

export type ManOfTheMatch = {
    user: PlayerListElementList;
    votes: ManOfTheMatchListElementList;
};
