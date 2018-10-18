import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { Text, Body, Icon, H2, List, ListItem, Right, View } from 'native-base';
import MoodTrackerManager from '../service/MoodTrackerManager';
import { MoodEntryComponent } from '../screens/MoodEntry';

export default class MoodLog extends Component {
    render() {
        const { moods, onSelectMood } = this.props;
        return (
            <View>
                <ScrollView>
                    <List>
                        {moods.map((mood) =>
                            <ListItem key={mood.id} onPress={() => onSelectMood(mood.id)} >
                                <Body>
                                    <View>
                                        <H2>{MoodTrackerManager.getMoodText(mood.value)}</H2>
                                        <Text>{MoodTrackerManager.getMoodTimeText(mood.date)}</Text>
                                        <Text>{MoodTrackerManager.getMoodDateText(mood.date)}</Text>
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