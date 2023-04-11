/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $ChanceEvent = {
    properties: {
        minute: {
    type: 'number',
},
        id: {
    type: 'number',
    isRequired: true,
},
        teamId: {
    type: 'number',
    isRequired: true,
},
        chanceType: {
    type: 'ChanceType',
    isRequired: true,
},
        type: {
    type: 'string',
    isRequired: true,
},
        player: {
    type: 'PlayerListElement',
},
    },
} as const;
