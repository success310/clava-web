/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Body_create_register_user_admin_create_register_user_post } from '../models/Body_create_register_user_admin_create_register_user_post';
import type { GroupEnum } from '../models/GroupEnum';
import type { ScopeEnum } from '../models/ScopeEnum';
import type { User } from '../models/User';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class AdministrationService {

    /**
     * Clear Cache
     * @param key 
     * @returns any Successful Response
     * @throws ApiError
     */
    public static clearCacheAdminClearCachePost(
key?: string,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/clear_cache',
            query: {
                'key': key,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Set User Password
     * @param userEmail 
     * @param userPassword 
     * @param key 
     * @returns User Successful Response
     * @throws ApiError
     */
    public static setUserPasswordAdminSetUserPasswordPost(
userEmail: string,
userPassword: string,
key?: string,
): CancelablePromise<User> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/set_user_password',
            query: {
                'user_email': userEmail,
                'user_password': userPassword,
                'key': key,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Create Register User
     * @param teamName 
     * @param requestBody 
     * @param insider 
     * @param key 
     * @returns any Successful Response
     * @throws ApiError
     */
    public static createRegisterUserAdminCreateRegisterUserPost(
teamName: string,
requestBody: Body_create_register_user_admin_create_register_user_post,
insider?: GroupEnum,
key?: string,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/create_register_user',
            query: {
                'team_name': teamName,
                'insider': insider,
                'key': key,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Make User Insider
     * @param userEmail 
     * @param teamId 
     * @param insider 
     * @param key 
     * @returns any Successful Response
     * @throws ApiError
     */
    public static makeUserInsiderAdminMakeUserInsiderUserEmailTeamTeamIdPost(
userEmail: string,
teamId: number,
insider: GroupEnum,
key?: string,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/make_user_insider/{user_email}/team/{team_id}',
            path: {
                'user_email': userEmail,
                'team_id': teamId,
            },
            query: {
                'insider': insider,
                'key': key,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Confirm User Email
     * @param userEmail 
     * @param key 
     * @returns User Successful Response
     * @throws ApiError
     */
    public static confirmUserEmailAdminConfirmUserEmailUserEmailPost(
userEmail: string,
key?: string,
): CancelablePromise<User> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/confirm_user_email/{user_email}',
            path: {
                'user_email': userEmail,
            },
            query: {
                'key': key,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Make User Admin
     * @param userEmail 
     * @param scope 
     * @param key 
     * @returns any Successful Response
     * @throws ApiError
     */
    public static makeUserAdminAdminGiveUserScopeUserIdPost(
userEmail: string,
scope: ScopeEnum,
key?: string,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/give_user_scope/{user_id}',
            query: {
                'user_email': userEmail,
                'scope': scope,
                'key': key,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Recalculate All Statistics
     * @param key 
     * @returns any Successful Response
     * @throws ApiError
     */
    public static recalculateAllStatisticsAdminRecalculateAllStatisticsPost(
key?: string,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/recalculate_all_statistics',
            query: {
                'key': key,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Force Update Standings League
     * @param leagueId 
     * @param key 
     * @returns any Successful Response
     * @throws ApiError
     */
    public static forceUpdateStandingsLeagueAdminForceUpdateStandingsLeagueLeagueIdPost(
leagueId: number,
key?: string,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/force_update_standings_league/{league_id}',
            path: {
                'league_id': leagueId,
            },
            query: {
                'key': key,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Force Recalculate Squads
     * @param key 
     * @returns any Successful Response
     * @throws ApiError
     */
    public static forceRecalculateSquadsAdminForceRecalculateSquadsPost(
key?: string,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/force_recalculate_squads',
            query: {
                'key': key,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Check Kafka Health
     * @param key 
     * @returns any Successful Response
     * @throws ApiError
     */
    public static checkKafkaHealthAdminCheckKafkaHealthPost(
key?: string,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/check_kafka_health',
            query: {
                'key': key,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Delete Team
     * @param teamId 
     * @param key 
     * @returns any Successful Response
     * @throws ApiError
     */
    public static deleteTeamAdminDeleteTeamTeamIdPost(
teamId: number,
key?: string,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/delete_team/{team_id}',
            path: {
                'team_id': teamId,
            },
            query: {
                'key': key,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

}
