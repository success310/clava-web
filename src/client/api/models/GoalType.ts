/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { GoalTypeEnum } from './GoalTypeEnum';
import type { Translation } from './Translation';

export type GoalType = {
    id: number;
    translation: Translation;
    key: GoalTypeEnum;
};
