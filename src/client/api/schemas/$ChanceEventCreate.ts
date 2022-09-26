/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $ChanceEventCreate = {
    properties: {
        minute: {
    type: 'number',
    isRequired: true,
},
        teamId: {
    type: 'number',
    isRequired: true,
},
        chanceTypeId: {
    type: 'number',
    isRequired: true,
},
        playerId: {
    type: 'number',
},
    },
} as const;
