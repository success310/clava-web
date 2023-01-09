/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $LeagueCreate = {
    properties: {
        tableRating: {
    type: 'LeagueRatingEnum',
    isRequired: true,
},
        matchDays: {
    type: 'number',
    isRequired: true,
},
        main: {
    type: 'boolean',
},
        category: {
    type: 'LeagueCategoryEnum',
    isRequired: true,
},
        name: {
    type: 'TranslationCreate',
    isRequired: true,
},
        areaOfInterestIds: {
    type: 'array',
    contains: {
    type: 'number',
},
    isRequired: true,
},
        year: {
    type: 'number',
    isRequired: true,
},
    },
} as const;
