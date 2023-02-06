/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $UserBadgeCreateDelete = {
    properties: {
        teamId: {
    type: 'number',
},
        userId: {
    type: 'number',
    isRequired: true,
},
        badgeType: {
    type: 'BadgeTypeEnum',
    isRequired: true,
},
    },
} as const;
