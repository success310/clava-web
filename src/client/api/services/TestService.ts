/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GoalDistribution } from '../models/GoalDistribution';
import type { GoalDistributionMatch } from '../models/GoalDistributionMatch';
import type { Lineup } from '../models/Lineup';
import type { ManOfTheMatchListElementList } from '../models/ManOfTheMatchListElementList';
import type { ManOfTheMatchVote } from '../models/ManOfTheMatchVote';
import type { Match } from '../models/Match';
import type { MatchLocationEnum } from '../models/MatchLocationEnum';
import type { Player } from '../models/Player';
import type { SquadList } from '../models/SquadList';
import type { TeamListElementList } from '../models/TeamListElementList';
import type { Transfer } from '../models/Transfer';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class TestService {

    /**
     * Vote Match By User
     * @param userId 
     * @param matchId 
     * @param bet 
     * @returns MatchLocationEnum Successful Response
     * @throws ApiError
     */
    public static voteMatchByUserTestMatchBetUserIdPut(
userId: number,
matchId: number,
bet: MatchLocationEnum,
): CancelablePromise<MatchLocationEnum> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/test/match_bet/{user_id}',
            path: {
                'user_id': userId,
            },
            query: {
                'match_id': matchId,
                'bet': bet,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Calculate Goal Distribution
     * @param teamId 
     * @returns GoalDistribution Successful Response
     * @throws ApiError
     */
    public static calculateGoalDistributionTestGoalDistributionCalcTeamIdPost(
teamId: number,
): CancelablePromise<GoalDistribution> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/test/goal_distribution_calc/{team_id}',
            path: {
                'team_id': teamId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Calculate Goal Distribution Match
     * @param matchId 
     * @returns GoalDistributionMatch Successful Response
     * @throws ApiError
     */
    public static calculateGoalDistributionMatchTestGoalDistributionCalcMatchMatchIdPost(
matchId: number,
): CancelablePromise<GoalDistributionMatch> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/test/goal_distribution_calc_match/{match_id}',
            path: {
                'match_id': matchId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Get Last X Matches By Team
     * @param teamId 
     * @returns Match Successful Response
     * @throws ApiError
     */
    public static getLastXMatchesByTeamTestMatchesLastTeamIdGet(
teamId: number,
): CancelablePromise<Array<Match>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/test/matches/last/{team_id}',
            path: {
                'team_id': teamId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Vote Man Of The Match By User
     * @param userId 
     * @param requestBody 
     * @returns ManOfTheMatchListElementList Successful Response
     * @throws ApiError
     */
    public static voteManOfTheMatchByUserTestManOfTheMatchUserIdPut(
userId: number,
requestBody: ManOfTheMatchVote,
): CancelablePromise<ManOfTheMatchListElementList> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/test/man_of_the_match/{user_id}',
            path: {
                'user_id': userId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Vote Random Man Of The Match
     * @param matchId 
     * @param amountVotes 
     * @param limit 
     * @returns any Successful Response
     * @throws ApiError
     */
    public static voteRandomManOfTheMatchTestRandomManOfTheMatchMatchIdPost(
matchId: number,
amountVotes: number,
limit: number,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/test/random_man_of_the_match/{match_id}',
            path: {
                'match_id': matchId,
            },
            query: {
                'amount_votes': amountVotes,
                'limit': limit,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Random Man Of The Match Matchday
     * @param leagueId 
     * @param matchDay 
     * @param amountVotesMatchday 
     * @returns any Successful Response
     * @throws ApiError
     */
    public static randomManOfTheMatchMatchdayTestRandomManOfTheMatchLeagueLeagueIdMatchDayMatchDayPost(
leagueId: number,
matchDay: number,
amountVotesMatchday: number,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/test/random_man_of_the_match/league/{league_id}/match_day/{match_day}',
            path: {
                'league_id': leagueId,
                'match_day': matchDay,
            },
            query: {
                'amount_votes_matchday': amountVotesMatchday,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Test Team Of The Week
     * @param leagueId 
     * @param matchDay 
     * @returns any Successful Response
     * @throws ApiError
     */
    public static testTeamOfTheWeekTestTeamOfTheWeekLeagueLeagueIdDayMatchDayPost(
leagueId: number,
matchDay: number,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/test/team_of_the_week/league/{league_id}/day/{match_day}',
            path: {
                'league_id': leagueId,
                'match_day': matchDay,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Create Lineup By Match And Team With Random Players
     * @param matchId 
     * @param team 
     * @returns Lineup Successful Response
     * @throws ApiError
     */
    public static createLineupByMatchAndTeamWithRandomPlayersTestLineupMatchMatchIdTeamPut(
matchId: number,
team: MatchLocationEnum,
): CancelablePromise<Lineup> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/test/lineup/match/{match_id}/{team}',
            path: {
                'match_id': matchId,
                'team': team,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Create Lineup By Match And Team With Random Players
     * @param teamId 
     * @returns Lineup Successful Response
     * @throws ApiError
     */
    public static createLineupByMatchAndTeamWithRandomPlayersTestLineupTeamTeamIdPut(
teamId: number,
): CancelablePromise<Array<Lineup>> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/test/lineup/team/{team_id}',
            path: {
                'team_id': teamId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Write Value To Redis
     * @param key 
     * @param value 
     * @returns any Successful Response
     * @throws ApiError
     */
    public static writeValueToRedisTestRedisWritePost(
key: string,
value: string,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/test/redis/write',
            query: {
                'key': key,
                'value': value,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Read Value From Redis
     * @param key 
     * @returns string Successful Response
     * @throws ApiError
     */
    public static readValueFromRedisTestRedisReadGet(
key: string,
): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/test/redis/read',
            query: {
                'key': key,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Test Search
     * @param query 
     * @returns Player Successful Response
     * @throws ApiError
     */
    public static testSearchTestTestSearchGet(
query: string,
): CancelablePromise<Array<Player>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/test/test_search',
            query: {
                'query': query,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Test Change Email
     * @returns any Successful Response
     * @throws ApiError
     */
    public static testChangeEmailTestTestChangeEmailPost(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/test/test_change_email',
        });
    }

    /**
     * Test Statistics
     * @param leagueId 
     * @returns any Successful Response
     * @throws ApiError
     */
    public static testStatisticsTestTestStatisticsLeagueIdPost(
leagueId: number,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/test/test_statistics/{league_id}',
            path: {
                'league_id': leagueId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Test Statistics Squad
     * @param teamId 
     * @returns any Successful Response
     * @throws ApiError
     */
    public static testStatisticsSquadTestTestStatisticSquadTeamIdPost(
teamId: number,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/test/test_statistic_squad/{team_id}',
            path: {
                'team_id': teamId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Test Statistic Single
     * @param leagueId 
     * @returns any Successful Response
     * @throws ApiError
     */
    public static testStatisticSingleTestTestStatisticSingleLeagueIdPost(
leagueId: number,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/test/test_statistic_single/{league_id}',
            path: {
                'league_id': leagueId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Test Broadcast Event
     * @param matchId 
     * @param leagueId 
     * @param teamId 
     * @returns any Successful Response
     * @throws ApiError
     */
    public static testBroadcastEventTestTestBroadcastEventPost(
matchId: number,
leagueId: number,
teamId: number,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/test/test_broadcast_event',
            query: {
                'match_id': matchId,
                'league_id': leagueId,
                'team_id': teamId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Test Broadcast User
     * @param userId 
     * @returns any Successful Response
     * @throws ApiError
     */
    public static testBroadcastUserTestTestBroadcastUserPost(
userId: number,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/test/test_broadcast_user',
            query: {
                'user_id': userId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Test Broadcast Lineup
     * @param matchId 
     * @param teamId 
     * @returns any Successful Response
     * @throws ApiError
     */
    public static testBroadcastLineupTestTestBroadcastLineupPost(
matchId: number,
teamId: number,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/test/test_broadcast_lineup',
            query: {
                'match_id': matchId,
                'team_id': teamId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Create User Request
     * @param userId 
     * @param teamId 
     * @returns any Successful Response
     * @throws ApiError
     */
    public static createUserRequestTestCreateUserRequestUserIdTeamTeamIdPost(
userId: number,
teamId: number,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/test/create_user_request/{user_id}/team/{team_id}',
            path: {
                'user_id': userId,
                'team_id': teamId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Confirm User Request
     * @param userId 
     * @param teamId 
     * @returns any Successful Response
     * @throws ApiError
     */
    public static confirmUserRequestTestMakeUserInsiderUserIdTeamTeamIdPost(
userId: number,
teamId: number,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/test/make_user_insider/{user_id}/team/{team_id}',
            path: {
                'user_id': userId,
                'team_id': teamId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Create Test Goal Event
     * @param matchId 
     * @returns any Successful Response
     * @throws ApiError
     */
    public static createTestGoalEventTestCreateTestGoalEventMatchIdGet(
matchId: number,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/test/create_test_goal_event/{match_id}',
            path: {
                'match_id': matchId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Get Test Lineups
     * @param leagueId 
     * @param teamId 
     * @returns Lineup Successful Response
     * @throws ApiError
     */
    public static getTestLineupsTestTestGetLineupsLeagueLeagueIdTeamTeamIdGet(
leagueId: number,
teamId: number,
): CancelablePromise<Array<Lineup>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/test/test_get_lineups/league/{league_id}/team/{team_id}',
            path: {
                'league_id': leagueId,
                'team_id': teamId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Refresh Squad
     * @param teamId 
     * @returns SquadList Successful Response
     * @throws ApiError
     */
    public static refreshSquadTestRefreshSquadTeamIdPost(
teamId: number,
): CancelablePromise<SquadList> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/test/refresh_squad/{team_id}',
            path: {
                'team_id': teamId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Recalculate Squads
     * @param leagueId 
     * @returns any Successful Response
     * @throws ApiError
     */
    public static recalculateSquadsTestRecalculateSquadsLeagueIdPut(
leagueId: number,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/test/recalculate_squads/{league_id}',
            path: {
                'league_id': leagueId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Get Match
     * @param matchId 
     * @returns Match Successful Response
     * @throws ApiError
     */
    public static getMatchTestMatchMatchIdGet(
matchId: number,
): CancelablePromise<Match> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/test/match/{match_id}',
            path: {
                'match_id': matchId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Random Transfer
     * @param teamFromId 
     * @param teamToId 
     * @returns Transfer Successful Response
     * @throws ApiError
     */
    public static randomTransferTestRandomTransferPost(
teamFromId?: number,
teamToId?: number,
): CancelablePromise<Transfer> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/test/random_transfer',
            query: {
                'team_from_id': teamFromId,
                'team_to_id': teamToId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Send Test Notification Type
     * @param matchId 
     * @param eventType 
     * @returns any Successful Response
     * @throws ApiError
     */
    public static sendTestNotificationTypeTestTestNotificationTypeMatchIdPost(
matchId: number,
eventType: string,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/test/test_notification/{type}/{match_id}',
            path: {
                'match_id': matchId,
            },
            query: {
                'event_type': eventType,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Recalculater Squad Statistic
     * @returns any Successful Response
     * @throws ApiError
     */
    public static recalculaterSquadStatisticTestRecalculateSquadStatisticsPost(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/test/recalculate_squad_statistics/',
        });
    }

    /**
     * Test Set Current Match Day
     * @returns any Successful Response
     * @throws ApiError
     */
    public static testSetCurrentMatchDayTestTestSetCurrentMatchDayPost(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/test/test_set_current_match_day',
        });
    }

    /**
     * Test Refresh Squad
     * @returns any Successful Response
     * @throws ApiError
     */
    public static testRefreshSquadTestTestRefreshSquadPost(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/test/test_refresh_squad',
        });
    }

    /**
     * Test Sportnews
     * @returns any Successful Response
     * @throws ApiError
     */
    public static testSportnewsTestGetTestSportnewsPost(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/test/get_test_sportnews',
        });
    }

    /**
     * Team Test
     * @param name 
     * @returns TeamListElementList Successful Response
     * @throws ApiError
     */
    public static teamTestTestTeamTestGet(
name: string,
): CancelablePromise<TeamListElementList> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/test/team_test',
            query: {
                'name': name,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Test Save Out Log
     * @param hash 
     * @param userId 
     * @returns any Successful Response
     * @throws ApiError
     */
    public static testSaveOutLogTestTestSaveOutLogHashUserIdPost(
hash: string,
userId: number,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/test/test_save_out_log/{hash}/{user_id}',
            path: {
                'hash': hash,
                'user_id': userId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Test Message To Socket
     * @returns any Successful Response
     * @throws ApiError
     */
    public static testMessageToSocketTestTestMessageToSocketPost(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/test/test_message_to_socket',
        });
    }

    /**
     * Test Communicati
     * @returns any Successful Response
     * @throws ApiError
     */
    public static testCommunicatiTestTestCommunicatiPost(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/test/test_communicati',
        });
    }

}
