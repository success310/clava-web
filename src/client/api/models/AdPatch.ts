/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AdPositionEnum } from './AdPositionEnum';

export type AdPatch = {
    name?: string;
    position?: AdPositionEnum;
    start?: string;
    stop?: string;
    paused?: boolean;
    url?: string;
    color?: string;
    fileMobileId?: number;
    fileDesktopId?: number;
    priority?: number;
};
