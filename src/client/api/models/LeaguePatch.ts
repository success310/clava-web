/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { LeagueCategoryEnum } from './LeagueCategoryEnum';
import type { LeagueRatingEnum } from './LeagueRatingEnum';
import type { TranslationCreate } from './TranslationCreate';

export type LeaguePatch = {
    matchDays?: number;
    name?: TranslationCreate;
    areaOfInterestIds?: Array<number>;
    year?: number;
    category?: LeagueCategoryEnum;
    main?: boolean;
    tableRating?: LeagueRatingEnum;
};
