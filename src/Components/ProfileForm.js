import React, {useContext} from 'react';
import { Button, TextInput, Text, View, TouchableOpacity, StyleSheet, AsyncStorage, ScrollView } from 'react-native';
import {STYLES} from '../Styles/styles';
import {COLORS} from '../Styles/colors';
import { Formik, Field, Form } from 'formik';
import {ProfileContext} from '../Context/ProfileContext';

export const ProfileForm = () => {
    const {data, setData} = useContext(ProfileContext);

    const fields = {
        firstName: 'First Name',
        lastName: 'Last Name',
        email: 'Email',
        phone: 'Phone Number',
        company: 'Company Name'
    }
    
    return (
        <View style={STYLES.form}>
        <ScrollView>
            <Formik
                initialValues={fields}
                onSubmit={async (values) => {
                    let savedData = Object.keys(values).reduce((a, k, v) => {
                        if(values[k] !== fields[k]) {
                            a[k] = values[k];
                        } else if(data[k]) {
                            a[k] = data[k];
                        }

                        return a;
                    }, {});

                    try {

                        await AsyncStorage.setItem(
                            'BCardProfile',
                            JSON.stringify(savedData, null, 2)
                        );
                        setData(savedData);
                    } catch (error) {
                        alert(error);
                    }
                }}
            >
            {({ handleChange, handleBlur, handleSubmit, values }) => {
                return (
                    <View>
                    {
                        Object.keys(values).map((k, v) => {
                            return (
                                <View key={k} style={STYLES.textInput}>
                                    <TextInput
                                    onChangeText={handleChange(k)}
                                    onBlur={handleBlur(k)}
                                    placeholder={data[k]? data[k] : fields[k]}
                                    />
                                </View>
                            )
                        })
                    }
                        <TouchableOpacity style={[STYLES.button, STYLES.buttonPrimary, styles.save]} onPress={handleSubmit}>
                            <Text style={STYLES.buttonText}>Save</Text>
                        </TouchableOpacity>
                    </View>
                )
            }}
            </Formik></ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    save: {
        marginHorizontal: 75,
        marginTop: 25,
        alignItems: 'center'
    },
});