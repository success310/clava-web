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
        jerseyColor1: {
    type: 'string',
    isRequired: true,
},
        jerseyColor2: {
    type: 'string',
    isRequired: true,
},
        jerseyMode: {
    type: 'JerseyModeEnum',
    isRequired: true,
},
    },
} as const;
