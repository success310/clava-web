import { EnhancedStore } from '@reduxjs/toolkit';
import * as Sentry from '@sentry/react';
import {
  IDType,
  LanguageISO,
  LineupExtended,
  LineupPositionPlayersExtended,
} from '../config/types';
import {
  AdPositionEnum,
  AdService,
  ApiError,
  AppService,
  AreaOfInterest,
  AreaOfInterestService,
  AuthenticationService,
  AuthResponse,
  Blog,
  BlogService,
  BulletinService,
  CancelablePromise,
  EventService,
  ExternalVideo,
  ExternalVideoCreateRaw,
  ExternalVideoService,
  GoalDistributionService,
  Language,
  LanguageLocaleEnum,
  LanguageService,
  League,
  LeagueMatch,
  LeagueService,
  LineupCreate,
  LineupService,
  LocationCreate,
  LocationService,
  ManOfTheMatchService,
  ManOfTheMatchVote,
  MatchBetService,
  MatchDayService,
  MatchListElement,
  MatchLocationEnum,
  MatchService,
  OpenAPI,
  PlayerCreate,
  PlayerPatch,
  PlayerService,
  SearchResult,
  SearchService,
  SponsorCreate,
  SponsorPatch,
  SponsorService,
  SquadService,
  StandingService,
  StatisticKeyEnum,
  StatisticsService,
  Team,
  TeamListElement,
  TeamPatch,
  TeamService,
  Transfer,
  TransferService,
  User,
  UserCreate,
  UserService,
} from './api';
import { formatDate } from '../config/utils';
import { AMOUNT_MATCHDAYS, PROD_ENDPOINT } from '../config/constants';

class Client {
  public static token: string | undefined = undefined;

  private static JWT_STORAGE = 'jwt_token';

  private static JWT_REFRESH_STORAGE = 'jwt_refresh_token';

  private static refreshToken: string | undefined = undefined;

  private static __instance: Client | null = null;

  private endpoint = `https://${PROD_ENDPOINT}`;

  private constructor(endpoint: string) {
    this.endpoint = `https://${endpoint}`;
    OpenAPI.TOKEN = Client.getToken;
    OpenAPI.BASE = this.endpoint;
  }

  static getInstance(endpoint?: string): Client {
    if (Client.__instance === null) {
      if (!endpoint) endpoint = PROD_ENDPOINT;
      console.log(`first client call with ${endpoint}`);
      Client.__instance = new Client(endpoint as string);
    }
    return Client.__instance;
  }

  public static getToken(): Promise<string> {
    return new Promise<string>((resolve) => {
      if (Client.token) resolve(Client.token);
      const val = window.localStorage.getItem(Client.JWT_STORAGE);
      if (val) {
        Client.token = val;
        resolve(val);
      }
      resolve('');
    });
  }

  public static getRefreshToken(): Promise<string> {
    return new Promise<string>((resolve) => {
      if (Client.refreshToken) resolve(Client.refreshToken);
      const val = window.localStorage.getItem(Client.JWT_REFRESH_STORAGE);
      if (val) {
        Client.refreshToken = val;
        resolve(val);
      }
      resolve('');
    });
  }

  public static setToken(response: AuthResponse) {
    Client.token = response.access_token;
    Client.refreshToken = response.refresh_token;
    localStorage.setItem(Client.JWT_STORAGE, response.access_token);
    localStorage.setItem(Client.JWT_REFRESH_STORAGE, response.refresh_token);
  }

  public static async removeToken() {
    Client.token = undefined;
    Client.refreshToken = undefined;
    localStorage.removeItem(Client.JWT_STORAGE);
    localStorage.removeItem(Client.JWT_REFRESH_STORAGE);
  }

  setEndpoint(endpoint: string) {
    this.endpoint = `https://${endpoint}`;
    OpenAPI.BASE = this.endpoint;
  }

  getEndpoint(): string {
    return this.endpoint.replace('https://', '');
  }

  public imgToken() {
    return Client.token;
  }

  public setLang(lang: LanguageISO) {
    OpenAPI.HEADERS = { 'User-Lang': lang };
  }

  public changeLanguage(languageId: IDType) {
    return UserService.patchUserUserPatch({ languageId });
  }

  public changeUsername(username: string) {
    return UserService.patchUserUserPatch({ username });
  }

