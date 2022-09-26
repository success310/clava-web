/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $UserEssential = {
    properties: {
        id: {
    type: 'number',
    isRequired: true,
},
        username: {
    type: 'string',
    isRequired: true,
},
        givenName: {
    type: 'string',
},
        familyName: {
    type: 'string',
},
        email: {
    type: 'string',
},
        tel: {
    type: 'string',
},
        premium: {
    type: 'boolean',
    isRequired: true,
},
        emailConfirmed: {
    type: 'boolean',
    isRequired: true,
},
        anonymous: {
    type: 'boolean',
    isRequired: true,
},
    },
} as const;
