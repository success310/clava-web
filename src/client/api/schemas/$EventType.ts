/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $EventType = {
    type: 'any-of',
    contains: [{
    type: 'CardEvent',
}, {
    type: 'ChanceEvent',
}, {
    type: 'ChangeEvent',
}, {
    type: 'GoalEvent',
}],
} as const;