  public changePassword(password: string): CancelablePromise<User> {
    return new CancelablePromise<User>((resolve, reject) => {
      UserService.changePasswordUserPasswordChangePost({ password }).then(
        (response) => {
          Client.setToken(response);
          resolve(response.user);
        },
        reject,
      );
    });
  }

  public registerPatch(
    givenName: string,
    familyName: string,
    email: string,
    password: string,
  ) {
    return new CancelablePromise((resolve) => {
      UserService.registerUserUserRegisterPost({
        familyName,
        email,
        password,
        givenName,
      }).then((response) => {
        Client.setToken(response);
        resolve(response.user);
      });
    });
  }

  public logout() {
    return Client.removeToken();
  }

  public deleteAccount() {
    return new CancelablePromise((resolve, reject) => {
      UserService.deleteUserUserDelete().then((response) => {
        Client.removeToken().then(() => {
          resolve(response);
        });
      }, reject);
    });
  }

  me() {
    return new CancelablePromise<User>((resolve, reject) => {
      UserService.getUserMeUserMeGet().then((user) => {
        if (user) {
          resolve(user);
        } else {
          // This is a very rare error and can only happen in DEV I think
          const error: ApiError = {
            body: 'Unauthorized',
            name: 'ApiError',
            statusText: 'Unauthorized',
            url: '/user/me',
            message: 'Unauthorized',
            status: 401,
            request: { method: 'GET', url: '/user/me' },
          };
          reject(error);
        }
      }, reject);
    });
  }

  public loggedIn() {
    return typeof OpenAPI.TOKEN !== 'undefined';
  }

  public authorize(email: string, password: string): CancelablePromise<User> {
    return new CancelablePromise((resolve, reject) => {
      AuthenticationService.secureLoginWithEmailPasswordAuthSecureLoginPost({
        email,
        password,
      }).then((response) => {
        Client.setToken(response);
        resolve(response.user);
      }, reject);
    });
  }

  pwForgot(email: string) {
    return UserService.forgotPasswordUserPasswordForgotPost(email);
  }

  pwReset(password: string, hash: string) {
    return new CancelablePromise((resolve, reject) => {
      UserService.resetPasswordUserPasswordResetPost({ password, hash }).then(
        (response) => {
          Client.setToken(response);
          resolve(response.user);
        },
        reject,
      );
    });
  }

  refreshToken(): Promise<User> {
    return new Promise((resolve, reject) => {
      OpenAPI.TOKEN = Client.getRefreshToken;
      AuthenticationService.refreshAuthRefreshPost().then(
        (response) => {
          Client.setToken(response);
          OpenAPI.TOKEN = Client.getToken;
          resolve(response.user);
        },
        (error) => {
          OpenAPI.TOKEN = Client.getToken;
          reject(error);
        },
      );
    });
  }

  register(body: UserCreate): CancelablePromise<User> {
    return new CancelablePromise<User>((resolve, reject) => {
      Client.removeToken().then(() => {
        UserService.createUserUserPost(body).then((response) => {
          Client.setToken(response);
          resolve(response.user);
        }, reject);
      });
    });
  }

  confirmMail(code: string) {
    return new CancelablePromise<User>((resolve, reject) => {
      UserService.confirmMailUserEmailConfirmPost(code).then((auth) => {
        Client.setToken(auth);
        resolve(auth.user);
      }, reject);
    });
  }

  usernameAvailable(username: string) {
    return UserService.usernameAvailableUserUsernameAvailableUsernameGet(
      username,
    );
  }

  emailAvailable(email: string) {
    return UserService.emailAvailableUserEmailAvailableEmailGet(email);
  }

  public getSquad(teamId: IDType) {
    return SquadService.getSquadSquadTeamIdGet(teamId);
  }

  public getPLayerPositions() {
    return PlayerService.getPlayerPositionsPlayerPlayerPositionGet();
  }

  public changeAoi(areaOfInterestId: IDType) {
    return UserService.patchUserUserPatch({ areaOfInterestId });
  }

  getLeaguesOfAoi(id: IDType): CancelablePromise<League[]> {
    return LeagueService.getLeaguesLeagueGet(id);
  }

  getLeague(id: IDType): CancelablePromise<League> {
    return LeagueService.getLeagueByIdLeagueLeagueIdGet(id);
  }

