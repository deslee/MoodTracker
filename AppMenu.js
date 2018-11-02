import React from 'react';
import { Icon, View } from 'native-base';
import Menu, { MenuItem } from 'react-native-material-menu';
import commonColor from './native-base-theme/variables/commonColor';

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
        const { navigation: { navigate } } = this.props;
        this.hideMenu();
        navigate('Settings')
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