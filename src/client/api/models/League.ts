/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AreaOfInterest } from './AreaOfInterest';
import type { LeagueCategoryEnum } from './LeagueCategoryEnum';
import type { LeagueRatingEnum } from './LeagueRatingEnum';
import type { Punishment } from './Punishment';
import type { Translation } from './Translation';

export type League = {
    tableRating: LeagueRatingEnum;
    matchDays: number;
    main?: boolean;
    category: LeagueCategoryEnum;
    id: number;
    name: Translation;
    year: number;
    officialName: string;
    currentMatchDay: number;
    areasOfInterest: Array<AreaOfInterest>;
    punishments: Array<Punishment>;
};
