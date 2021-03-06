import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {ProfileForm} from '../Components/ProfileForm';
import {STYLES} from '../Styles/styles';

const ProfileView = () => {
    return (
        <View style={STYLES.container}>
            <ProfileForm/>
        </View>
    )
}

export default ProfileView;