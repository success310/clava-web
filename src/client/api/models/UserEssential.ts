/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type UserEssential = {
    id: number;
    username: string;
    givenName?: string;
    familyName?: string;
    email?: string;
    tel?: string;
    premium: boolean;
    emailConfirmed: boolean;
    anonymous: boolean;
};
