/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $User = {
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
        thumb: {
    type: 'File',
},
        language: {
    type: 'Language',
    isRequired: true,
},
        groups: {
    type: 'array',
    contains: {
        type: 'Group',
    },
    isRequired: true,
},
        scopes: {
    type: 'array',
    contains: {
        type: 'Scope',
    },
    isRequired: true,
},
        areaOfInterest: {
    type: 'AreaOfInterest',
    isRequired: true,
},
    },
} as const;