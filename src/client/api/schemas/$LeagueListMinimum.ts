/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $LeagueListMinimum = {
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
        id: {
    type: 'number',
    isRequired: true,
},
    },
} as const;
