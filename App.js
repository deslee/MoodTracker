import {
  createStackNavigator,
} from 'react-navigation';
import React from 'react';
import HomeScreen from './screens/HomeScreen';
import MoodEntry from './screens/MoodEntry';
import SettingsScreen from './screens/SettingsScreen';
import { StyleProvider } from 'native-base';
import getTheme from './native-base-theme/components'
import PushNotification from 'react-native-push-notification'
import commonColor from './native-base-theme/variables/commonColor';

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