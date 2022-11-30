/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { TranslationCreate } from './TranslationCreate';

export type PunishmentCreate = {
    deduction: number;
    teamId: number;
    matchId?: number;
    leagueId: number;
    cause: TranslationCreate;
};
