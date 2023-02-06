/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { JerseyModeEnum } from './JerseyModeEnum';

export type TeamPatch = {
    photoId?: number;
    titles?: Array<string>;
    foundingYear?: string;
    president?: string;
    phone?: string;
    mail?: string;
    locations?: Array<number>;
    jerseyColor1?: string;
    jerseyColor2?: string;
    jerseyMode?: JerseyModeEnum;
    thumbId?: number;
};
