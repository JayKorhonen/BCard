import React, {useContext, useState, useEffect} from 'react';
import { TextInput, Text, View, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'
import {STYLES} from '../Styles/styles';
import {COLORS} from '../Styles/colors';
import { Formik } from 'formik';
import {ProfileContext, FIELDS} from '../Context/ProfileContext';
import Swiper from 'react-native-swiper';

export const ProfileForm = () => {
    const {loading, data, setData} = useContext(ProfileContext);
    const [update, setUpdate] = useState(data);

    useEffect(() => {
        while(loading){
            continue;
        };
    })
    
    const save = async () => {
        try {
            await AsyncStorage.setItem(
                'BCardProfile',
                JSON.stringify(update, null, 2)
            );
            setData(update);
        } catch (error) {
            alert(error);
        }
    };

    const saveUpdate = (k, v) => {
        let newData = {...update};
        newData[k] = v;
        setUpdate(newData);
    }

    return (
        <View>
        <Swiper loop={false} activeDotColor={COLORS.primary}>
            {
                Object.entries(FIELDS['Card Info']).map(([section, fields]) => {
                    return (
                        <View key={section} testId={section} style={STYLES.slide}>
                            <View style={STYLES.card}>
                                <Text style={STYLES.header}>{section}</Text>
                            </View>
                            {
                                Object.entries(fields).map(([k, v]) => {
                                    return (
                                        <View key={k} style={[STYLES.textInput, {paddingHorizontal: 100}]}>
                                            <TextInput
                                                style={{fontSize: 18}}
                                                onChangeText={(text) => saveUpdate(k, text)}
                                                placeholder={data[k]? data[k] : v}
                                            />
                                        </View>
                                    )
                                })
                            }
                        </View>
                    )
                })
            }
        </Swiper>
        <TouchableOpacity style={[STYLES.button, STYLES.buttonPrimary, STYLES.save, {marginBottom: 50}]} onPress={save}>
            <Text style={STYLES.buttonText}>Save</Text>
        </TouchableOpacity>
        </View>
    );
};
var styles = {
  slide1: {
    flex: 1,
  },
  slide2: {
    flex: 1,
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9'
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  }
}