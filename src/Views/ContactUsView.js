import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Swiper from 'react-native-swiper';

import {STYLES} from '../Styles/styles';

const ContactUsView = () => {
    return (
      <View style={STYLES.card}>
          <Text style={STYLES.header}>Reach Out</Text>
          <View style={[STYLES.container, STYLES.instructionsContainer]}>
            <Text style={STYLES.bodyText}>Hello! My name is Jay!</Text>
            <Text style={STYLES.bodyText}>I'm the developer of BCard and I'm always looking for feedback</Text>
            <Text style={STYLES.bodyText}>Feel free to shoot me an email at me@jaykorhonen.com</Text>
          </View>
      </View>
    )
}

export default ContactUsView;