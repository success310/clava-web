/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { File } from './File';

export type Person = {
    givenName: string;
    familyName: string;
    birthdate?: string;
    id: number;
    thumb?: File;
};
