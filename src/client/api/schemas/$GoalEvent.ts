/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $GoalEvent = {
    properties: {
        minute: {
    type: 'number',
    isRequired: true,
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
    type: 'Enum',
    isRequired: true,
},
        player: {
    type: 'PlayerListElement',
},
    },
} as const;
