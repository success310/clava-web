/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Person = {
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
        id: {
    type: 'number',
    isRequired: true,
},
        thumb: {
    type: 'File',
},
    },
} as const;
