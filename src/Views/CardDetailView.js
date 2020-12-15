import React, {useContext, useState, useEffect} from 'react';
import { TextInput, Text, View, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import {STYLES} from '../Styles/styles';
import {COLORS} from '../Styles/colors';
import { Formik } from 'formik';
import {ProfileContext, FIELDS} from '../Context/ProfileContext';
import Swiper from 'react-native-swiper';
import { withNavigation } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';

const summaryFields = {
    firstName: 'icon',
    lastName: 'icon',
    name: 'person',
    email: 'email',
    phone: 'phone',
    company: 'work'
};

const CardDetailView = ({navigation}) => {
    const index = navigation.getParam('index');
    const {cards} = useContext(ProfileContext);
    const card = cards[index];

    return (
        <View style={{flex: 1}}>
            <TouchableOpacity onPress={() => navigation.navigate('Wallet')} style={[STYLES.backButtonContainer]}>
                <Ionicons name="ios-arrow-back" size={24} color={COLORS.primary} />
                <Text style={[STYLES.backButton]}> Back</Text>
            </TouchableOpacity>
            <Swiper loop={false} activeDotColor={COLORS.primary}>
            {
                Object.entries(FIELDS).map(([category, page]) => {
                    return Object.entries(page).map(([section, fields]) => {
                        return (
                            <View key={section} testId={section}>
                                <View style={[STYLES.card, {marginTop: 0}]}>
                                    <Text style={STYLES.header}>{section}</Text>
                                </View>
                                {
                                    Object.keys(fields).map((k) => {
                                        return (
                                            <View key={k} style={[{marginHorizontal: 30, marginBottom: 5, paddingVertical: 5, borderBottomColor: 'grey', borderBottomWidth: 1, flexDirection: 'row', justifyContent: 'space-between'}]}>
                                                <Text style={{fontSize: 18, color: 'black'}}>
                                                    {FIELDS[category][section][k]}: 
                                                </Text>
                                                <Text style={{fontSize: 18, color: 'black'}}>
                                                    {card[k] !== FIELDS[category][section][k]? card[k] : null}
                                                </Text>
                                            </View>
                                        )
                                    })
                                }
                            </View>
                        )
                    })
                })
            }
            </Swiper>
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

export default withNavigation(CardDetailView);