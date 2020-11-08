import React, {useEffect, useState, useContext} from 'react';
import {View, Text, Button, Dimensions, StyleSheet, TouchableOpacity} from 'react-native';
import {BarCodeScanner, BarCodeScannerResult} from 'expo-barcode-scanner';
import BarcodeMask from 'react-native-barcode-mask';
import {STYLES} from '../Styles/styles';
import { withNavigation } from 'react-navigation';
import {ProfileContext} from '../Context/ProfileContext';

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

    const {addCard} = useContext(ProfileContext);

    useEffect(() => {
        (async () => {
            const {status} = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const handleBarCodeScanned = (scanningResult) => {
        if (!scanned) {
            const {type, data, bounds: {origin} = {}} = scanningResult;
            const {x, y} = origin;
            if (x >= viewMinX && y >= viewMinY && x <= (viewMinX + finderWidth / 2) && y <= (viewMinY + finderHeight / 2)) {
                setScanned(true);
                let scannedCard;
                try {
                    scannedCard = JSON.parse(data);
                } catch (error) {
                    alert('This is not a recognised BCard code!');
                    return;
                }

                if(!scannedCard.BCard) {
                    alert('This is not a recognised BCard code!');
                    return;
                }

                addCard(scannedCard.BCard);
                alert(`${scannedCard.BCard.firstName}'s BCard has been added to your wallet!`);
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
                <View style={{flex: 1}}>
                <TouchableOpacity style={styles.back} onPress={() => navigation.navigate('ScanInstructions')}>
                    <Text style={{color: 'blue', fontSize: 24}}>Back</Text>
                </TouchableOpacity>
                {
                    scanned &&
                    <TouchableOpacity style={styles.scanAgain} onPress={() => setScanned(false)}>
                        <Text style={{color: 'blue', fontSize: 24}}>Scan Again</Text>
                    </TouchableOpacity>
                }
                    <BarCodeScanner
                        onBarCodeScanned={handleBarCodeScanned}
                        type={type}
                        barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
                        style={[styles.container]}>
                        <BarcodeMask edgeColor="#62B1F6" showAnimatedLine={false} height="50%"/>
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
    },
    back: {
        position: 'absolute',
        alignSelf: 'flex-start',
        marginTop: 35,
        marginLeft: 10,
        zIndex: 1
    },
    scanAgain: {
        top: '48%',
        position: 'absolute',
        alignSelf: 'center',
        zIndex: 1
    }
});

export default withNavigation(QRCodeScanView);