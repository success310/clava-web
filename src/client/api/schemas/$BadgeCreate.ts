/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $BadgeCreate = {
    properties: {
        badgeType: {
    type: 'BadgeTypeEnum',
    isRequired: true,
},
        name: {
    type: 'TranslationCreate',
    isRequired: true,
},
        description: {
    type: 'TranslationCreate',
    isRequired: true,
},
        mediaId: {
    type: 'number',
    isRequired: true,
},
        teamId: {
    type: 'number',
},
    },
} as const;
