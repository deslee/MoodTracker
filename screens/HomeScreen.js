import React, { Component } from 'react';
import { Container, Icon, Tabs, Tab, Fab } from 'native-base';
import MoodLog from '../sections/MoodLog';
import AppMenu from '../AppMenu';
import { bindData } from '../hocs/bindData';
import Trends from '../sections/Trends';
import commonColor from '../native-base-theme/variables/commonColor';
import PushNotification from 'react-native-push-notification'
import { PushNotificationIOS } from 'react-native';
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
        tabIndex: 0
    }

    tabChanged = ({ i }) => {
        this.setState({
            tabIndex: 1
        })
    }

    componentDidMount() {
        const { navigation: { navigate } } = this.props;



        PushNotification.configure({
            // (optional) Called when Token is generated (iOS and Android)
            onRegister: function (token) {
                // console.log( 'TOKEN:', token );
            },

            // (required) Called when a remote or local notification is opened or received
            onNotification: function (notification) {
                // console.log('NOTIFICATION:', notification);

                // process the notification

                if (notification.message === 'Time to log an entry for today.') {
                    navigate('MoodEntry')
                }

                // required on iOS only (see fetchCompletionHandler docs: https://facebook.github.io/react-native/docs/pushnotificationios.html)
                notification.finish(PushNotificationIOS.FetchResult.NoData);
            },
            popInitialNotification: true
        })
    }

    render() {
        const { moods, navigation: { navigate } } = this.props;
        const { tabIndex } = this.state
        return (
            <Container>
                <Tabs locked={tabIndex === 1} onChangeTab={this.tabChanged}>
                    <Tab heading="Log">
                        <MoodLog moods={moods} onSelectMood={(id) => navigate('MoodEntry', { [MoodEntryComponent.MOOD_ID_ARG]: id })} />
                    </Tab>
                    <Tab heading="Trends">
                        <Trends moods={moods} />
                    </Tab>
                </Tabs>
                {tabIndex === 0 && <Fab
                    onPress={() => navigate('MoodEntry')}
                    style={{ backgroundColor: commonColor.brandDanger }}>
                    <Icon name="add" />
                </Fab>}
            </Container>
        );
    }
}

export default bindData(HomeScreenComponent);