import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {COLORS} from '../Styles/colors';

const iconMap = {
    QRCode: 'account-card-details-outline',
    scannerFlow: 'camera',
    walletFlow: 'cards-variant',
    settingsFlow: 'settings',
};

const TabButton = ({onPress, routeName, style, focused}) => {
    return (
            <TouchableOpacity onPress={onPress} style={[...style, {justifyContent: 'center', alignItems: 'center'}]}>
                <MaterialCommunityIcons name={iconMap[routeName]} size={37} color={focused? COLORS.primary : 'white'} />
            </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    item: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default TabButton;