/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { LanguageLocaleEnum } from './LanguageLocaleEnum';
import type { Translation } from './Translation';

export type Language = {
    locale: LanguageLocaleEnum;
    id: number;
    name: Translation;
};
