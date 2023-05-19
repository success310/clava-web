/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $MatchImport = {
    properties: {
        team1Id: {
    type: 'number',
    isRequired: true,
},
        team2Id: {
    type: 'number',
    isRequired: true,
},
        matchDay: {
    type: 'number',
    isRequired: true,
},
        leagueId: {
    type: 'number',
    isRequired: true,
},
        startTime: {
    type: 'string',
    isRequired: true,
    format: 'date-time',
},
        locationName: {
    type: 'string',
},
        goalsTeam1: {
    type: 'number',
},
        goalsTeam2: {
    type: 'number',
},
    },
} as const;