  getTeamsOfLeague(id: IDType): CancelablePromise<TeamListElement[]> {
    return TeamService.getTeamsTeamGet(id);
  }

  getTeam(id: IDType): CancelablePromise<Team> {
    return TeamService.getTeamByIdTeamTeamIdGet(id);
  }

  patchTeam(id: IDType, body: TeamPatch) {
    return TeamService.patchTeamTeamTeamIdPatch(id, body);
  }

  addSponsor(teamId: IDType, body: SponsorCreate) {
    return SponsorService.createSponsorSponsorTeamTeamIdPost(teamId, body);
  }

  patchSponsor(teamId: IDType, body: SponsorPatch) {
    return SponsorService.patchSponsorSponsorSponsorIdPut(teamId, body);
  }

  removeSponsor(sponsorId: IDType) {
    return SponsorService.deleteSponsorSponsorSponsorIdDelete(sponsorId);
  }

  getLanguages(): CancelablePromise<Language[]> {
    return LanguageService.getLanguagesLanguageGet();
  }

  getLanguage(id: IDType): CancelablePromise<Language> {
    return LanguageService.getLanguageLanguageLanguageIdGet(id);
  }

  getAois(): CancelablePromise<AreaOfInterest[]> {
    return AreaOfInterestService.getAreaOfInterestsAreaOfInterestGet();
  }

  getAoi(id: IDType, store: EnhancedStore) {
    return new CancelablePromise((resolve, reject, onCancel) => {
      if (store.getState().aois.value.length) {
        this.filterAoi(store.getState().aois.value, id, resolve, reject);
      } else {
        AreaOfInterestService.getAreaOfInterestsAreaOfInterestGet().then(
          (aois) => {
            if (!onCancel.isCancelled) {
              this.filterAoi(aois, id, resolve, reject);
            }
          },
          reject,
        );
      }
    });
  }

  getMatchDaysToday(
    amountDays: number,
    leagueID: IDType,
  ): CancelablePromise<string[]> {
    return MatchDayService.getMatchDatesTodayMatchDayTodayAmountDaysGet(
      amountDays,
      leagueID,
    );
  }

  getMatchDays(
    date: Date,
    options:
      | { aoi: IDType; type: 'today' | 'bigger' | 'smaller' | 'month' }
      | { league: IDType; type: 'month' | 'today' | 'bigger' | 'smaller' },
  ): CancelablePromise<string[]> {
    const dateString = formatDate(
      date,
      LanguageLocaleEnum.DE,
      true,
      false,
      true,
    );
    switch (options.type) {
      case 'month':
        return MatchDayService.getMatchDatesInMonthMatchDayMonthGet(
          dateString,
          'aoi' in options ? options.aoi : undefined,
          'aoi' in options ? undefined : options.league,
        );
      case 'today':
        return MatchDayService.getMatchDatesTodayMatchDayTodayAmountDaysGet(
          AMOUNT_MATCHDAYS,
          'aoi' in options ? options.aoi : undefined,
          'aoi' in options ? undefined : options.league,
        );
      case 'bigger':
        return MatchDayService.getMatchDatesBiggerMatchDayBiggerAmountDaysGet(
          AMOUNT_MATCHDAYS,
          dateString,
          'aoi' in options ? options.aoi : undefined,
          'aoi' in options ? undefined : options.league,
        );
      case 'smaller':
        return MatchDayService.getMatchDatesSmallerMatchDaySmallerAmountDaysGet(
          AMOUNT_MATCHDAYS,
          dateString,
          'aoi' in options ? options.aoi : undefined,
          'aoi' in options ? undefined : options.league,
        );
      default:
        return new CancelablePromise<string[]>((resolve) => {
          Sentry.captureException(new Error('Invalid Matchday Type'));
          resolve([]);
        });
    }
  }

  getLeagueMatchesOfDay(
    date: Date,
    aoi: IDType,
  ): CancelablePromise<LeagueMatch[]> {
    return MatchService.getLeagueMatchByDateLeagueMatchesDateGet(
      formatDate(date, LanguageLocaleEnum.DE, true, false, true),
      aoi,
    );
  }

  getLeagueMatchesOfDayLeague(
    date: Date,
    leagueID: IDType,
  ): CancelablePromise<MatchListElement[]> {
    return MatchService.getMatchesByLeagueAndDateMatchLeagueLeagueIdDateMatchDateGet(
      leagueID,
      formatDate(date, LanguageLocaleEnum.DE, true, false, true),
    );
  }

