/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $PersonCreate = {
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
    },
} as const;
