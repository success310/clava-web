/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Match = {
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
        location: {
    type: 'Location',
},
        referee: {
    type: 'Person',
},
        lineupTeam1: {
    type: 'Lineup',
},
        lineupTeam2: {
    type: 'Lineup',
},
        events: {
    type: 'array',
    contains: {
        type: 'EventType',
    },
    isRequired: true,
},
    },
} as const;
