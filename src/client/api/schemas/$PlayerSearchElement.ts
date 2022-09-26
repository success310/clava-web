/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $PlayerSearchElement = {
    properties: {
        givenName: {
    type: 'string',
    isRequired: true,
},
        familyName: {
    type: 'string',
    isRequired: true,
},
        birthdate: {
    type: 'string',
    format: 'date',
},
        id: {
    type: 'number',
    isRequired: true,
},
        jersey: {
    type: 'number',
    isRequired: true,
},
        playerPosition: {
    type: 'PlayerPosition',
    isRequired: true,
},
        teams: {
    type: 'array',
    contains: {
        type: 'TeamListElement',
    },
    isRequired: true,
},
    },
} as const;
