import React, { Component } from 'react';
import { Container, Text, Button, H2, DatePicker, Textarea, View } from 'native-base';
import MoodTrackerManager from '../service/MoodTrackerManager';
import navigationService from '../service/navigationService';
import { bindData } from '../hocs/bindData';
import StarRating from 'react-native-star-rating';
import moment from 'moment';
import guid from '../helpers/guid';
import commonColor from '../native-base-theme/variables/commonColor';

export class MoodEntryComponent extends Component {
    static MOOD_ID_ARG = 'mood_id'
    static navigationOptions = {
        title: 'Edit Mood'
    };

    constructor(props) {
        super(props);
        const { moods, navigation: { getParam } } = props;
        const defaultId = guid();
        const mood =
            moods.find(m => m.id === getParam(MoodEntryComponent.MOOD_ID_ARG, defaultId)) ||
            {
                id: defaultId,
                value: 4,
                date: moment().toISOString()
            }

        this.state = {
            mood,
            initialMood: mood
        }
    }

    render() {
        const { mood } = this.state;

        return (
            <Container style={{ padding: 15, flex: 1 }}>
                <View flex={1}>
                    <H2>
                        {MoodTrackerManager.getMoodText(mood.value)}
                    </H2>
                    <StarRating
                        disabled={false}
                        maxStars={5}
                        containerStyle={{ width: 300, marginTop: 10 }}
                        rating={mood.value}
                        fullStarColor={commonColor.brandDanger}
                        emptyStarColor={commonColor.brandDanger}
                        selectedStar={(value) => this.setState({ mood: { ...mood, value } })}
                    />
                    <DatePicker
                        defaultDate={moment(mood.date).toDate()}
                        formatChosenDate={(date) => MoodTrackerManager.getMoodDateText(date)}
                        locale={"en"}
                        textStyle={{
                            padding: 5, marginTop: 10, borderRadius: 4,
                            borderWidth: 0.5,
                        }}
                        onDateChange={date => this.setState({ mood: { ...mood, date: moment(date).toISOString() } })}
                    />
                    <Textarea
                        placeholder="Notes"
                        value={mood.notes}
                        onChangeText={notes => this.setState({ mood: { ...mood, notes } })}
                        bordered
                        style={{ marginTop: 10 }} />
                </View>

                <View style={{ flexDirection: 'row', flex: 0, justifyContent: 'space-between' }}>
                    <Button

                        style={{ backgroundColor: commonColor.brandDanger }}
                        onPress={() => {
                            MoodTrackerManager.deleteMood(mood.id).then(() => {
                                navigationService.goBack();
                            })
                        }}>
                        <Text>Delete</Text>
                    </Button>

                    <Button
                        style={{ backgroundColor: commonColor.brandLight }}
                        onPress={() => {
                            MoodTrackerManager.saveMood(mood).then(() => {
                                navigationService.goBack();
                            })
                        }}>
                        <Text style={{color: commonColor.textColor}}>Save</Text>
                    </Button>
                </View>
            </Container>
        );
    }
}

export default bindData(MoodEntryComponent);