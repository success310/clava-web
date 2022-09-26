/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { FormatTypeEnum } from './FormatTypeEnum';

export type Format = {
    size: number;
    url: string;
    hash: string;
    type: FormatTypeEnum;
    width: number;
    height: number;
    ext: string;
};
