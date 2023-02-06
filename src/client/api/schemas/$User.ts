/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $User = {
    properties: {
        id: {
    type: 'number',
    isRequired: true,
},
        username: {
    type: 'string',
    isRequired: true,
},
        givenName: {
    type: 'string',
},
        familyName: {
    type: 'string',
},
        email: {
    type: 'string',
},
        tel: {
    type: 'string',
},
        premium: {
    type: 'boolean',
    isRequired: true,
},
        emailConfirmed: {
    type: 'boolean',
    isRequired: true,
},
        telConfirmed: {
    type: 'boolean',
    isRequired: true,
},
        anonymous: {
    type: 'boolean',
    isRequired: true,
},
        thumb: {
    type: 'File',
},
        badges: {
    type: 'array',
    contains: {
        type: 'UserBadge',
    },
    isRequired: true,
},
        language: {
    type: 'Language',
    isRequired: true,
},
        groups: {
    type: 'array',
    contains: {
        type: 'Group',
    },
    isRequired: true,
},
        scopes: {
    type: 'array',
    contains: {
        type: 'Scope',
    },
    isRequired: true,
},
        areaOfInterest: {
    type: 'AreaOfInterest',
    isRequired: true,
},
        favoriteMatches: {
    type: 'array',
    contains: {
        type: 'MatchListElement',
    },
    isRequired: true,
},
        favoriteTeams: {
    type: 'array',
    contains: {
        type: 'TeamListElement',
    },
    isRequired: true,
},
        favoriteLeagues: {
    type: 'array',
    contains: {
        type: 'LeagueListElement',
    },
    isRequired: true,
},
        player: {
    type: 'PlayerListElement',
},
        agbLevel: {
    type: 'string',
},
        newsletter: {
    type: 'boolean',
    isRequired: true,
},
    },
} as const;
