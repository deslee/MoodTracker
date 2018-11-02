import React, { Component } from 'react';
import { Container, Icon, Tabs, Tab, Fab } from 'native-base';
import MoodLog from '../sections/MoodLog';
import AppMenu from '../AppMenu';
import { bindData } from '../hocs/bindData';
import Trends from '../sections/Trends';
import commonColor from '../native-base-theme/variables/commonColor';
import { MoodEntryComponent } from './MoodEntry';

export class HomeScreenComponent extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Moodtracker',
        headerStyle: {
            backgroundColor: commonColor.btnPrimaryBg,
            elevation: 0
        },
        headerRight: <AppMenu navigation={navigation} />
    });

    state = {
        showAddMoodButton: true
    }

    tabChanged = ({ i }) => {
        this.setState({
            showFab: i === 0
        })
    }

    componentDidMount() {
        const { navigation: { setParams } } = this.props;
    }

    render() {
        const { moods, navigation: { navigate } } = this.props;
        const { showAddMoodButton } = this.state
        return (
            <Container>
                <Tabs onChangeTab={this.tabChanged}>
                    <Tab heading="Log">
                        <MoodLog moods={moods} onSelectMood={(id) => navigate('MoodEntry', { [MoodEntryComponent.MOOD_ID_ARG]: id })} />
                    </Tab>
                    <Tab heading="Trends">
                        <Trends moods={moods} />
                    </Tab>
                </Tabs>
                {showAddMoodButton && <Fab
                    onPress={() => navigate('MoodEntry')}
                    style={{ backgroundColor: commonColor.brandDanger }}>
                    <Icon name="add" />
                </Fab>}
            </Container>
        );
    }
}

export default bindData(HomeScreenComponent);