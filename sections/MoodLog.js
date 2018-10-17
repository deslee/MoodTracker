import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { Text, Body, Icon, H2, List, ListItem, Right, View } from 'native-base';
import MoodTrackerManager from '../service/MoodTrackerManager';
import { MoodEntryComponent } from '../screens/MoodEntry';
import navigationService from '../service/navigationService';

export default class MoodLog extends Component {
    render() {
        const { moods } = this.props;
        return (
            <View>
                <ScrollView>
                    <List>
                        {moods.map((mood) =>
                            <ListItem key={mood.id} onPress={() => navigationService.navigate('MoodEntry', {[MoodEntryComponent.MOOD_ID_ARG]: mood.id})} >
                                <Body>
                                    <View>
                                        <H2>{MoodTrackerManager.getMoodText(mood.value)}</H2>
                                        <Text>on {MoodTrackerManager.getMoodDateText(mood.date)}</Text>
                                        <Text style={{ color: 'grey' }} numberOfLines={1}>
                                            {mood.notes}
                                        </Text>
                                    </View>
                                </Body>
                                <Right>
                                    <Icon name="arrow-forward" />
                                </Right>
                            </ListItem>)}
                    </List>
                </ScrollView>
            </View>
        );
    }
}