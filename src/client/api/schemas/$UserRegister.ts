/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $UserRegister = {
    properties: {
        givenName: {
    type: 'string',
    isRequired: true,
},
        familyName: {
    type: 'string',
    isRequired: true,
},
        email: {
    type: 'string',
    isRequired: true,
},
        password: {
    type: 'string',
    isRequired: true,
},
        agbLevel: {
    type: 'string',
},
        newsletter: {
    type: 'boolean',
},
        tel: {
    type: 'string',
    isRequired: true,
},
    },
} as const;
