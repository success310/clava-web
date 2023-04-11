/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $GoalEvent = {
    properties: {
        minute: {
    type: 'number',
},
        id: {
    type: 'number',
    isRequired: true,
},
        teamId: {
    type: 'number',
    isRequired: true,
},
        assist: {
    type: 'PlayerListElement',
},
        goalType: {
    type: 'GoalType',
},
        type: {
    type: 'string',
    isRequired: true,
},
        player: {
    type: 'PlayerListElement',
},
    },
} as const;
