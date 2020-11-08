import React, {useEffect, useState} from 'react';
import {View, Text, Button, Dimensions, StyleSheet, TouchableOpacity} from 'react-native';
import {BarCodeScanner, BarCodeScannerResult} from 'expo-barcode-scanner';
import BarcodeMask from 'react-native-barcode-mask';
import {STYLES} from '../Styles/styles';
import { withNavigation } from 'react-navigation';

const finderWidth = 280;
const finderHeight = 230;
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const viewMinX = (width - finderWidth) / 2;
const viewMinY = (height - finderHeight) / 2;

const QRCodeScanView = ({navigation}) => {
    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(BarCodeScanner.Constants.Type.back);
    const [scanned, setScanned] = useState(false);

    useEffect(() => {
        (async () => {
            const {status} = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const handleBarCodeScanned = (scanningResult) => {
        if (!scanned) {
            const {type, data, bounds: {origin} = {}} = scanningResult;
            // @ts-ignore
            const {x, y} = origin;
            if (x >= viewMinX && y >= viewMinY && x <= (viewMinX + finderWidth / 2) && y <= (viewMinY + finderHeight / 2)) {
                setScanned(true);
                alert(`Bar code with type ${type} and data ${data} has been scanned!`);
            }
        }
    };

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }
    
    return (
        // <View style={STYLES.container}>
                <View style={{flex: 1, padding: 5, marginTop: 15}}>
                    <BarCodeScanner
                        onBarCodeScanned={handleBarCodeScanned}
                        type={type}
                        barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
                        style={[styles.container]}>
                        <BarcodeMask edgeColor="#62B1F6" showAnimatedLine={false} height="50%"/>
                        <TouchableOpacity onPress={() => navigation}>Back</TouchableOpacity>
                        {scanned && <Button title="Scan Again" onPress={() => setScanned(false)}/>}
                    </BarCodeScanner>
                </View>
        // </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    }
});

export default withNavigation(QRCodeScanView);