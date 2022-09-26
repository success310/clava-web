/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { File } from './File';
import type { Translation } from './Translation';

export type Blog = {
    link?: string;
    title: Translation;
    body: Translation;
    picture: File;
    summary?: Translation;
    id: number;
    date: string;
};
