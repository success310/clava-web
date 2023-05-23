/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $CardEventCreate = {
    properties: {
        minute: {
    type: 'number',
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
},
    },
} as const;
