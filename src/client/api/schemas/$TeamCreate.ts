/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $TeamCreate = {
    properties: {
        name: {
    type: 'TranslationCreate',
    isRequired: true,
},
        thumbId: {
    type: 'number',
    isRequired: true,
},
        photoId: {
    type: 'number',
},
        leader: {
    type: 'PersonCreate',
    isRequired: true,
},
        officialName: {
    type: 'string',
    isRequired: true,
},
    },
} as const;
