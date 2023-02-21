/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Body_change_team_icon_admin_change_team_icon__team_id__post } from '../models/Body_change_team_icon_admin_change_team_icon__team_id__post';
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
     * Update All Standings
     * @param key 
     * @returns any Successful Response
     * @throws ApiError
     */
    public static updateAllStandingsAdminRefreshAllStandingsPost(
key?: string,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/refresh_all_standings',
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

    /**
     * Change Team Icon
     * @param teamId 
     * @param caption 
     * @param filename 
     * @param formData 
     * @param key 
     * @returns any Successful Response
     * @throws ApiError
     */
    public static changeTeamIconAdminChangeTeamIconTeamIdPost(
teamId: number,
caption: string,
filename: string,
formData: Body_change_team_icon_admin_change_team_icon__team_id__post,
key?: string,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/change_team_icon/{team_id}',
            path: {
                'team_id': teamId,
            },
            query: {
                'caption': caption,
                'filename': filename,
                'key': key,
            },
            formData: formData,
            mediaType: 'multipart/form-data',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Update Times Matches
     * @param key 
     * @returns any Successful Response
     * @throws ApiError
     */
    public static updateTimesMatchesAdminUpdateTimesMatchesPost(
key?: string,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/update_times_matches',
            query: {
                'key': key,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Fix Goals League
     * @param leagueId 
     * @param key 
     * @returns any Successful Response
     * @throws ApiError
     */
    public static fixGoalsLeagueAdminFixGoalsLeagueLeagueIdPost(
leagueId: number,
key?: string,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/fix_goals_league/{league_id}',
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
     * Do Work
     * @param key 
     * @returns any Successful Response
     * @throws ApiError
     */
    public static doWorkAdminDoWorkPost(
key?: string,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/do_work',
            query: {
                'key': key,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Test News
     * @param key 
     * @returns any Successful Response
     * @throws ApiError
     */
    public static testNewsAdminTestNewsPost(
key?: string,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/test_news',
            query: {
                'key': key,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Reset Match Day Cache
     * @param leagueId 
     * @param matchDay 
     * @returns any Successful Response
     * @throws ApiError
     */
    public static resetMatchDayCacheAdminResetMatchDayCachePost(
leagueId: number,
matchDay: number,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/reset_match_day_cache',
            query: {
                'league_id': leagueId,
                'match_day': matchDay,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

}
