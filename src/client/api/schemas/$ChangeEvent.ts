/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $ChangeEvent = {
    properties: {
        minute: {
    type: 'number',
    isRequired: true,
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
    type: 'Enum',
    isRequired: true,
},
        player: {
    type: 'PlayerListElement',
    isRequired: true,
},
    },
} as const;
