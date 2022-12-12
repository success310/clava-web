import * as Sentry from '@sentry/react';
import {
  Analytics,
  getAnalytics,
  logEvent,
  setAnalyticsCollectionEnabled,
} from 'firebase/analytics';
import {
  getToken,
  MessagePayload,
  Messaging,
  onMessage,
} from '@firebase/messaging';
import { getMessaging } from 'firebase/messaging/sw';
import { initializeApp } from 'firebase/app';
import { Favorite, LanguageISO, Notification } from './types';
import { GroupEnum, LanguageLocaleEnum, User } from '../client/api';
import client from '../client';
import { addLog } from '../store/middleware/logger';
import { BETA_ENDPOINT } from './constants';

export type AD_SHOWN_EVENT = 'ad_view_web';
export type AD_CLICK_EVENT = 'ad_clicked_web';
export type COMMUNICATO_OPENED = 'communicato_opened_web';
export declare type ClavaFbEvent =
  | AD_SHOWN_EVENT
  | AD_CLICK_EVENT
  | COMMUNICATO_OPENED;
export declare type NotificationSettings =
  | { all: true }
  | {
      match: boolean;
      team: boolean;
      league: boolean;
      insider: boolean;
      teamInsider: boolean;
    };

export const BACKGROUND_MESSAGES_ASYNC = 'background_messages';

class FirebaseFactory {
  private static SETTINGS_ASYNC_STORAGE = 'NOTIFICATIONS_FIREBASE';

  private static instance: FirebaseFactory | null = null;

  private language: LanguageISO = LanguageLocaleEnum.DE;

  private subscribedTopics: string[];

  private messaging: Messaging;

  private messagingToken: string | null = null;

  private analytics: Analytics;

  private notificationHandler: null | ((notification: Notification) => void) =
    null;

  private constructor() {
    this.subscribedTopics = [];
    const app = initializeApp({
      apiKey: 'AIzaSyB3IyT45FbA5mNEMnJOtCPuDt4sW_7kaaU',
      authDomain: 'clava-c843b.firebaseapp.com',
      projectId: 'clava-c843b',
      storageBucket: 'clava-c843b.appspot.com',
      messagingSenderId: '1074581731462',
      appId: '1:1074581731462:web:d0e15e8830c5742d99f907',
      measurementId: 'G-50KH5XDEXB',
    });
    this.analytics = getAnalytics(app);
    this.messaging = getMessaging(app);
  }

  public static async initialize() {
    if (FirebaseFactory.instance === null) {
      FirebaseFactory.instance = new FirebaseFactory();

      try {
        await setAnalyticsCollectionEnabled(
          FirebaseFactory.instance.analytics,
          true,
        );
        FirebaseFactory.instance.messagingToken = await getToken(
          FirebaseFactory.instance.messaging,
        );
        onMessage(
          FirebaseFactory.instance.messaging,
          FirebaseFactory.onMessage,
        );
      } catch (e) {
        Sentry.captureException(e);
      }
    } else if (
      !process.env.NODE_ENV ||
      process.env.NODE_ENV === 'development'
    ) {
      Sentry.captureMessage('Second initialization of app');
      // throw new Error("Firebase can't be reinitialized");
    }
  }

  /**
   * @throws Error if not initialized
   */
  public static getInstance(): FirebaseFactory {
    if (FirebaseFactory.instance === null) {
      throw new Error('Firebase not initialized');
    }
    return FirebaseFactory.instance;
  }

  private static async onMessage(message: MessagePayload) {
    if (
      FirebaseFactory.instance &&
      message.notification &&
      message.notification.body &&
      message.notification.title &&
      FirebaseFactory.instance.notificationHandler
    ) {
      FirebaseFactory.instance.notificationHandler({
        text: message.notification.body,
        title: message.notification.title,
        data: message.data,
      });
    }
  }

