/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { TranslationCreate } from './TranslationCreate';

export type BlogCreate = {
    link?: string;
    title: TranslationCreate;
    summary?: TranslationCreate;
    body: TranslationCreate;
    pictureId: number;
    date?: string;
    uid: string;
    deleted?: boolean;
};
