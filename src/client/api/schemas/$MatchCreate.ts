/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $MatchCreate = {
    properties: {
        originalStartTime: {
    type: 'string',
    isRequired: true,
    format: 'date-time',
},
        locationId: {
    type: 'number',
},
        refereeId: {
    type: 'number',
},
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
    },
} as const;
