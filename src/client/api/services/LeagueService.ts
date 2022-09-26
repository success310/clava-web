/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { League } from '../models/League';
import type { LeagueList } from '../models/LeagueList';
import type { LeagueMatchList } from '../models/LeagueMatchList';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class LeagueService {

    /**
     * Get League By Id
     * @param leagueId 
     * @returns League Successful Response
     * @throws ApiError
     */
    public static getLeagueByIdLeagueLeagueIdGet(
leagueId: number,
): CancelablePromise<League> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/league/{league_id}',
            path: {
                'league_id': leagueId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Get Leagues
     * @param areaOfInterestId 
     * @returns LeagueList Successful Response
     * @throws ApiError
     */
    public static getLeaguesLeagueGet(
areaOfInterestId: number,
): CancelablePromise<LeagueList> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/league/',
            query: {
                'area_of_interest_id': areaOfInterestId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Get League Match By Date
     * @param date 
     * @param areaOfInterest 
     * @returns LeagueMatchList Successful Response
     * @throws ApiError
     */
    public static getLeagueMatchByDateLeagueMatchesDateGet(
date: string,
areaOfInterest: number,
): CancelablePromise<LeagueMatchList> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/league_matches/date',
            query: {
                'date': date,
                'area_of_interest': areaOfInterest,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Get League Match By Team
     * @param teamId 
     * @param areaOfInterest 
     * @returns LeagueMatchList Successful Response
     * @throws ApiError
     */
    public static getLeagueMatchByTeamLeagueMatchesTeamTeamIdGet(
teamId: number,
areaOfInterest: number,
): CancelablePromise<LeagueMatchList> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/league_matches/team/{team_id}',
            path: {
                'team_id': teamId,
            },
            query: {
                'area_of_interest': areaOfInterest,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

}
