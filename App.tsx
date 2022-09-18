import {
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_900Black,
  useFonts,
} from '@expo-google-fonts/inter';
import { Subscription } from 'expo-modules-core';
import { useEffect, useRef } from 'react';
import { StatusBar } from 'react-native';
import { Background } from './src/components/Background/indexs';
import { Loading } from './src/components/Loading';
import { Routes } from './src/routes';
import { getPushNotificationToken } from './src/service/getPushNotificationToken';
import './src/service/notificationConfigs';
import * as Notifications from 'expo-notifications';

export default function App() {
  const getNotifiListenner = useRef<Subscription>();
  const responseNotifiListenner = useRef<Subscription>();

  useEffect(() => {
    getPushNotificationToken();
  }, []);

  useEffect(() => {
    getNotifiListenner.current = Notifications.addNotificationReceivedListener(
      (notification) => {
        console.log(
          '🚀 ~ file: App.tsx ~ line 29 ~ useEffect ~ notification',
          notification
        );
      }
    );

    responseNotifiListenner.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(
          '🚀 ~ file: App.tsx ~ line 39 ~ useEffect ~ response',
          response
        );
      });

    if (getNotifiListenner.current && responseNotifiListenner.current) {
      Notifications.removeNotificationSubscription(getNotifiListenner.current);
      Notifications.removeNotificationSubscription(
        responseNotifiListenner.current
      );
    }
  }, []);

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_900Black,
  });
  return (
    <Background>
      <StatusBar barStyle="default" backgroundColor="transparent" translucent />
      {fontsLoaded ? <Routes /> : <Loading />}
    </Background>
  );
}
