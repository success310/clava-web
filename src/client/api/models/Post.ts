/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Comment } from './Comment';
import type { File } from './File';
import type { MatchListElement } from './MatchListElement';
import type { UserEssential } from './UserEssential';

export type Post = {
    text: string;
    id: number;
    media: File;
    match: MatchListElement;
    likes: Array<UserEssential>;
    comments: Array<Comment>;
};
