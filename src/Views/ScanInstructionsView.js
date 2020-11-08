import React, {useEffect, useState} from 'react';
import {View, Text, Button, Dimensions, StyleSheet, TouchableOpacity} from 'react-native';
import {BarCodeScanner, BarCodeScannerResult} from 'expo-barcode-scanner';
import BarcodeMask from 'react-native-barcode-mask';
import {STYLES} from '../Styles/styles';

const finderWidth = 280;
const finderHeight = 230;
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const viewMinX = (width - finderWidth) / 2;
const viewMinY = (height - finderHeight) / 2;

const ScanInstructionsView = ({navigation}) => {
    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(BarCodeScanner.Constants.Type.back);
    const [scanned, setScanned] = useState(false);
    
    return (
        <View style={STYLES.container}>
            <View style={STYLES.card}>
                <Text style={STYLES.header}>BCard Scanner</Text>
            </View>
            <View style={STYLES.fullCard}>
            <View style={STYLES.instructionsContainer}>
                <Text style={STYLES.bodyHeader}>Scanner Instructions</Text>
                <Text style={[STYLES.bodyText]}>{`When a BCard Code is scanned, it is automatically added to your wallet!`}</Text>
                <Text style={[STYLES.bodyText, {fontWeight: 'bold'}]}>{"To remove the card:"}</Text>
                <Text style={[STYLES.bodyText]}>{`1) Navigate to the wallet tab\n2) Scroll through and find the card you wish to discard\n3) Click on it to view the card's details\n4) Select 'Remove'`}</Text>
            </View>
            <TouchableOpacity style={[STYLES.button, STYLES.buttonPrimary, styles.scan]} onPress={() => navigation.navigate('QRCodeScan')}>
                <Text style={STYLES.buttonText}>Scan Now</Text>
            </TouchableOpacity>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderColor: 'white',
        borderWidth: 5,
        borderRadius: 15
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
    scan: {
        marginHorizontal: 75,
        marginBottom: 30,
        alignItems: 'center'
    }
});

export default ScanInstructionsView;