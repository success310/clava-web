/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $AdPatch = {
    properties: {
        name: {
    type: 'string',
},
        position: {
    type: 'AdPositionEnum',
},
        start: {
    type: 'string',
    format: 'date-time',
},
        stop: {
    type: 'string',
    format: 'date-time',
},
        paused: {
    type: 'boolean',
},
        url: {
    type: 'string',
},
        color: {
    type: 'string',
},
        fileMobileId: {
    type: 'string',
},
        fileDesktopId: {
    type: 'string',
},
        priority: {
    type: 'number',
},
    },
} as const;
