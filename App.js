import {
  createStackNavigator,
} from 'react-navigation';
import React from 'react';
import { PushNotificationIOS } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import MoodEntry from './screens/MoodEntry';
import SettingsScreen from './screens/SettingsScreen';
import { StyleProvider } from 'native-base';
import getTheme from './native-base-theme/components'
import PushNotification from 'react-native-push-notification'
import commonColor from './native-base-theme/variables/commonColor';

PushNotification.configure({
  // (optional) Called when Token is generated (iOS and Android)
  onRegister: function(token) {
      console.log( 'TOKEN:', token );
  },

  // (required) Called when a remote or local notification is opened or received
  onNotification: function(notification) {
      console.log( 'NOTIFICATION:', notification );

      // process the notification

      // required on iOS only (see fetchCompletionHandler docs: https://facebook.github.io/react-native/docs/pushnotificationios.html)
      notification.finish(PushNotificationIOS.FetchResult.NoData);
  },
  popInitialNotification: true
})

const TopLevelNavigator = createStackNavigator(
  {
    Home: { screen: HomeScreen },
    MoodEntry: { screen: MoodEntry },
    Settings: { screen: SettingsScreen }
  }, 
  {
    initialRouteName: 'Home',
    navigationOptions: {
      headerStyle: {
        backgroundColor: commonColor.btnPrimaryBg
      },
      headerTintColor: commonColor.inverseTextColor
    }
  }
);

export default class extends React.Component {
  render() {
    return <StyleProvider style={getTheme()}>
      <TopLevelNavigator />
    </StyleProvider>
  }
}