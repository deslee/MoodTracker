import React from 'react';
import MoodTrackerManager from '../service/MoodTrackerManager';
import { Text } from 'native-base';

export const bindData = (BoundComponent) => {
    class Wrapper extends React.Component {
        state = {
            data: undefined
        }

        componentDidMount() {
            this.update();
            this.removeObserver = MoodTrackerManager.addObserver(() => {
                this.update();
            })
        }

        componentWillUnmount() {
            if (this.removeObserver) {
                this.removeObserver();
            }
        }

        update = () => {
            MoodTrackerManager.getAllMoods().then(moods => this.setState({
                data: {
                    moods
                }
            }));
        }

        render() {
            return this.state.data ?
                <BoundComponent {...this.state.data} {...this.props} /> :
                <Text>Loading</Text>
        }
    }

    if (BoundComponent.navigationOptions) {
        Wrapper.navigationOptions = BoundComponent.navigationOptions;
    }

    return Wrapper;
}