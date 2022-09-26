/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Player = {
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
        thumb: {
    type: 'File',
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
