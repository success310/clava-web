/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $PlayerPatch = {
    properties: {
        givenName: {
    type: 'string',
},
        familyName: {
    type: 'string',
},
        birthdate: {
    type: 'string',
    format: 'date',
},
        thumbId: {
    type: 'number',
},
        jersey: {
    type: 'number',
},
        playerPositionKey: {
    type: 'PlayerPositionEnum',
},
    },
} as const;
