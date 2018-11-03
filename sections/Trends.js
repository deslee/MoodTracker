import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { View } from 'native-base';
import { YAxis, XAxis, LineChart, Grid, StackedAreaChart } from 'react-native-svg-charts'
import MoodTrackerManager from '../service/MoodTrackerManager';
import moment from 'moment';
import * as shape from 'd3-shape'

export default class Trends extends Component {
    render() {
        const { moods } = this.props;

        // group the mood entries by days
        const aggregate = moods.slice().reverse().reduce((acc, mood) => {
            const date = moment(mood.date).format('MM/DD/YYYY');
            if (!acc[date]) {
                acc[date] = []
            }
            acc[date].push(mood);
            return acc;
        }, {});

        const data = Object.keys(aggregate).map(d => ({
            day: moment(d, 'MM/DD/YYYY'),
            mood: aggregate[d].map(m => m.value).reduce((a, b) => a + b, 0) / aggregate[d].length
        }))

        const colors = ['#D81B60']
        const keys = ['mood']
        const svgs = [
            { onPress: () => console.log('mood') },
        ]

        return (
            <ScrollView horizontal>
                <StackedAreaChart
                    style={{ width: 1000, paddingVertical: 16 }}
                    data={data}
                    keys={keys}
                    colors={colors}
                    curve={shape.curveNatural}
                    showGrid={true}
                    svgs={svgs}
                />
            </ScrollView>
        )
    }
}