/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $GoalType = {
    properties: {
        id: {
    type: 'number',
    isRequired: true,
},
        translation: {
    type: 'Translation',
    isRequired: true,
},
        key: {
    type: 'GoalTypeEnum',
    isRequired: true,
},
    },
} as const;
