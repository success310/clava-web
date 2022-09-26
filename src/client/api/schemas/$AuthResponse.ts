/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $AuthResponse = {
    properties: {
        access_token: {
    type: 'string',
    isRequired: true,
},
        refresh_token: {
    type: 'string',
    isRequired: true,
},
        user: {
    type: 'User',
    isRequired: true,
},
    },
} as const;
