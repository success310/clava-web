/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { MatchFixEnum } from './MatchFixEnum';
import type { MatchListElement } from './MatchListElement';

export type MatchImportResult = {
    match?: MatchListElement;
    fixType: MatchFixEnum;
    fixMessage: string;
    lineIndex: number;
};
