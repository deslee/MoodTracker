import React, { Component } from 'react';
import { Text, View } from 'native-base';
import MoodTrackerManager from '../service/MoodTrackerManager';
import { TouchableOpacity } from 'react-native';
import DateTimePickerComponent from 'react-native-modal-datetime-picker';

const ClickableText = ({ children, onPress = () => {} }) => {
    return (
        <TouchableOpacity onPress={onPress} style={{borderBottomWidth: 1}}>
            <Text>{children}</Text>
        </TouchableOpacity>
    )
}

export default class DateTimePicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            datePickerVisible: false,
            timePickerVisible: false
        }
    }
    render() {
        const { textStyle = {}, onDateChange = () => {}, date } = this.props;

        return <View style={{ ...textStyle }}>
            <View style={{flexDirection: 'row'}}>
                <ClickableText onPress={() => this.setState({datePickerVisible: false, timePickerVisible: true})}>{MoodTrackerManager.getMoodTimeText(date)}</ClickableText>
                <Text> on </Text>
                <ClickableText onPress={() => this.setState({datePickerVisible: true, timePickerVisible: false})}>{MoodTrackerManager.getMoodDateText(date)}</ClickableText>
            </View>
            <DateTimePickerComponent
                mode="date"
                isVisible={this.state.datePickerVisible}
                date={date}
                onConfirm={(date) => {
                    this.setState({datePickerVisible: false, timePickerVisible: false});
                    onDateChange(date);
                }}
                onCancel={() => this.setState({datePickerVisible: false, timePickerVisible: false})}
            />
            <DateTimePickerComponent
                mode="time"
                titleIOS="Pick a time"
                isVisible={this.state.timePickerVisible}
                date={date}
                is24Hour={false}
                onConfirm={(date) => {
                    this.setState({datePickerVisible: false, timePickerVisible: false});
                    onDateChange(date);
                }}
                onCancel={() => this.setState({datePickerVisible: false, timePickerVisible: false})}
            />
        </View>
    }
}