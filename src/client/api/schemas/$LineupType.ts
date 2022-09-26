/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $LineupType = {
    properties: {
        id: {
    type: 'number',
    isRequired: true,
},
        name: {
    type: 'Translation',
    isRequired: true,
},
        positions: {
    type: 'array',
    contains: {
        type: 'LineupPosition',
    },
    isRequired: true,
},
    },
} as const;
