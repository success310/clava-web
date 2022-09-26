/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $UserCreate = {
    properties: {
        languageId: {
    type: 'number',
    isRequired: true,
},
        deviceId: {
    type: 'string',
    isRequired: true,
},
        areaOfInterestId: {
    type: 'number',
    isRequired: true,
},
        firebaseToken: {
    type: 'string',
},
        deviceInfo: {
    type: 'string',
    isRequired: true,
},
    },
} as const;
