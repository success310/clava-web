/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AuthResponse } from '../models/AuthResponse';
import type { Group } from '../models/Group';
import type { GroupRequest } from '../models/GroupRequest';
import type { PasswordChange } from '../models/PasswordChange';
import type { PasswordReset } from '../models/PasswordReset';
import type { User } from '../models/User';
import type { UserCreate } from '../models/UserCreate';
import type { UserPatch } from '../models/UserPatch';
import type { UserRegister } from '../models/UserRegister';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class UserService {

    /**
     * Create User
     * @param requestBody 
     * @returns AuthResponse Successful Response
     * @throws ApiError
     */
    public static createUserUserPost(
requestBody: UserCreate,
): CancelablePromise<AuthResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/user/',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Delete User
     * @returns number Successful Response
     * @throws ApiError
     */
    public static deleteUserUserDelete(): CancelablePromise<number> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/user/',
        });
    }

    /**
     * Patch User
     * @param requestBody 
     * @returns User Successful Response
     * @throws ApiError
     */
    public static patchUserUserPatch(
requestBody: UserPatch,
): CancelablePromise<User> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/user/',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Get User Me
     * @returns User Successful Response
     * @throws ApiError
     */
    public static getUserMeUserMeGet(): CancelablePromise<User> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/user/me',
        });
    }

    /**
     * Register User
     * @param requestBody 
     * @returns AuthResponse Successful Response
     * @throws ApiError
     */
    public static registerUserUserRegisterPost(
requestBody: UserRegister,
): CancelablePromise<AuthResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/user/register',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Change Password
     * @param requestBody 
     * @returns AuthResponse Successful Response
     * @throws ApiError
     */
    public static changePasswordUserPasswordChangePost(
requestBody: PasswordChange,
): CancelablePromise<AuthResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/user/password_change',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Forgot Password
     * @param mail 
     * @returns string Successful Response
     * @throws ApiError
     */
    public static forgotPasswordUserPasswordForgotPost(
mail: string,
): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/user/password_forgot',
            query: {
                'mail': mail,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Reset Password
     * @param requestBody 
     * @returns AuthResponse Successful Response
     * @throws ApiError
     */
    public static resetPasswordUserPasswordResetPost(
requestBody: PasswordReset,
): CancelablePromise<AuthResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/user/password_reset',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Confirm Mail
     * @param code 
     * @returns AuthResponse Successful Response
     * @throws ApiError
     */
    public static confirmMailUserEmailConfirmPost(
code: string,
): CancelablePromise<AuthResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/user/email_confirm',
            query: {
                'code': code,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Email Available
     * @param email 
     * @returns boolean Successful Response
     * @throws ApiError
     */
    public static emailAvailableUserEmailAvailableEmailGet(
email: string,
): CancelablePromise<boolean> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/user/email_available/{email}',
            path: {
                'email': email,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Username Available
     * @param username 
     * @returns boolean Successful Response
     * @throws ApiError
     */
    public static usernameAvailableUserUsernameAvailableUsernameGet(
username: string,
): CancelablePromise<boolean> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/user/username_available/{username}',
            path: {
                'username': username,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Create Group Request
     * @param requestBody 
     * @returns User Successful Response
     * @throws ApiError
     */
    public static createGroupRequestUserGroupRequestPost(
requestBody: GroupRequest,
): CancelablePromise<User> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/user/group/request',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Confirm Group Request
     * @param userId 
     * @param teamId 
     * @returns Group Successful Response
     * @throws ApiError
     */
    public static confirmGroupRequestUserGroupConfirmUserUserIdTeamTeamIdPost(
userId: number,
teamId: number,
): CancelablePromise<Group> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/user/group/confirm/user/{user_id}/team/{team_id}',
            path: {
                'user_id': userId,
                'team_id': teamId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Decline Group Request
     * @param userId 
     * @param teamId 
     * @returns number Successful Response
     * @throws ApiError
     */
    public static declineGroupRequestUserGroupDeclineUserUserIdTeamTeamIdPost(
userId: number,
teamId: number,
): CancelablePromise<number> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/user/group/decline/user/{user_id}/team/{team_id}',
            path: {
                'user_id': userId,
                'team_id': teamId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Remove Group From User
     * @param userId 
     * @param teamId 
     * @returns number Successful Response
     * @throws ApiError
     */
    public static removeGroupFromUserUserGroupRemoveUserUserIdTeamTeamIdPost(
userId: number,
teamId: number,
): CancelablePromise<number> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/user/group/remove/user/{user_id}/team/{team_id}',
            path: {
                'user_id': userId,
                'team_id': teamId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Upgrade User Group
     * @param userId 
     * @param teamId 
     * @returns Group Successful Response
     * @throws ApiError
     */
    public static upgradeUserGroupUserGroupUpgradeUserUserIdTeamTeamIdPost(
userId: number,
teamId: number,
): CancelablePromise<Group> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/user/group/upgrade/user/{user_id}/team/{team_id}',
            path: {
                'user_id': userId,
                'team_id': teamId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Downgrade User Group
     * @param userId 
     * @param teamId 
     * @returns Group Successful Response
     * @throws ApiError
     */
    public static downgradeUserGroupUserGroupDowngradeUserUserIdTeamTeamIdPost(
userId: number,
teamId: number,
): CancelablePromise<Group> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/user/group/downgrade/user/{user_id}/team/{team_id}',
            path: {
                'user_id': userId,
                'team_id': teamId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Get Group Requests By Team
     * @param teamId 
     * @returns Group Successful Response
     * @throws ApiError
     */
    public static getGroupRequestsByTeamUserGroupTeamTeamIdGet(
teamId: number,
): CancelablePromise<Array<Group>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/user/group/team/{team_id}',
            path: {
                'team_id': teamId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

}
