/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DateList } from '../models/DateList';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class MatchDayService {

    /**
     * Get Match Dates Today
     * @param amountDays 
     * @param areaOfInterestId 
     * @param leagueId 
     * @returns DateList Successful Response
     * @throws ApiError
     */
    public static getMatchDatesTodayMatchDayTodayAmountDaysGet(
amountDays: number,
areaOfInterestId?: number,
leagueId?: number,
): CancelablePromise<DateList> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/match_day/today/{amount_days}',
            path: {
                'amount_days': amountDays,
            },
            query: {
                'area_of_interest_id': areaOfInterestId,
                'league_id': leagueId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Get Match Dates Smaller
     * @param amountDays 
     * @param date 
     * @param areaOfInterestId 
     * @param leagueId 
     * @returns DateList Successful Response
     * @throws ApiError
     */
    public static getMatchDatesSmallerMatchDaySmallerAmountDaysGet(
amountDays: number,
date: string,
areaOfInterestId?: number,
leagueId?: number,
): CancelablePromise<DateList> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/match_day/smaller/{amount_days}',
            path: {
                'amount_days': amountDays,
            },
            query: {
                'date': date,
                'area_of_interest_id': areaOfInterestId,
                'league_id': leagueId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Get Match Dates Bigger
     * @param amountDays 
     * @param date 
     * @param areaOfInterestId 
     * @param leagueId 
     * @returns DateList Successful Response
     * @throws ApiError
     */
    public static getMatchDatesBiggerMatchDayBiggerAmountDaysGet(
amountDays: number,
date: string,
areaOfInterestId?: number,
leagueId?: number,
): CancelablePromise<DateList> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/match_day/bigger/{amount_days}',
            path: {
                'amount_days': amountDays,
            },
            query: {
                'date': date,
                'area_of_interest_id': areaOfInterestId,
                'league_id': leagueId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Get Match Dates In Month
     * @param date 
     * @param areaOfInterestId 
     * @param leagueId 
     * @returns DateList Successful Response
     * @throws ApiError
     */
    public static getMatchDatesInMonthMatchDayMonthGet(
date: string,
areaOfInterestId?: number,
leagueId?: number,
): CancelablePromise<DateList> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/match_day/month',
            query: {
                'date': date,
                'area_of_interest_id': areaOfInterestId,
                'league_id': leagueId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

}
