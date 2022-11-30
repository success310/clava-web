/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $PunishmentCreate = {
    properties: {
        deduction: {
    type: 'number',
    isRequired: true,
},
        teamId: {
    type: 'number',
    isRequired: true,
},
        matchId: {
    type: 'number',
},
        leagueId: {
    type: 'number',
    isRequired: true,
},
        cause: {
    type: 'TranslationCreate',
    isRequired: true,
},
    },
} as const;
