/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AdPositionEnum } from './AdPositionEnum';
import type { File } from './File';

export type Ad = {
    name: string;
    position: AdPositionEnum;
    start: string;
    stop: string;
    paused?: boolean;
    url: string;
    color?: string;
    priority: number;
    id: number;
    fileMobile: File;
    fileDesktop: File;
};
