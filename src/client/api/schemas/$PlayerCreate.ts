/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $PlayerCreate = {
    properties: {
        givenName: {
    type: 'string',
    isRequired: true,
},
        familyName: {
    type: 'string',
    isRequired: true,
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
    isRequired: true,
},
        foot: {
    type: 'FootEnum',
},
        height: {
    type: 'number',
},
        playerPositionKey: {
    type: 'PlayerPositionEnum',
    isRequired: true,
},
        team_ids: {
    type: 'array',
    contains: {
    type: 'number',
},
    isRequired: true,
},
    },
} as const;
