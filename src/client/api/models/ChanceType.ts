/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ChanceTypeEnum } from './ChanceTypeEnum';
import type { Translation } from './Translation';

export type ChanceType = {
    id: number;
    translation: Translation;
    key: ChanceTypeEnum;
};