  getLeagueMatchesOfMatchDayLeague(
    day: number,
    leagueID: IDType,
  ): CancelablePromise<MatchListElement[]> {
    return MatchService.getMatchesByLeagueAndMatchDayMatchLeagueLeagueIdMatchDayMatchDayGet(
      leagueID,
      day,
    );
  }

  getTable(leagueID: IDType) {
    return StandingService.getStandingByLeagueStandingLeagueAllLeagueIdGet(
      leagueID,
    );
  }

  getMatch(id: IDType) {
    return MatchService.getMatchMatchMatchIdGet(id);
  }

  getMatchBet(id: IDType) {
    return MatchBetService.getMatchBetVotingByMatchMatchBetMatchIdGet(id);
  }

  putMatchBet(matchId: IDType, bet: MatchLocationEnum) {
    return MatchBetService.voteMatchMatchBetPut({ bet, matchId });
  }

  getPlayerInFocus(matchId: IDType, team1Id: IDType, team2Id: IDType) {
    return new CancelablePromise((resolve, reject) => {
      ManOfTheMatchService.getFocusedPlayersManOfTheMatchFocusMatchIdGet(
        matchId,
        team1Id,
        3,
        10,
      ).then((team1) => {
        ManOfTheMatchService.getFocusedPlayersManOfTheMatchFocusMatchIdGet(
          matchId,
          team2Id,
          3,
          10,
        ).then((team2) => {
          resolve({ team1, team2 });
        }, reject);
      }, reject);
    });
  }

  getGoalDistribution(matchId: IDType) {
    return GoalDistributionService.getGoalDistributionByMatchGoalDistributionMatchMatchIdGet(
      matchId,
    );
  }

  getMatchTableAll(
    leagueID: IDType,
    type: MatchLocationEnum = MatchLocationEnum.ALL,
  ) {
    return StandingService.getStandingByLeagueStandingLeagueLeagueIdGet(
      leagueID,
      type,
    );
  }

  getMatchesOfTeam(id: IDType, limit: number, playedOnly: boolean) {
    return MatchService.getMatchesByTeamMatchTeamTeamIdGet(
      id,
      limit,
      playedOnly,
    );
  }

  getPlayersOfTeam(id: IDType) {
    return PlayerService.getPlayersByTeamPlayerTeamTeamIdGet(id);
  }

  getVersion() {
    return AppService.getAppVersionAppVersionGet();
  }

  checkVersion(version: string) {
    return AppService.getUpdateRequiredNewAppUpdateRequiredNewVersionGet(
      version,
    );
  }

  getPlayer(id: IDType) {
    return PlayerService.getPlayerPlayerPlayerIdGet(id);
  }

  patchPlayer(id: IDType, playerPatch: PlayerPatch) {
    return PlayerService.patchPlayerPlayerPlayerIdPatch(id, playerPatch);
  }

  addPlayer(playerPost: PlayerCreate) {
    return PlayerService.createPlayerPlayerPost(playerPost);
  }

  removePlayer(id: IDType) {
    return PlayerService.deletePlayerPlayerPlayerIdDelete(id);
  }

  getLeagueTeamStatistics(id: IDType) {
    return StatisticsService.getTeamStatisticsStatisticsTeamLeagueLeagueIdGet(
      id,
    );
  }

  getLeaguePlayerStatistics(id: IDType) {
    return StatisticsService.getPlayerStatisticsStatisticsPlayerLeagueLeagueIdGet(
      id,
    );
  }

  getDetailLeagueTeamStatistics(id: IDType, key: StatisticKeyEnum) {
    return StatisticsService.getTeamStatisticsDetailStatisticsTeamLeagueLeagueIdDetailStatisticKeyGet(
      id,
      key,
    );
  }

  getTeamStatistics(id: IDType) {
    return StatisticsService.getSquadStatisticStatisticsSquadTeamTeamIdGet(id);
  }

  getTeamStatisticsDetail(id: IDType, stat: StatisticKeyEnum) {
    return StatisticsService.getSquadStatisticsDetailStatisticsSquadTeamTeamIdDetailStatisticKeyGet(
      id,
      stat,
    );
  }

