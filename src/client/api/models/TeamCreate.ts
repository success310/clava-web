/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { PersonCreate } from './PersonCreate';
import type { TranslationCreate } from './TranslationCreate';

export type TeamCreate = {
    name: TranslationCreate;
    thumbId: number;
    photoId?: number;
    leader: PersonCreate;
    officialName: string;
};
