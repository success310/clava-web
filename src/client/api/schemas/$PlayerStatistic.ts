/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $PlayerStatistic = {
    properties: {
        value: {
    type: 'string',
    isRequired: true,
},
        player: {
    type: 'PlayerSearchElement',
    isRequired: true,
},
        statistic: {
    type: 'Statistic',
    isRequired: true,
},
    },
} as const;
