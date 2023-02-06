/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $League = {
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
        hasPlayerStatistics: {
    type: 'boolean',
    isRequired: true,
},
        hasTeamStatistics: {
    type: 'boolean',
    isRequired: true,
},
        hasManOfTheMatch: {
    type: 'boolean',
    isRequired: true,
},
        hasLineup: {
    type: 'boolean',
    isRequired: true,
},
        matchDurationMinutes: {
    type: 'number',
    isRequired: true,
},
        halftimeDurationMinutes: {
    type: 'number',
    isRequired: true,
},
        currentMatchDay: {
    type: 'number',
    isRequired: true,
},
        areasOfInterest: {
    type: 'array',
    contains: {
        type: 'AreaOfInterest',
    },
    isRequired: true,
},
        punishments: {
    type: 'array',
    contains: {
        type: 'Punishment',
    },
    isRequired: true,
},
    },
} as const;
