/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Statistic = {
    properties: {
        premium: {
    type: 'boolean',
    isRequired: true,
},
        key: {
    type: 'StatisticKeyEnum',
    isRequired: true,
},
        name: {
    type: 'Translation',
    isRequired: true,
},
        description: {
    type: 'Translation',
},
    },
} as const;
