import * as Notifications from 'expo-notifications';

export async function getPushNotificationToken() {
  const { granted } = await Notifications.getPermissionsAsync();

  if (!granted) {
    await Notifications.requestPermissionsAsync();
  }

  if (granted) {
    const pushToken = await Notifications.getExpoPushTokenAsync();
    console.log(
      '🚀 ~ file: getPushNotificationToken.ts ~ line 14 ~ getPushNotificationToken ~ pushToken',
      pushToken.data
    );

    return pushToken.data;
  }
}
