import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {ProfileForm} from '../Components/ProfileForm';
import {STYLES} from '../Styles/styles';

const ProfileView = () => {
    return (
        <View style={STYLES.container}>
            <View style={[STYLES.card]}>
                <Text style={STYLES.header}>Profile</Text>
            </View>
            <View style={[STYLES.fullCard]}>
                <ProfileForm/>
            </View>
        </View>
    )
}

export default ProfileView;