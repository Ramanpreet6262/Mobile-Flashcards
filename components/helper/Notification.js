import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import { AsyncStorage } from 'react-native';

const NOTIFICATION_KEY = 'notificationKey';

export function clearLocalNotification() {
  return AsyncStorage.removeItem(NOTIFICATION_KEY).then(
    Notifications.cancelAllScheduledNotificationsAsync
  );
}

function createNotification() {
  return {
    title: 'Flashcards',
    body: 'Hey ready to take the quiz.',
    ios: {
      sound: true
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true
    }
  };
}

export function setLocalNotification() {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(res => JSON.parse(res))
    .then(async data => {
      if (data === null) {
        const { status } = await Permissions.askAsync(
          Permissions.NOTIFICATIONS
        );

        if (status === 'granted') {
          Notifications.cancelAllScheduledNotificationsAsync();
          let tomorrow = new Date();
          tomorrow.setDate(tomorrow.getDate() + 1);
          tomorrow.setHours(20);
          tomorrow.setMinutes(0);

          Notifications.scheduleLocalNotificationAsync(createNotification(), {
            time: tomorrow,
            repeat: 'day'
          });

          AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
        }
      }
    });
}
