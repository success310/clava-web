/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Team } from '../models/Team';
import type { TeamListElement } from '../models/TeamListElement';
import type { TeamListElementList } from '../models/TeamListElementList';
import type { TeamPatch } from '../models/TeamPatch';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class TeamService {

    /**
     * Get Team By Id
     * @param teamId 
     * @returns Team Successful Response
     * @throws ApiError
     */
    public static getTeamByIdTeamTeamIdGet(
teamId: number,
): CancelablePromise<Team> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/team/{team_id}',
            path: {
                'team_id': teamId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Patch Team
     * @param teamId 
     * @param requestBody 
     * @returns Team Successful Response
     * @throws ApiError
     */
    public static patchTeamTeamTeamIdPatch(
teamId: number,
requestBody: TeamPatch,
): CancelablePromise<Team> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/team/{team_id}',
            path: {
                'team_id': teamId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Get Teams
     * @param leagueId 
     * @returns TeamListElementList Successful Response
     * @throws ApiError
     */
    public static getTeamsTeamGet(
leagueId: number,
): CancelablePromise<TeamListElementList> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/team/',
            query: {
                'league_id': leagueId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Get Team By Player And League
     * @param playerId 
     * @param leagueId 
     * @returns TeamListElement Successful Response
     * @throws ApiError
     */
    public static getTeamByPlayerAndLeagueTeamPlayerPlayerIdLeagueLeagueIdGet(
playerId: number,
leagueId: number,
): CancelablePromise<TeamListElement> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/team/player/{player_id}/league/{league_id}',
            path: {
                'player_id': playerId,
                'league_id': leagueId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

}
