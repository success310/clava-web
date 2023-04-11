/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $BulkSearchResult = {
    properties: {
        query: {
    type: 'string',
    isRequired: true,
},
        result: {
    type: 'BaseBulkSearchResult',
},
    },
} as const;
