/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $ChanceEvent = {
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
        chanceType: {
    type: 'ChanceType',
    isRequired: true,
},
        type: {
    type: 'Enum',
    isRequired: true,
},
        player: {
    type: 'PlayerListElement',
},
    },
} as const;