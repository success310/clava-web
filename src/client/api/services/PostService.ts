/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Post } from '../models/Post';
import type { PostCreate } from '../models/PostCreate';
import type { PostPatch } from '../models/PostPatch';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class PostService {

    /**
     * Create Post
     * @param requestBody 
     * @returns Post Successful Response
     * @throws ApiError
     */
    public static createPostPostPost(
requestBody: PostCreate,
): CancelablePromise<Post> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/post/',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Delete Post
     * @param postId 
     * @returns Post Successful Response
     * @throws ApiError
     */
    public static deletePostPostPostIdDelete(
postId: number,
): CancelablePromise<Post> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/post/{post_id}',
            path: {
                'post_id': postId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Patch Post
     * @param postId 
     * @param requestBody 
     * @returns Post Successful Response
     * @throws ApiError
     */
    public static patchPostPostPostIdPatch(
postId: number,
requestBody: PostPatch,
): CancelablePromise<Post> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/post/{post_id}',
            path: {
                'post_id': postId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Like Post
     * @param postId 
     * @returns Post Successful Response
     * @throws ApiError
     */
    public static likePostPostLikePostIdPost(
postId: number,
): CancelablePromise<Post> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/post/like/{post_id}',
            path: {
                'post_id': postId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Like Post
     * @param postId 
     * @returns Post Successful Response
     * @throws ApiError
     */
    public static likePostPostUnlikePostIdPost(
postId: number,
): CancelablePromise<Post> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/post/unlike/{post_id}',
            path: {
                'post_id': postId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

}