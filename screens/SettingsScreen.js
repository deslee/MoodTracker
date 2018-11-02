import React, { Component } from 'react';
import { Container, Text, CheckBox, ListItem, Body, View } from 'native-base';
import PushNotification from 'react-native-push-notification'
import DateTimePicker from '../components/DateTimePicker';

export default class SettingsScreen extends Component {
  static navigationOptions = {
    title: 'Settings'
  };

  pushNotification = () => {
    PushNotification.localNotification({
      // Android Only Properties 
      id: '0', // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID
      // ticker: "My Notification Ticker", // (optional)
      autoCancel: true, // (optional) default: true
      largeIcon: "ic_launcher", // (optional) default: "ic_launcher"
      smallIcon: "ic_launcher", // (optional) default: "ic_notification" with fallback for "ic_launcher"
      // bigText: "My big text that will be shown when notification is expanded", // (optional) default: "message" prop
      subText: "Reminder", // (optional) default: none
      // color: "red", // (optional) default: system default
      vibrate: true, // (optional) default: true
      vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
      tag: 'some_tag', // (optional) add tag to message
      group: "group", // (optional) add group to message
      ongoing: false, // (optional) set whether this is an "ongoing" notification
      priority: "high", // (optional) set notification priority, default: high
      visibility: "private", // (optional) set notification visibility, default: private
      importance: "high", // (optional) set notification importance, default: high

      // iOS and Android properties 
      title: "My Notification Title", // (optional)
      message: "My Notification Message", // (required)
      playSound: false, // (optional) default: true
      // soundName: 'default', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
      number: '10', // (optional) Valid 32 bit integer specified as string. default: none (Cannot be zero)
      repeatType: 'day', // (optional) Repeating interval. Check 'Repeating Notifications' section for more info.
    });
  }

  componentDidMount() {
  }

  render() {
    return (
      <Container>
        <ListItem>
          <Body>
            <Text>Daily reminders</Text>
            <Text>Reminds you every day to log an entry</Text>
          </Body>
          <CheckBox onPress={() => this.pushNotification()} checked={true} />
        </ListItem>
        <ListItem>
          <Body>
            <Text>Remind at</Text>
            <View style={{paddingLeft: 12}}><DateTimePicker date={new Date()} /></View>
          </Body>
        </ListItem>
      </Container>
    );
  }
}