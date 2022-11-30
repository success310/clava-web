/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class TemporaryService {

    /**
     * Add Trophy 3
     * @param dryRun 
     * @param key 
     * @returns any Successful Response
     * @throws ApiError
     */
    public static addTrophy3TempAddTrophy3Post(
dryRun: boolean = true,
key?: string,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/temp/add_trophy_3',
            query: {
                'dry_run': dryRun,
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
     * Test Refresh Squad Statistics
     * @param teamId 
     * @param key 
     * @returns any Successful Response
     * @throws ApiError
     */
    public static testRefreshSquadStatisticsTempTestRefreshSquadStatisticsPost(
teamId: number,
key?: string,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/temp/test_refresh_squad_statistics',
            query: {
                'team_id': teamId,
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
     * Add Lineup
     * @param key 
     * @returns any Successful Response
     * @throws ApiError
     */
    public static addLineupTempAddLineupPost(
key?: string,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/temp/add_lineup',
            query: {
                'key': key,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Change Jugend
     * @param dryRun 
     * @param key 
     * @returns any Successful Response
     * @throws ApiError
     */
    public static changeJugendTempChangeJugendPost(
dryRun: boolean = true,
key?: string,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/temp/change_jugend',
            query: {
                'dry_run': dryRun,
                'key': key,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Add Ligapokal
     * @param dryRun 
     * @param key 
     * @returns any Successful Response
     * @throws ApiError
     */
    public static addLigapokalTempAddLigapokalPost(
dryRun: boolean = true,
key?: string,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/temp/add_ligapokal',
            query: {
                'dry_run': dryRun,
                'key': key,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Add Amateur
     * @param key 
     * @returns any Successful Response
     * @throws ApiError
     */
    public static addAmateurTempAddAmateurPost(
key?: string,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/temp/add_amateur',
            query: {
                'key': key,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Add Pokal 2
     * @param key 
     * @returns any Successful Response
     * @throws ApiError
     */
    public static addPokal2TempAddPokal2Post(
key?: string,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/temp/add_pokal_2',
            query: {
                'key': key,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

}
