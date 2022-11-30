/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $AdCreate = {
    properties: {
        name: {
    type: 'string',
    isRequired: true,
},
        position: {
    type: 'AdPositionEnum',
    isRequired: true,
},
        start: {
    type: 'string',
    isRequired: true,
    format: 'date-time',
},
        stop: {
    type: 'string',
    isRequired: true,
    format: 'date-time',
},
        paused: {
    type: 'boolean',
},
        url: {
    type: 'string',
    isRequired: true,
},
        color: {
    type: 'string',
},
        priority: {
    type: 'number',
    isRequired: true,
},
        fileMobileId: {
    type: 'number',
    isRequired: true,
},
        fileDesktopId: {
    type: 'number',
    isRequired: true,
},
    },
} as const;
