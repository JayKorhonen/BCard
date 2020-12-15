import React, { useContext, useEffect } from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import { withNavigation } from 'react-navigation';
import {STYLES} from '../Styles/styles';
import QRCode from 'react-native-qrcode-generator';
import {ProfileContext, FIELDS} from '../Context/ProfileContext';
import AsyncStorage from '@react-native-community/async-storage';
import { MaterialIcons } from '@expo/vector-icons';
import { COLORS } from '../Styles/colors';

const summaryFields = {
    firstName: 'icon',
    lastName: 'icon',
    name: 'person',
    email: 'email',
    phone: 'phone',
    company: 'work'
};

const QRCodeView = () => {
    const {data} = useContext(ProfileContext);
    let {width, height} = Dimensions.get('window');
    
    const reducedData = Object.entries(FIELDS['Card Info']['Personal Info']).reduce((a, [k, v]) => {
        if(!summaryFields[k]) return a;
        if(k === 'firstName') {
            a.name.first = data.firstName? data.firstName : v;
        } else if(k === 'lastName') {
            a.name.last = data.lastName? data.lastName : v;
        } else if(k === 'phone') {
            a.phone = `(${data.phone?.slice(0, 3)}) ${data.phone?.slice(3, 6)}-${data.phone?.slice(6, 11)}`;
        } else if(k === 'email') {
            a.email = data.email?.toLowerCase();
        } else {
            a[k] = data[k]? data[k] : v;
        }

        return a;
    }, {name: {}});

    reducedData.name = reducedData.name.first + " " + reducedData.name.last;
    
    return (
        <>
        <View style={STYLES.container}>
            <View style={[STYLES.qrBorder, {width: width-150, marginTop: 50, height: height/3}]}>
                <View style={{
                    top: -2,
                    left: -2,
                    alignItems: 'center',
                    height: height/3,
                    width: width-150,
                    backgroundColor: 'white',
                    borderRadius: 35
                }}>
                    <View style={styles.code}>
                        <QRCode
                            value={JSON.stringify({BCard: data}, null, 2)}
                            size={width-200}
                            bgColor="#474747"
                            fgColor='white'/>
                    </View>
                </View>
            </View>
            <View style={[STYLES.summary, {width: width-100, marginTop: 25}]}>
                {
                    Object.entries(reducedData).map(([k, v]) => {
                        return (
                            <View key={k} style={{flexDirection: 'row', alignItems: 'center', marginLeft: 25, marginTop: 15}}>
                                <MaterialIcons name={summaryFields[k]} size={35} color={COLORS.primary} />
                                <View style={{marginLeft: 25}}>
                                    <Text style={{fontSize: 18, color: COLORS.grey}}>{v}</Text>
                                </View>
                            </View>
                        )
                    })
                }
            </View>
        </View>
        </>
    )
};

const styles = StyleSheet.create({
    code: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    }
});

export default withNavigation(QRCodeView);