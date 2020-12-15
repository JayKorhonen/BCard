import React, { useContext, useState } from "react";
import { Animated, Dimensions, StyleSheet, View, Text, TouchableOpacity, Button } from "react-native";
import {ProfileContext, FIELDS} from '../Context/ProfileContext';
import {STYLES} from '../Styles/styles';
import {COLORS} from '../Styles/colors';
import { withNavigation } from "react-navigation";

const MARGIN = 18;
const { width } = Dimensions.get("window");
const ratio = 228 / 362;
const CARD_WIDTH = width * 0.8;
const DEFAULT_CARD_HEIGHT = CARD_WIDTH * ratio;
const CARD_HEIGHT = DEFAULT_CARD_HEIGHT + MARGIN * 2;
const { height: wHeight } = Dimensions.get("window");
const height = wHeight;

const BCard = ({ item, y, index, navigation }) => {
  const {removeCard} = useContext(ProfileContext);
  const [isFlipped, setIsFlipped] = useState(false);

  const position = Animated.subtract(index * CARD_HEIGHT, y);
  const isAppearing = height;
  const isBottom = height - CARD_HEIGHT;
  const isTop = 0;
  const isDisappearing = -CARD_HEIGHT;

  const translateY = Animated.add(
    Animated.add(
      y,
      y.interpolate({
        inputRange: [0, 0.00001 + index * CARD_HEIGHT],
        outputRange: [0, -index * CARD_HEIGHT],
        extrapolateRight: "clamp",
      })
    ),
    position.interpolate({
      inputRange: [isBottom, isAppearing],
      outputRange: [0, -CARD_HEIGHT / 4],
      extrapolate: "clamp",
    })
  );

  const scale = position.interpolate({
    inputRange: [isDisappearing, isTop, isBottom, isAppearing],
    outputRange: [0.5, 1, 1, 0.5],
    extrapolate: "clamp",
  });

  const opacity = position.interpolate({
    inputRange: [isDisappearing, isTop, isBottom, isAppearing],
    outputRange: [0.5, 1, 1, 0.5],
  });

  return (
    <Animated.View
      style={[{ opacity, transform: [{ translateY }, { scale }] }]}
      key={item.date}
    >
        <TouchableOpacity onPress={() => setIsFlipped(!isFlipped)}>
        {
          isFlipped?
          <View style={[STYLES.card, styles.card, {width: CARD_WIDTH}]}>
            <TouchableOpacity style={{alignContent:'center', justifyContent: 'center', flex: 1, marginHorizontal: 20}}>
              <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <TouchableOpacity style={[STYLES.bCardButton, {width: '48%'}]} onPress={() => removeCard(index)}>
                  <Text style={STYLES.buttonText}>DELETE</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[STYLES.bCardButton, {width: '48%'}]}  onPress={() => setIsFlipped(!isFlipped)}>
                  <Text style={STYLES.buttonText}>CLOSE</Text>
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity style={[STYLES.bCardButton, {marginTop: 10}]} onPress={() => navigation.navigate('CardDetail', {index})}>
                  <Text style={[STYLES.buttonText, {textAlign: 'center'}]}>DETAILS</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </View>
          :
          <View style={[STYLES.card, styles.card, {justifyContent: 'space-evenly'}]}>
            <Text style={STYLES.header}>{item.firstName} {item.lastName}</Text>
            <View>
            {
              Object.entries(item).map(([k, v]) => {
                if(k.toString() == 'role'
                || k.toString() == 'company'
                || k.toString() == 'phone'
                || k.toString() == 'email') {
                  return <Text key={k} style={STYLES.cardBody}>{v}</Text>
                }

                return null;
              })
            }
            </View>
          </View>
        }
        </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    height: DEFAULT_CARD_HEIGHT,
    marginTop: MARGIN - 5,
    marginBottom: MARGIN + 2.5,
    alignSelf: "center",
    marginHorizontal: 15,
    marginVertical: 20,
    backgroundColor: 'white',
    borderRadius: 15,
    borderWidth: 2,
    borderColor: COLORS.primary
  },
});

export default withNavigation(BCard);