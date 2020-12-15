import React from 'react';
import { View, Text } from 'react-native';
import Wallet from '../Components/Wallet';
import { STYLES } from '../Styles/styles';

const WalletView = () => {
    return (
        <View style={STYLES.container}>
            <View style={{marginBottom: 25}}>
                <Wallet/>
            </View>
        </View>
    )
};

export default WalletView;