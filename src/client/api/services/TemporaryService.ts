/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class TemporaryService {

    /**
     * Delete Wrong Teams
     * @param key 
     * @returns any Successful Response
     * @throws ApiError
     */
    public static deleteWrongTeamsTempDeleteWrongTeamsPost(
key?: string,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/temp/delete_wrong_teams',
            query: {
                'key': key,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Test Get Sportnews
     * @param key 
     * @returns any Successful Response
     * @throws ApiError
     */
    public static testGetSportnewsTempTestGetSportnewsPost(
key?: string,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/temp/test_get_sportnews',
            query: {
                'key': key,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Test Match Groups
     * @param key 
     * @returns any Successful Response
     * @throws ApiError
     */
    public static testMatchGroupsTempTestMatchGroupsPost(
key?: string,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/temp/test_match_groups',
            query: {
                'key': key,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Test Refresh Statistics
     * @param key 
     * @returns any Successful Response
     * @throws ApiError
     */
    public static testRefreshStatisticsTempTestRefreshStatisticsPost(
key?: string,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/temp/test_refresh_statistics',
            query: {
                'key': key,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Test Refresh Squads
     * @param key 
     * @returns any Successful Response
     * @throws ApiError
     */
    public static testRefreshSquadsTempTestRefreshSquadsPost(
key?: string,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/temp/test_refresh_squads',
            query: {
                'key': key,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Fix Kuens Delete Tscherms
     * @param key 
     * @returns any Successful Response
     * @throws ApiError
     */
    public static fixKuensDeleteTschermsTempFixKuensDeleteTschermsPost(
key?: string,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/temp/fix_kuens_delete_tscherms',
            query: {
                'key': key,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

}
