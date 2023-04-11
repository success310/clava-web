/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $CardEvent = {
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
        cardType: {
    type: 'CardType',
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
