/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Blog = {
    properties: {
        link: {
    type: 'string',
},
        title: {
    type: 'Translation',
    isRequired: true,
},
        body: {
    type: 'Translation',
    isRequired: true,
},
        picture: {
    type: 'File',
    isRequired: true,
},
        summary: {
    type: 'Translation',
},
        id: {
    type: 'number',
    isRequired: true,
},
        date: {
    type: 'string',
    isRequired: true,
    format: 'date',
},
    },
} as const;
