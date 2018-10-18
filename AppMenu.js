import React from 'react';
import navigationService from './service/navigationService';
import { Icon, View } from 'native-base';
import Menu, { MenuItem } from 'react-native-material-menu';
import commonColor from './native-base-theme/variables/commonColor';
import { NativeModules } from 'react-native';


export default class AppMenu extends React.Component {
    _menu = null;

    setMenuRef = ref => {
        this._menu = ref;
    };

    hideMenu = () => {
        this._menu.hide();
    };

    showMenu = () => {
        this._menu.show();
    };

    settingsPressed = () => {
        this.hideMenu();
        NativeModules.CustomNotification.showReminderNotification('oshit', 'hey boi!!!')
        navigationService.navigate('Settings')
    }

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Menu
                    ref={this.setMenuRef}
                    button={<Icon style={{ padding: 10, color: commonColor.inverseTextColor }} onPress={this.showMenu} name="more" />}
                >
                    <MenuItem onPress={this.settingsPressed}>Settings</MenuItem>
                </Menu>
            </View>
        );
    }
}