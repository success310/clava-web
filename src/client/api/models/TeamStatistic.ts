/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Statistic } from './Statistic';
import type { TeamListElement } from './TeamListElement';

export type TeamStatistic = {
    value: string;
    team: TeamListElement;
    statistic: Statistic;
    placement: number;
};
