/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class VideoTestService {

    /**
     * Small Stream
     * @returns any Successful Response
     * @throws ApiError
     */
    public static smallStreamVideoTestSmallStreamGet(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/video_test/small_stream',
        });
    }

    /**
     * Medium Stream
     * @returns any Successful Response
     * @throws ApiError
     */
    public static mediumStreamVideoTestMediumStreamGet(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/video_test/medium_stream',
        });
    }

    /**
     * Large Stream
     * @returns any Successful Response
     * @throws ApiError
     */
    public static largeStreamVideoTestLargeStreamGet(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/video_test/large_stream',
        });
    }

    /**
     * Xl Stream
     * @returns any Successful Response
     * @throws ApiError
     */
    public static xlStreamVideoTestXlStreamGet(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/video_test/xl_stream',
        });
    }

    /**
     * Small File
     * @returns any Successful Response
     * @throws ApiError
     */
    public static smallFileVideoTestSmallFileGet(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/video_test/small_file',
        });
    }

    /**
     * Medium File
     * @returns any Successful Response
     * @throws ApiError
     */
    public static mediumFileVideoTestMediumFileGet(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/video_test/medium_file',
        });
    }

    /**
     * Large File
     * @returns any Successful Response
     * @throws ApiError
     */
    public static largeFileVideoTestLargeFileGet(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/video_test/large_file',
        });
    }

    /**
     * Xl File
     * @returns any Successful Response
     * @throws ApiError
     */
    public static xlFileVideoTestXlFileGet(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/video_test/xl_file',
        });
    }

}
