/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Team = {
    properties: {
        id: {
    type: 'number',
    isRequired: true,
},
        name: {
    type: 'Translation',
    isRequired: true,
},
        thumb: {
    type: 'File',
    isRequired: true,
},
        leagues: {
    type: 'array',
    contains: {
        type: 'LeagueListElement',
    },
    isRequired: true,
},
        jerseyColor1: {
    type: 'string',
    isRequired: true,
},
        jerseyColor2: {
    type: 'string',
    isRequired: true,
},
        jerseyMode: {
    type: 'JerseyModeEnum',
    isRequired: true,
},
        leader: {
    type: 'Person',
},
        titles: {
    type: 'array',
    contains: {
        type: 'Translation',
    },
    isRequired: true,
},
        sponsors: {
    type: 'array',
    contains: {
        type: 'Sponsor',
    },
    isRequired: true,
},
        photo: {
    type: 'File',
},
        president: {
    type: 'string',
    isRequired: true,
},
        foundingYear: {
    type: 'string',
    isRequired: true,
},
        phone: {
    type: 'string',
    isRequired: true,
},
        mail: {
    type: 'string',
    isRequired: true,
},
        locations: {
    type: 'array',
    contains: {
        type: 'Location',
    },
    isRequired: true,
},
        punishments: {
    type: 'array',
    contains: {
        type: 'Punishment',
    },
    isRequired: true,
},
    },
} as const;