  private static checkSetting(
    settings: NotificationSettings,
    topic: string,
  ): boolean {
    if ('all' in settings) return settings.all;
    if (topic.startsWith('match')) return settings.match;
    if (topic.startsWith('team')) return settings.team;
    if (topic.startsWith('league')) return settings.league;
    if (topic.startsWith('insider')) return settings.insider;
    if (topic.startsWith('team_insider')) return settings.teamInsider;
    return false;
  }

  private static initialSettings(): NotificationSettings {
    return {
      all: true,
    };
  }

  public setNotificationHandler(
    notificationHandler: (notification: Notification) => void,
  ) {
    this.notificationHandler = notificationHandler;
  }

  getFirebaseToken(): string | null {
    return this.messagingToken;
  }

  subscribe(topic: string, settings?: NotificationSettings) {
    if (settings) {
      if (
        this.subscribedTopics.indexOf(topic) === -1 &&
        FirebaseFactory.checkSetting(settings, topic)
      ) {
        //   this.messaging.subscribeToTopic(topic).then(() => {
        this.subscribedTopics.push(topic);
        addLog('firebase', `Subscribe New Topics: ${topic}`, '#8ef67e');
        //   });
      }
    } else {
      this.getNotificationSettings().then((s) => {
        if (
          this.subscribedTopics.indexOf(topic) === -1 &&
          FirebaseFactory.checkSetting(s, topic)
        ) {
          //  this.messaging.subscribeToTopic(topic).then(() => {
          this.subscribedTopics.push(topic);
          addLog('firebase', `Remove Subscribed Topics: ${topic}`, '#8ef67e');
          //   });
        }
      });
    }
  }

  unsubscribe(topic: string) {
    // this.messaging.unsubscribeFromTopic(topic).then(() => {
    this.subscribedTopics.splice(this.subscribedTopics.indexOf(topic), 1);
    // });
  }

  manageNotifications(favorites: Favorite[]): Promise<void> {
    return new Promise<void>((resolve) => {
      this.getNotificationSettings().then((settings) => {
        const topics = favorites.map(
          (fav) =>
            `${fav.type}_${fav.id}_${this.language}${
              client().getEndpoint() === BETA_ENDPOINT ? '_beta' : ''
            }`,
        );
        topics.forEach((topic) => {
          this.subscribe(topic, settings);
        });
        this.subscribedTopics.forEach((topic) => {
          if (topics.indexOf(topic) === -1) {
            this.unsubscribe(topic);
          }
        });
        resolve();
      });
    });
  }

  public getNotificationSettings(): Promise<NotificationSettings> {
    return new Promise<NotificationSettings>((resolve) => {
      const result = window.localStorage.getItem(
        FirebaseFactory.SETTINGS_ASYNC_STORAGE,
      );

      if (result)
        try {
          resolve(JSON.parse(result));
        } catch (e) {
          Sentry.captureException(e);
          resolve(FirebaseFactory.initialSettings());
        }
      else resolve(FirebaseFactory.initialSettings());
    });
  }

  public setNotificationSettings(on: boolean): Promise<void> {
    return new Promise((resolve) => {
      window.localStorage.setItem(
        FirebaseFactory.SETTINGS_ASYNC_STORAGE,
        JSON.stringify({ all: on }),
      );
      if (!on) {
        this.manageNotifications([]).then(() => {
          resolve();
        });
      }
    });
  }

  subscribeUserSpecific(user: User) {
    this.getNotificationSettings().then((settings) => {
      user.groups.forEach((g) => {
        if (g.key === GroupEnum.INSIDER && !g.request) {
          this.subscribe(
            `insider_${g.team.id}_${user.language.locale}`,
            settings,
          );
        }
        if (g.key === GroupEnum.TEAM_INSIDER && !g.request) {
          this.subscribe(
            `team_insider_${g.team.id}_${user.language.locale}`,
            settings,
          );
        }
      });
    });
  }

  public logEvent(eventName: ClavaFbEvent, params: Record<string, any>) {
    logEvent(this.analytics, eventName, params);
  }
}
export const initFb = FirebaseFactory.initialize;
export const fb = FirebaseFactory.getInstance;
