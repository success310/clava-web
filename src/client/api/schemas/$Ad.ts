/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Ad = {
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
        id: {
    type: 'number',
    isRequired: true,
},
        fileMobile: {
    type: 'File',
    isRequired: true,
},
        fileDesktop: {
    type: 'File',
    isRequired: true,
},
    },
} as const;
