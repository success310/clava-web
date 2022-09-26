/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $TeamPatch = {
    properties: {
        photoId: {
    type: 'number',
},
        titles: {
    type: 'array',
    contains: {
    type: 'string',
},
},
        foundingYear: {
    type: 'string',
},
        president: {
    type: 'string',
},
        phone: {
    type: 'string',
},
        mail: {
    type: 'string',
},
        locations: {
    type: 'array',
    contains: {
    type: 'number',
},
},
    },
} as const;
