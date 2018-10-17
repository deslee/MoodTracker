import React, { Component } from 'react';
import { Container, Icon, Tabs, Tab, Fab } from 'native-base';
import MoodLog from '../sections/MoodLog';
import AppMenu from '../AppMenu';
import { bindData } from '../hocs/bindData';
import navigationService from '../service/navigationService';
import Trends from '../sections/Trends';
import commonColor from '../native-base-theme/variables/commonColor';

export class HomeScreenComponent extends Component {
    static navigationOptions = {
        title: 'Moodtracker',
        headerRight: (
            <AppMenu />
        ),
        headerStyle: {
            backgroundColor: commonColor.btnPrimaryBg,
            elevation: 0
        }
    };

    state = {
        showAddMoodButton: true
    }

    tabChanged = ({ i }) => {
        this.setState({
            showFab: i === 0
        })
    }

    render() {
        const { moods } = this.props;
        const { showAddMoodButton } = this.state
        return (
            <Container>
                <Tabs onChangeTab={this.tabChanged}>
                    <Tab heading="Log">
                        <MoodLog moods={moods} />
                    </Tab>
                    <Tab heading="Trends">
                        <Trends moods={moods} />
                    </Tab>
                </Tabs>
                {showAddMoodButton && <Fab
                    onPress={() => navigationService.navigate('MoodEntry')}
                    style={{ backgroundColor: commonColor.brandDanger }}>
                    <Icon name="add" />
                </Fab>}
            </Container>
        );
    }
}

export default bindData(HomeScreenComponent);