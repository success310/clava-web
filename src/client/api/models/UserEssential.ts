/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { File } from './File';
import type { UserBadge } from './UserBadge';

export type UserEssential = {
    id: number;
    username: string;
    givenName?: string;
    familyName?: string;
    email?: string;
    tel?: string;
    premium: boolean;
    emailConfirmed: boolean;
    telConfirmed: boolean;
    anonymous: boolean;
    thumb?: File;
    badges: Array<UserBadge>;
    playerId?: number;
};
