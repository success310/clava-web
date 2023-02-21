/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { LeagueList } from '../models/LeagueList';
import type { LocationList } from '../models/LocationList';
import type { MatchListElementList } from '../models/MatchListElementList';
import type { PlayerSearchElementList } from '../models/PlayerSearchElementList';
import type { SearchResult } from '../models/SearchResult';
import type { TeamListElementList } from '../models/TeamListElementList';
import type { UserEssential } from '../models/UserEssential';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class SearchService {

    /**
     * Search
     * @param query 
     * @param length 
     * @param offset 
     * @returns SearchResult Successful Response
     * @throws ApiError
     */
    public static searchSearchQueryGet(
query: string,
length: number,
offset: number,
): CancelablePromise<SearchResult> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/search/{query}',
            path: {
                'query': query,
            },
            query: {
                'length': length,
                'offset': offset,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Search Team
     * @param query 
     * @param length 
     * @param offset 
     * @param leagueId 
     * @returns TeamListElementList Successful Response
     * @throws ApiError
     */
    public static searchTeamSearchTeamQueryGet(
query: string,
length: number,
offset: number,
leagueId?: number,
): CancelablePromise<TeamListElementList> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/search/team/{query}',
            path: {
                'query': query,
            },
            query: {
                'length': length,
                'offset': offset,
                'league_id': leagueId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Search League
     * @param query 
     * @param length 
     * @param offset 
     * @returns LeagueList Successful Response
     * @throws ApiError
     */
    public static searchLeagueSearchLeagueQueryGet(
query: string,
length: number,
offset: number,
): CancelablePromise<LeagueList> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/search/league/{query}',
            path: {
                'query': query,
            },
            query: {
                'length': length,
                'offset': offset,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Search Player
     * @param query 
     * @param length 
     * @param offset 
     * @returns PlayerSearchElementList Successful Response
     * @throws ApiError
     */
    public static searchPlayerSearchPlayerQueryGet(
query: string,
length: number,
offset: number,
): CancelablePromise<PlayerSearchElementList> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/search/player/{query}',
            path: {
                'query': query,
            },
            query: {
                'length': length,
                'offset': offset,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Search Location
     * @param query 
     * @param length 
     * @param offset 
     * @returns LocationList Successful Response
     * @throws ApiError
     */
    public static searchLocationSearchLocationQueryGet(
query: string,
length: number,
offset: number,
): CancelablePromise<LocationList> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/search/location/{query}',
            path: {
                'query': query,
            },
            query: {
                'length': length,
                'offset': offset,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Search Match
     * @param query 
     * @param length 
     * @param offset 
     * @returns MatchListElementList Successful Response
     * @throws ApiError
     */
    public static searchMatchSearchMatchQueryGet(
query: string,
length: number,
offset: number,
): CancelablePromise<MatchListElementList> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/search/match/{query}',
            path: {
                'query': query,
            },
            query: {
                'length': length,
                'offset': offset,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Search User
     * @param query 
     * @param length 
     * @param offset 
     * @returns UserEssential Successful Response
     * @throws ApiError
     */
    public static searchUserSearchUserQueryGet(
query: string,
length: number,
offset: number,
): CancelablePromise<UserEssential> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/search/user/{query}',
            path: {
                'query': query,
            },
            query: {
                'length': length,
                'offset': offset,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

}
