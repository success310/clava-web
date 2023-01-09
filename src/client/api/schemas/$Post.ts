/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Post = {
    properties: {
        text: {
    type: 'string',
    isRequired: true,
},
        id: {
    type: 'number',
    isRequired: true,
},
        media: {
    type: 'File',
    isRequired: true,
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
        comments: {
    type: 'array',
    contains: {
        type: 'Comment',
    },
    isRequired: true,
},
    },
} as const;
