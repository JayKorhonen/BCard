import React, { useContext } from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {STYLES} from '../Styles/styles';
import QRCode from 'react-native-qrcode-generator';
import {ProfileContext} from '../Context/ProfileContext';
const QRCodeView = () => {
    const {data} = useContext(ProfileContext);
    let {width, height} = Dimensions.get('window');
    
    return (
        <>
        <View style={STYLES.container}>
            <View style={STYLES.card}>
                <Text style={STYLES.header}>QR Code</Text>
            </View>
            <View style={[STYLES.fullCard, styles.code]}>
                <QRCode
                    value={JSON.stringify({BCard: data})}
                    size={width-75}
                    bgColor='black'
                    fgColor='white'/>
            </View>
        </View>
        </>
    )
};

const styles = StyleSheet.create({
    code: {
        alignItems: 'center',
        paddingVertical: 50
    }
});

export default QRCodeView;