/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { File } from './File';
import type { MatchListElement } from './MatchListElement';
import type { UserEssential } from './UserEssential';

export type Post = {
    content: string;
    id: number;
    media?: File;
    match: MatchListElement;
    likes: Array<UserEssential>;
    author: UserEssential;
    created: string;
    deleted: boolean;
};
