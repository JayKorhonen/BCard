import React from 'react';
import { View, Text } from 'react-native';
import { withNavigation } from 'react-navigation';
import { STYLES } from '../Styles/styles';
import { COLORS } from '../Styles/colors';
import { ListItem, Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';

const SettingsView = ({navigation}) => {
    let firstLaunch = navigation.getParam('firstLaunch');

    if(firstLaunch) {
        navigation.navigate('Profile');
    }

    return (
        <>
            <View style={{flex: 1}}>
                <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                    <ListItem bottomDivider>
                        <Icon name='user' type='font-awesome' color={COLORS.primary} />
                        <ListItem.Content>
                        <ListItem.Title>Profile</ListItem.Title>
                        </ListItem.Content>
                        <ListItem.Chevron />
                    </ListItem>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Contact')}>
                    <ListItem bottomDivider>
                        <Icon name='phone' type='font-awesome' color={COLORS.primary} />
                        <ListItem.Content>
                        <ListItem.Title>Contact Us</ListItem.Title>
                        </ListItem.Content>
                        <ListItem.Chevron />
                    </ListItem>
                </TouchableOpacity>
                {/* <TouchableOpacity onPress={() => navigation.navigate('About')}>
                    <ListItem bottomDivider>
                        <Icon name='group' type='materialicon' color={COLORS.primary} />
                        <ListItem.Content>
                        <ListItem.Title>About Us</ListItem.Title>
                        </ListItem.Content>
                        <ListItem.Chevron />
                    </ListItem>
                </TouchableOpacity> */}
            </View>
        </>
    )
};

export default withNavigation(SettingsView);