/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $EventType = {
    type: 'one-of',
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
