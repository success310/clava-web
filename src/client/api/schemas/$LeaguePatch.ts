/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $LeaguePatch = {
    properties: {
        matchDays: {
    type: 'number',
},
        name: {
    type: 'TranslationCreate',
},
        areaOfInterestIds: {
    type: 'array',
    contains: {
    type: 'number',
},
},
        year: {
    type: 'number',
},
        category: {
    type: 'LeagueCategoryEnum',
},
        main: {
    type: 'boolean',
},
        tableRating: {
    type: 'LeagueRatingEnum',
},
    },
} as const;