  getDetailLeaguePlayerStatistics(id: IDType, key: StatisticKeyEnum) {
    return StatisticsService.getPlayerStatisticsDetailStatisticsPlayerLeagueLeagueIdDetailStatisticKeyGet(
      id,
      key,
      20,
    );
  }

  search(q: string, length = 5, offset = 0) {
    return SearchService.searchSearchQueryGet(q, length, offset);
  }

  searchExt(
    query: string,
    length: number,
    offset: number,
    type: 'team' | 'league' | 'player',
  ): CancelablePromise<SearchResult> {
    switch (type) {
      case 'player':
        return new CancelablePromise<SearchResult>((resolve, reject) => {
          SearchService.searchPlayerSearchPlayerQueryGet(
            query,
            length,
            offset,
          ).then((players) => {
            resolve({ query, players, leagues: [], teams: [] });
          }, reject);
        });
      case 'league':
        return new CancelablePromise<SearchResult>((resolve, reject) => {
          SearchService.searchLeagueSearchLeagueQueryGet(
            query,
            length,
            offset,
          ).then((leagues) => {
            resolve({ query, players: [], leagues, teams: [] });
          }, reject);
        });
      case 'team':
        return new CancelablePromise<SearchResult>((resolve, reject) => {
          SearchService.searchTeamSearchTeamQueryGet(
            query,
            length,
            offset,
          ).then((teams) => {
            resolve({ query, players: [], leagues: [], teams });
          }, reject);
        });
      default:
        return SearchService.searchSearchQueryGet(query, length, offset);
    }
  }

  searchTeamAutocomplete(q: string) {
    return SearchService.searchTeamSearchTeamQueryGet(q, 10, 0);
  }

  getEvents(matchID: IDType) {
    return EventService.getEventsEventGet(matchID);
  }

  postCardEvent(
    matchID: IDType,
    minute: number,
    teamId: IDType,
    playerId: IDType,
    cardTypeId: IDType,
  ) {
    return EventService.addCardEventEventCardMatchIdPost(matchID, {
      cardTypeId,
      minute,
      teamId,
      playerId,
    });
  }

  postChanceEvent(
    matchID: IDType,
    minute: number,
    teamId: IDType,
    chanceTypeId: IDType,
    playerId?: IDType,
  ) {
    return EventService.addChanceEventEventChanceMatchIdPost(matchID, {
      minute,
      teamId,
      playerId,
      chanceTypeId,
    });
  }

  postChangeEvent(
    matchID: IDType,
    minute: number,
    teamId: IDType,
    playerOutId: IDType,
    injured: boolean,
    playerInId: IDType,
  ) {
    return EventService.addChangeEventEventChangeMatchIdPost(matchID, {
      minute,
      teamId,
      playerId: playerOutId,
      injured,
      playerInId,
    });
  }

  postGoalEvent(
    matchID: IDType,
    minute: number,
    teamId: IDType,
    goal1: number,
    goal2: number,
    playerId?: IDType,
    assistId?: IDType,
    goalTypeId?: IDType,
  ) {
    return EventService.addGoalEventEventGoalMatchIdPost(matchID, {
      minute,
      teamId,
      playerId,
      assistId,
      goal1,
      goal2,
      goalTypeId,
    });
  }

  patchCardEvent(
    eventId: IDType,
    minute?: number,
    playerId?: IDType,
    cardTypeId?: IDType,
  ) {
    return EventService.patchCardEventEventCardEventIdPatch(eventId, {
      cardTypeId,
      minute,
      playerId,
    });
  }

  patchChanceEvent(
    eventId: IDType,
    minute?: number,
    chanceTypeId?: IDType,
    playerId?: IDType,
  ) {
    return EventService.patchChanceEventEventChanceEventIdPatch(eventId, {
      minute,
      playerId,
      chanceTypeId,
    });
  }

  patchChangeEvent(
    eventId: IDType,
    minute?: number,
    playerOutId?: IDType,
    injured?: boolean,
    playerInId?: IDType,
  ) {
    return EventService.patchChangeEventEventChangeEventIdPatch(eventId, {
      minute,
      playerId: playerOutId,
      injured,
      playerInId,
    });
  }

