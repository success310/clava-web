/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { BadgeTypeEnum } from './BadgeTypeEnum';
import type { File } from './File';
import type { TeamListElement } from './TeamListElement';
import type { Translation } from './Translation';

export type Badge = {
    badgeType: BadgeTypeEnum;
    name: Translation;
    description: Translation;
    media: File;
    team?: TeamListElement;
};
