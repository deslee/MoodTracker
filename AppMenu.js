import React from 'react';
import navigationService from './service/navigationService';
import { Icon, View } from 'native-base';
import Menu, { MenuItem } from 'react-native-material-menu';

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
        navigationService.navigate('Settings')
    }

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Menu
                    ref={this.setMenuRef}
                    button={<Icon style={{ padding: 10 }} onPress={this.showMenu} name="more" />}
                >
                    <MenuItem onPress={this.settingsPressed}>Settings</MenuItem>
                </Menu>
            </View>
        );
    }
}