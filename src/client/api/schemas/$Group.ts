/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Group = {
    properties: {
        id: {
    type: 'number',
    isRequired: true,
},
        name: {
    type: 'Translation',
    isRequired: true,
},
        key: {
    type: 'GroupEnum',
    isRequired: true,
},
        team: {
    type: 'TeamListElement',
    isRequired: true,
},
        request: {
    type: 'boolean',
    isRequired: true,
},
        message: {
    type: 'string',
    isRequired: true,
},
        user: {
    type: 'UserEssential',
    isRequired: true,
},
    },
} as const;
