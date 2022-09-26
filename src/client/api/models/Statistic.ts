/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { StatisticKeyEnum } from './StatisticKeyEnum';
import type { Translation } from './Translation';

export type Statistic = {
    premium: boolean;
    key: StatisticKeyEnum;
    name: Translation;
    description?: Translation;
};
