/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { File } from './File';
import type { JerseyModeEnum } from './JerseyModeEnum';
import type { LeagueListElement } from './LeagueListElement';
import type { Translation } from './Translation';

export type TeamListElement = {
    id: number;
    name: Translation;
    thumb: File;
    leagues: Array<LeagueListElement>;
    jerseyColor1: string;
    jerseyColor2: string;
    jerseyMode: JerseyModeEnum;
};
