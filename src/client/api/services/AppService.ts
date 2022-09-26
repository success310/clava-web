/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class AppService {

    /**
     * Get App Version
     * @returns string Successful Response
     * @throws ApiError
     */
    public static getAppVersionAppVersionGet(): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/app/version',
        });
    }

    /**
     * Get Update Required New
     * @param version 
     * @returns boolean Successful Response
     * @throws ApiError
     */
    public static getUpdateRequiredNewAppUpdateRequiredNewVersionGet(
version: string,
): CancelablePromise<boolean> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/app/update_required_new/{version}',
            path: {
                'version': version,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Get Update Required
     * @param version 
     * @returns boolean Successful Response
     * @throws ApiError
     */
    public static getUpdateRequiredAppUpdateRequiredVersionGet(
version: string,
): CancelablePromise<boolean> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/app/update_required/{version}',
            path: {
                'version': version,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

}
