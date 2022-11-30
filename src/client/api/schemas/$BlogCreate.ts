/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $BlogCreate = {
    properties: {
        link: {
    type: 'string',
},
        title: {
    type: 'TranslationCreate',
    isRequired: true,
},
        summary: {
    type: 'TranslationCreate',
},
        body: {
    type: 'TranslationCreate',
    isRequired: true,
},
        pictureId: {
    type: 'number',
    isRequired: true,
},
        date: {
    type: 'string',
    format: 'date',
},
        uid: {
    type: 'string',
    isRequired: true,
},
    },
} as const;
