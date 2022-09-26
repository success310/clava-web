/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Transfer = {
    properties: {
        player: {
    type: 'PlayerListElement',
    isRequired: true,
},
        teamFrom: {
    type: 'TeamListElement',
    isRequired: true,
},
        teamTo: {
    type: 'TeamListElement',
    isRequired: true,
},
        date: {
    type: 'string',
    isRequired: true,
    format: 'date-time',
},
    },
} as const;
