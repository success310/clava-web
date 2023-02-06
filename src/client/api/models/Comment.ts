/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { UserEssential } from './UserEssential';

export type Comment = {
    content: string;
    id: number;
    comments: Array<Comment>;
    likes: Array<UserEssential>;
    created: string;
    author: UserEssential;
};
