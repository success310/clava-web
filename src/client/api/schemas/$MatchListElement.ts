/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $MatchListElement = {
    properties: {
        originalStartTime: {
    type: 'string',
    isRequired: true,
    format: 'date-time',
},
        id: {
    type: 'number',
    isRequired: true,
},
        team1: {
    type: 'TeamListElement',
    isRequired: true,
},
        team2: {
    type: 'TeamListElement',
    isRequired: true,
},
        goal1: {
    type: 'number',
    isRequired: true,
},
        goal2: {
    type: 'number',
    isRequired: true,
},
        alternativeStartTime: {
    type: 'string',
    format: 'date-time',
},
        matchDay: {
    type: 'number',
    isRequired: true,
},
        leagueId: {
    type: 'number',
    isRequired: true,
},
        league: {
    type: 'LeagueListElement',
    isRequired: true,
},
        cancelled: {
    type: 'boolean',
    isRequired: true,
},
    },
} as const;
