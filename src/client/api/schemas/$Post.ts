/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Post = {
    properties: {
        content: {
    type: 'string',
    isRequired: true,
},
        id: {
    type: 'number',
    isRequired: true,
},
        media: {
    type: 'File',
},
        match: {
    type: 'MatchListElement',
    isRequired: true,
},
        likes: {
    type: 'array',
    contains: {
        type: 'UserEssential',
    },
    isRequired: true,
},
        author: {
    type: 'UserEssential',
    isRequired: true,
},
        created: {
    type: 'string',
    isRequired: true,
    format: 'date-time',
},
        deleted: {
    type: 'boolean',
    isRequired: true,
},
        amountComments: {
    type: 'number',
    isRequired: true,
},
    },
} as const;
