import React, { Component } from 'react';
import { Container, Text, Button, H2, DatePicker, Textarea, View } from 'native-base';
import MoodTrackerManager from '../service/MoodTrackerManager';
import { bindData } from '../hocs/bindData';
import StarRating from 'react-native-star-rating';
import moment from 'moment';
import guid from '../helpers/guid';
import commonColor from '../native-base-theme/variables/commonColor';
import DateTimePicker from '../components/DateTimePicker';

export class MoodEntryComponent extends Component {
    static MOOD_ID_ARG = 'mood_id'
    static navigationOptions = {
        title: 'Edit Mood'
    };

    _saveTimerId = undefined;
    shouldUpdateState = true;

    constructor(props) {
        super(props);
        const { moods, navigation: { getParam } } = props;
        const defaultId = guid();
        const foundMood =
            moods.find(m => m.id === getParam(MoodEntryComponent.MOOD_ID_ARG, defaultId))
            
        const mood = foundMood || {
            id: defaultId,
            value: 4,
            date: moment().toISOString()
        };

        this.state = {
            mood,
            lastSavedMood: foundMood,
            initialMood: mood
        }
    }

    componentDidMount() {
        this._saveTimerId = setInterval(this.saveChangesIfNeeded, 500)
    }

    componentWillUnmount() {
        this.shouldUpdateState = false;
        this.saveChangesIfNeeded();
        if (this._saveTimerId) {
            clearInterval(this._saveTimerId);
            this._saveTimerId = undefined;
        }
    }

    saveChangesIfNeeded = () => {
        const { lastSavedMood, mood } = this.state
        if(JSON.stringify(lastSavedMood) === JSON.stringify(mood)) {
            return
        } else {
            this.saveMood();
        }
    }

    saveMood = () => {
        const { mood } = this.state
        MoodTrackerManager.saveMood(mood).then(() => {
            if (this.shouldUpdateState) {
                this.setState({lastSavedMood: mood})
            }
        })
    }

    render() {
        const { navigation: { goBack } } = this.props;
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
                    <DateTimePicker
                        textStyle={{
                            marginTop: 10
                        }}
                        date={moment(mood.date).toDate()}
                        onDateChange={date => this.setState({ mood: { ...mood, date: moment(date).toISOString() } })}
                    />
                    {/* <DatePicker
                        defaultDate={moment(mood.date).toDate()}
                        formatChosenDate={(date) => `${MoodTrackerManager.getMoodTimeText(date)} on ${MoodTrackerManager.getMoodDateText(date)}`}
                        locale={"en"}
                        textStyle={{
                            padding: 5, marginTop: 10, borderRadius: 4,
                            borderWidth: 0.5,
                        }}
                        onDateChange={date => this.setState({ mood: { ...mood, date: moment(date).toISOString() } })}
                    /> */}
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
                                goBack();
                            })
                        }}>
                        <Text>Delete</Text>
                    </Button>
                </View>
            </Container>
        );
    }
}

export default bindData(MoodEntryComponent);