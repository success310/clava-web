/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { BaseBulkSearchResult } from './BaseBulkSearchResult';

export type BulkSearchResult = {
    query: string;
    result?: BaseBulkSearchResult;
};
