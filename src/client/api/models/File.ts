/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Format } from './Format';

export type File = {
    url: string;
    mime: string;
    size: number;
    ext: string;
    hash: string;
    caption: string;
    id: number;
    formats: Array<Format>;
};
