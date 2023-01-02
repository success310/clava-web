/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { LeagueCategoryEnum } from './LeagueCategoryEnum';
import type { LeagueRatingEnum } from './LeagueRatingEnum';
import type { TranslationCreate } from './TranslationCreate';

export type LeagueCreate = {
    tableRating: LeagueRatingEnum;
    matchDays: number;
    main?: boolean;
    category: LeagueCategoryEnum;
    name: TranslationCreate;
    areaOfInterestIds: Array<number>;
    year: number;
};
