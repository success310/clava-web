/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $CardEventCreate = {
    properties: {
        minute: {
    type: 'number',
    isRequired: true,
},
        teamId: {
    type: 'number',
    isRequired: true,
},
        cardTypeId: {
    type: 'number',
    isRequired: true,
},
        playerId: {
    type: 'number',
    isRequired: true,
},
    },
} as const;
