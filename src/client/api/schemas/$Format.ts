/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Format = {
    properties: {
        size: {
    type: 'number',
    isRequired: true,
},
        url: {
    type: 'string',
    isRequired: true,
},
        hash: {
    type: 'string',
    isRequired: true,
},
        type: {
    type: 'FormatTypeEnum',
    isRequired: true,
},
        width: {
    type: 'number',
    isRequired: true,
},
        height: {
    type: 'number',
    isRequired: true,
},
        ext: {
    type: 'string',
    isRequired: true,
},
    },
} as const;
