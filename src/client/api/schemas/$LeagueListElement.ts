/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $LeagueListElement = {
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
        name: {
    type: 'Translation',
    isRequired: true,
},
        year: {
    type: 'number',
    isRequired: true,
},
        officialName: {
    type: 'string',
    isRequired: true,
},
    },
} as const;
