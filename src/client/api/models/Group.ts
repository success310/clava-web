/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { GroupEnum } from './GroupEnum';
import type { TeamListElement } from './TeamListElement';
import type { Translation } from './Translation';
import type { UserEssential } from './UserEssential';

export type Group = {
    id: number;
    name: Translation;
    key: GroupEnum;
    team: TeamListElement;
    request: boolean;
    message: string;
    user: UserEssential;
};
