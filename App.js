import {
  createStackNavigator,
} from 'react-navigation';
import React from 'react';
import HomeScreen from './screens/HomeScreen';
import MoodEntry from './screens/MoodEntry';
import navigationService from './service/navigationService';
import SettingsScreen from './screens/SettingsScreen';

const TopLevelNavigator = createStackNavigator({
  Home: { screen: HomeScreen },
  MoodEntry: { screen: MoodEntry },
  Settings: { screen: SettingsScreen }
}, {
    initialRouteName: 'Home'
  });

export default class extends React.Component {
  render() {
    return <TopLevelNavigator 
      ref={navigatorRef => navigationService.setTopLevelNavigator(navigatorRef)} 
    />
  }
}