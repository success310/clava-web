/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class OutService {

    /**
     * Redirect
     * @param key 
     * @param userId 
     * @returns void 
     * @throws ApiError
     */
    public static redirectOutKeyUserIdGet(
key: string,
userId: number,
): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/out/{key}/{user_id}',
            path: {
                'key': key,
                'user_id': userId,
            },
            errors: {
                307: `Successful Response`,
                422: `Validation Error`,
            },
        });
    }

    /**
     * Redirect Without User
     * @param key 
     * @returns void 
     * @throws ApiError
     */
    public static redirectWithoutUserOutKeyGet(
key: string,
): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/out/{key}',
            path: {
                'key': key,
            },
            errors: {
                307: `Successful Response`,
                422: `Validation Error`,
            },
        });
    }

}
