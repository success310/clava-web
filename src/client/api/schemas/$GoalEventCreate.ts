/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $GoalEventCreate = {
    properties: {
        minute: {
    type: 'number',
},
        teamId: {
    type: 'number',
    isRequired: true,
},
        assistId: {
    type: 'number',
},
        goalTypeId: {
    type: 'number',
},
        goal1: {
    type: 'number',
    isRequired: true,
},
        goal2: {
    type: 'number',
    isRequired: true,
},
        playerId: {
    type: 'number',
},
    },
} as const;
