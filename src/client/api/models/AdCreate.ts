/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AdPositionEnum } from './AdPositionEnum';

export type AdCreate = {
    name: string;
    position: AdPositionEnum;
    start: string;
    stop: string;
    paused?: boolean;
    url: string;
    color?: string;
    priority: number;
    fileMobileId: number;
    fileDesktopId: number;
};
