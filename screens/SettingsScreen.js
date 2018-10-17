import React, {Component} from 'react';
import { Container, Text } from 'native-base';

export default class SettingsScreen extends Component {
    static navigationOptions = {
      title: 'Settings'
    };
    render() {
      return (
        <Container>
            <Text>Settings</Text>
        </Container>
      );
    }
  }