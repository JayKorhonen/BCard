import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const iconMap = {
    QRCode: 'qrcode',
    Profile: 'account-card-details-outline',
    scannerFlow: 'qrcode-scan',
    Wallet: 'cards-variant'
};

const TabButton = ({onPress, routeName, style, focused}) => {
    return (
            <TouchableOpacity onPress={onPress} style={[...style, {justifyContent: 'center', alignItems: 'center'}]}>
                <MaterialCommunityIcons name={iconMap[routeName]} size={50} color={focused? 'white' : 'black'} />
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