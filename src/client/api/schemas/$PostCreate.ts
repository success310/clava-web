/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $PostCreate = {
    properties: {
        content: {
    type: 'string',
    isRequired: true,
},
        mediaId: {
    type: 'number',
},
        matchId: {
    type: 'number',
    isRequired: true,
},
    },
} as const;
