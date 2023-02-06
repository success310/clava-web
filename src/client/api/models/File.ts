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
    height: number;
    width: number;
    rotation: number;
    id: number;
    formats: Array<Format>;
    internalPath: string;
};
