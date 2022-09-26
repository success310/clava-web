/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $TeamListElement = {
    properties: {
        id: {
    type: 'number',
    isRequired: true,
},
        name: {
    type: 'Translation',
    isRequired: true,
},
        thumb: {
    type: 'File',
    isRequired: true,
},
        leagues: {
    type: 'array',
    contains: {
        type: 'LeagueListElement',
    },
    isRequired: true,
},
    },
} as const;