  patchGoalEvent(
    eventId: IDType,
    minute?: number,
    playerId?: IDType,
    assistId?: IDType,
    goalTypeId?: IDType,
  ) {
    return EventService.patchGoalEventEventGoalEventIdPatch(eventId, {
      minute,
      playerId,
      assistId,
      goalTypeId,
    });
  }

  deleteEvent(id: IDType) {
    return EventService.deleteEventEventEventIdDelete(id);
  }

  getGoalTypes() {
    return EventService.getGoalTypesEventTypeGoalGet();
  }

  getChanceTypes() {
    return EventService.getChanceTypesEventTypeChanceGet();
  }

  getCardTypes() {
    return EventService.getCardTypesEventTypeCardGet();
  }

  changeTel(tel: string) {
    return UserService.patchUserUserPatch({ tel });
  }

  postApplyInsider(tel: string, teamIds: IDType[], message: string) {
    return new CancelablePromise<User>((resolve, reject) => {
      client()
        .changeTel(tel)
        .then((retval) => {
          const promises: CancelablePromise<User>[] = [];
          teamIds.forEach((teamId) => {
            promises.push(
              UserService.createGroupRequestUserGroupRequestPost({
                teamId,
                message,
              }),
            );
          });
          let user = retval;
          let max = user.groups.length;
          Promise.all(promises).then((results) => {
            results.forEach((res) => {
              if (res.groups.length > max) {
                user = res;
                max = res.groups.length;
              }
            });
            resolve(user);
          }, reject);
        }, reject);
    });
  }

  postConfirmInsider(userId: IDType, teamId: IDType) {
    return UserService.confirmGroupRequestUserGroupConfirmUserUserIdTeamTeamIdPost(
      userId,
      teamId,
    );
  }

  getMatchIdsByTeam(teamId: IDType) {
    // TODO
  }

  postDeclineInsider(userId: IDType, teamId: IDType) {
    return UserService.declineGroupRequestUserGroupDeclineUserUserIdTeamTeamIdPost(
      userId,
      teamId,
    );
  }

  postRemoveInsider(userId: IDType, teamId: IDType) {
    return UserService.removeGroupFromUserUserGroupRemoveUserUserIdTeamTeamIdPost(
      userId,
      teamId,
    );
  }

  postUpgradeInsider(userId: IDType, teamId: IDType) {
    return UserService.upgradeUserGroupUserGroupUpgradeUserUserIdTeamTeamIdPost(
      userId,
      teamId,
    );
  }

  postDowngradeInsider(userId: IDType, teamId: IDType) {
    return UserService.downgradeUserGroupUserGroupDowngradeUserUserIdTeamTeamIdPost(
      userId,
      teamId,
    );
  }

  getInsidersByTeam(teamId: IDType) {
    return UserService.getGroupRequestsByTeamUserGroupTeamTeamIdGet(teamId);
  }

  getLineups() {
    return LineupService.getLineupTypesLineupTypesGet();
  }

  getLineup(matchId: IDType, team: MatchLocationEnum) {
    return LineupService.getLineupByMatchAndTeamLineupMatchMatchIdTeamGet(
      matchId,
      team,
    );
  }

  putLineup(matchId: IDType, team: MatchLocationEnum, lineup: LineupCreate) {
    return LineupService.putLineupByMatchAndTeamLineupMatchMatchIdTeamPut(
      matchId,
      team,
      lineup,
    );
  }

  createLocation(teamId: IDType, oldLocations: IDType[], body: LocationCreate) {
    return new CancelablePromise<Team>((resolve, reject) => {
      LocationService.createLocationLocationPost(body).then((location) => {
        TeamService.patchTeamTeamTeamIdPatch(teamId, {
          locations: oldLocations.concat([location.id]),
        }).then(resolve, reject);
      });
    });
  }

  postMatchInfo(
    matchId: IDType,
    newTime: Date,
    locationId: IDType | undefined,
  ) {
    return MatchService.patchMatchMatchMatchIdPatch(matchId, {
      locationId,
      startTime: newTime.toISOString(),
    });
  }

  getLocation(q: string) {
    return SearchService.searchLocationSearchLocationQueryGet(q, 100, 0);
  }

  getMomt(matchId: IDType) {
    return ManOfTheMatchService.getManOfTheMatchVotingByMatchManOfTheMatchMatchIdGet(
      matchId,
      3,
    );
  }

