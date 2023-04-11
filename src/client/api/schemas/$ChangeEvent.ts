/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $ChangeEvent = {
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
        playerIn: {
    type: 'PlayerListElement',
    isRequired: true,
},
        injured: {
    type: 'boolean',
    isRequired: true,
},
        type: {
    type: 'string',
    isRequired: true,
},
        player: {
    type: 'PlayerListElement',
    isRequired: true,
},
    },
} as const;
