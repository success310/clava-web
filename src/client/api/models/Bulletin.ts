/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Out } from './Out';
import type { Translation } from './Translation';

export type Bulletin = {
    date: string;
    url: string;
    id: number;
    timestamp: string;
    name: Translation;
    links: Array<Out>;
};
