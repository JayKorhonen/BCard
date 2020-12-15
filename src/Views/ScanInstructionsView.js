import React, {useEffect, useState} from 'react';
import {View, Text, Button, Dimensions, StyleSheet, TouchableOpacity} from 'react-native';
import {BarCodeScanner, BarCodeScannerResult} from 'expo-barcode-scanner';
import {STYLES} from '../Styles/styles';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS } from '../Styles/colors';

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
            <TouchableOpacity
                onPress={() => navigation.navigate('Scan')}
            >
                <View style={[STYLES.buttonHeader, {marginBottom: 100}]}>
                    <View style={styles.camera}>
                        <MaterialCommunityIcons name="camera-outline" size={50} color='white' />
                    </View>
                </View>
                <View>
                    <View style={STYLES.instructionsContainer}>
                        <Text style={[STYLES.bodyHeader]}>Tap to scan someone's business card or code. You can always view or delete cards in your wallet later.</Text>
                    </View>
                </View>
            </TouchableOpacity>
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
        marginTop: 50,
        alignItems: 'center'
    },
    camera: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.primary,
        marginHorizontal: 135,
        borderRadius: 20,
        paddingVertical: 5
    }
});

export default ScanInstructionsView;