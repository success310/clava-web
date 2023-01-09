/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Comment = {
    properties: {
        text: {
    type: 'string',
    isRequired: true,
},
        id: {
    type: 'number',
    isRequired: true,
},
        comments: {
    type: 'array',
    contains: {
        type: 'Comment',
    },
    isRequired: true,
},
        likes: {
    type: 'array',
    contains: {
        type: 'UserEssential',
    },
    isRequired: true,
},
    },
} as const;
