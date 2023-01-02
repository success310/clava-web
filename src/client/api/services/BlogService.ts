/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Blog } from '../models/Blog';
import type { BlogCreate } from '../models/BlogCreate';
import type { BlogList } from '../models/BlogList';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class BlogService {

    /**
     * Get Blogs
     * @param limit 
     * @param offset 
     * @returns BlogList Successful Response
     * @throws ApiError
     */
    public static getBlogsBlogGet(
limit: number,
offset: number,
): CancelablePromise<BlogList> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/blog/',
            query: {
                'limit': limit,
                'offset': offset,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Create Blog
     * @param requestBody 
     * @returns Blog Successful Response
     * @throws ApiError
     */
    public static createBlogBlogPost(
requestBody: BlogCreate,
): CancelablePromise<Blog> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/blog/',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Create Multiple Blogs
     * @param requestBody 
     * @returns Blog Successful Response
     * @throws ApiError
     */
    public static createMultipleBlogsBlogMultiplePost(
requestBody: Array<BlogCreate>,
): CancelablePromise<Array<Blog>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/blog/multiple',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

}