  voteMomt(vote: ManOfTheMatchVote) {
    return ManOfTheMatchService.voteMatchManOfTheMatchPost(3, vote);
  }

  getMatchHistoryOfMatch(matchId: IDType) {
    return MatchService.getMatchHistoryMatchHistoryMatchIdGet(matchId, 5);
  }

  fetchNews(aoiId: IDType, offset: number, limit: number) {
    return BlogService.getBlogsBlogGet(limit, offset);
  }

  fetchVideos(aoiId: IDType, offset: number, limit: number) {
    return ExternalVideoService.getExternalVideosExternalVideoGet(
      limit,
      offset,
      aoiId,
    );
  }

  createVideo(createVideoRaw: ExternalVideoCreateRaw) {
    return ExternalVideoService.createExternalVideoExternalVideoRawPost(
      createVideoRaw,
    );
  }

  fetchBulletins(aoiId: IDType, offset: number, limit: number) {
    return BulletinService.getBulletinsBulletinGet(aoiId, limit, offset);
  }

  fetchTransfers(aoiId: IDType, offset: number, limit: number) {
    return TransferService.getTransferTransferAreaOfInterestAreaOfInterestIdGet(
      aoiId,
      undefined,
      undefined,
      offset,
      limit,
    );
  }

  fetchMixed(aoiId: IDType) {
    return new CancelablePromise<{
      news: Blog[];
      transfers: Transfer[];
      videos: ExternalVideo[];
    }>((resolve, reject) => {
      BlogService.getBlogsBlogGet(5, 0).then((news) => {
        ExternalVideoService.getExternalVideosExternalVideoGet(
          5,
          0,
          aoiId,
        ).then((videos) => {
          TransferService.getTransferTransferAreaOfInterestAreaOfInterestIdGet(
            aoiId,
            undefined,
            undefined,
            0,
            5,
          ).then((transfers) => {
            resolve({ news, transfers, videos });
          }, reject);
        }, reject);
      }, reject);
    });
  }

  doTransfer(playerId: IDType, oldTeamId: IDType, newTeamId: IDType) {
    return TransferService.transferPlayerTransferPlayerIdFromOldTeamIdToNewTeamIdPost(
      playerId,
      oldTeamId,
      newTeamId,
    );
  }

  getTeamOfTheWeek(leagueId: IDType, matchDay: number) {
    return new CancelablePromise<LineupExtended>((resolve, reject) => {
      ManOfTheMatchService.getTeamOfTheWeekManOfTheMatchTeamLeagueIdMatchdayMatchDayGet(
        leagueId,
        matchDay,
      ).then((lineup) => {
        const lineupExtended: LineupExtended = {
          id: lineup.id,
          type: lineup.type,
          players: [],
        };
        const promises: Promise<LineupPositionPlayersExtended>[] = [];
        lineup.players.forEach((lpp) => {
          const temp = new Promise<LineupPositionPlayersExtended>((res) => {
            TeamService.getTeamByPlayerAndLeagueTeamPlayerPlayerIdLeagueLeagueIdGet(
              lpp.player.id,
              leagueId,
            ).then((team) => {
              res({ ...lpp, team });
            }, reject);
          });
          promises.push(temp);
        });

        Promise.all(promises).then((results) => {
          results.forEach((result) => {
            if (result) lineupExtended.players.push(result);
          });
          resolve(lineupExtended);
        });
      }, reject);
    });
  }

  startMatch(id: IDType, minutes: number) {
    return MatchService.startMatchMatchStartMatchIdPost(id, minutes);
  }

  getAds(pos: AdPositionEnum) {
    return AdService.getAdsByPositionAdPositionPositionGet(pos);
  }

  private filterAoi(
    aois: AreaOfInterest[],
    id: IDType,
    resolve: (value: PromiseLike<unknown> | unknown) => void,
    reject: (reason?: any) => void,
  ): void {
    const aoisFilter = aois.filter((aoi) => aoi.id === id);
    if (aoisFilter.length === 1) {
      resolve(aoisFilter[0]);
    } else {
      reject(
        new ApiError(
          { url: 'aoi', method: 'GET' },
          {
            body: 'asd',
            ok: false,
            status: 420,
            statusText: 'invalid_id',
            url: 'locale',
          },
          'invalid_id',
        ),
      );
    }
  }
}

const client = Client.getInstance;
export default client;
