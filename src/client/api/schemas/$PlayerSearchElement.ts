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
        thumb: {
    type: 'File',
},
        jersey: {
    type: 'number',
    isRequired: true,
},
        foot: {
    type: 'FootEnum',
},
        height: {
    type: 'number',
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
