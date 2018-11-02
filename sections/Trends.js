import React, { Component } from 'react';
import { View } from 'native-base';
import { YAxis, XAxis, LineChart, Grid } from 'react-native-svg-charts'
import MoodTrackerManager from '../service/MoodTrackerManager';
import moment from 'moment';

export default class Trends extends Component {
    render() {
        const { moods } = this.props;

        const aggregate = moods.slice().reverse().reduce((acc, mood) => {
            const date = moment(mood.date).format('MM/DD/YYYY');
            if (!acc[date]) {
                acc[date] = []
            }
            acc[date].push(mood.value);
            return acc;
        }, {});

        const dates = Object.keys(aggregate).map(d => moment(d, "MM/DD/YYYY").toDate().getTime());

        const data = Object.keys(aggregate).map(date => {
            const values = aggregate[date];
            return values.reduce((a, b) => a+b, 0) / values.length;
        })

        // const data = moods.reverse().map(mood => Number(mood.value));
        //const data = [50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80]

        const axesSvg = { fontSize: 10, fill: 'grey' };
        const verticalContentInset = { top: 10, bottom: 10 }
        const xAxisHeight = 30

        // Layout of an x-axis together with a y-axis is a problem that stems from flexbox.
        // All react-native-svg-charts components support full flexbox and therefore all
        // layout problems should be approached with the mindset "how would I layout regular Views with flex in this way".
        // In order for us to align the axes correctly we must know the height of the x-axis or the width of the x-axis
        // and then displace the other axis with just as many pixels. Simple but manual.

        return (
            <View style={{ height: 200, padding: 20, flexDirection: 'row' }}>
                <YAxis
                    data={data}
                    min={1}
                    max={5}
                    style={{ marginBottom: xAxisHeight }}
                    contentInset={verticalContentInset}
                    svg={axesSvg}
                />
                <View style={{ flex: 1, marginLeft: 10 }}>
                    <LineChart
                        style={{ flex: 1 }}
                        data={data}
                        contentInset={verticalContentInset}
                        svg={{ stroke: 'rgb(134, 65, 244)' }}
                    >
                        <Grid />
                    </LineChart>
                    <XAxis
                        style={{ marginHorizontal: -10, height: xAxisHeight }}
                        data={dates}
                        formatLabel={idx => moment(dates[idx]).format('MM/DD')}
                        contentInset={{ left: 10, right: 10 }}
                        svg={axesSvg}
                    />
                </View>
            </View>
        )
    }
}