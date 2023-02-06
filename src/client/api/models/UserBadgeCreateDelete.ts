/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { BadgeTypeEnum } from './BadgeTypeEnum';

export type UserBadgeCreateDelete = {
    teamId?: number;
    userId: number;
    badgeType: BadgeTypeEnum;
};
