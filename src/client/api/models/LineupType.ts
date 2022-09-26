/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { LineupPosition } from './LineupPosition';
import type { Translation } from './Translation';

export type LineupType = {
    id: number;
    name: Translation;
    positions: Array<LineupPosition>;
};
