/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $ChangeEventCreate = {
    properties: {
        minute: {
    type: 'number',
},
        teamId: {
    type: 'number',
    isRequired: true,
},
        playerInId: {
    type: 'number',
    isRequired: true,
},
        injured: {
    type: 'boolean',
    isRequired: true,
},
        playerId: {
    type: 'number',
    isRequired: true,
},
    },
} as const;
