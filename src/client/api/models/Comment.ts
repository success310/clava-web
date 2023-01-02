/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { UserEssential } from './UserEssential';

export type Comment = {
    text: string;
    id: number;
    comments: Array<Comment>;
    likes: Array<UserEssential>;
};
