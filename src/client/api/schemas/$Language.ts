/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Language = {
    properties: {
        locale: {
    type: 'LanguageLocaleEnum',
    isRequired: true,
},
        id: {
    type: 'number',
    isRequired: true,
},
        name: {
    type: 'Translation',
    isRequired: true,
},
    },
} as const;
