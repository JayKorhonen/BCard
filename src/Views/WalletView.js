import React from 'react';
import { View, Text } from 'react-native';
import Wallet from '../Components/Wallet';
import { STYLES } from '../Styles/styles';

const WalletView = () => {
    return (
        <View style={STYLES.container}>
            <View style={STYLES.card}>
                <Text style={STYLES.header}>Wallet</Text>
            </View>
            <View style={STYLES.fullCard}>
                <Wallet/>
            </View>
        </View>
    )
};

export default WalletView;