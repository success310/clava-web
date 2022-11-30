/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { TranslationCreate } from './TranslationCreate';

export type ExternalVideoCreate = {
    date: string;
    length: string;
    url: string;
    name: TranslationCreate;
    wvvId: string;
    summary: TranslationCreate;
    thumbnailId: number;
    areasOfInterestIds: Array<number>;
};
