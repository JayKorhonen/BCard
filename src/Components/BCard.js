import React from "react";
import { Animated, Dimensions, StyleSheet, View, Text } from "react-native";
import {STYLES} from '../Styles/styles';

const MARGIN = 10;
const { width } = Dimensions.get("window");
const ratio = 228 / 362;
const CARD_WIDTH = width * 0.8;
const DEFAULT_CARD_HEIGHT = CARD_WIDTH * ratio;
const CARD_HEIGHT = DEFAULT_CARD_HEIGHT + MARGIN * 2;
const { height: wHeight } = Dimensions.get("window");
const height = wHeight;

const BCard = ({ item, y, index }) => {
  const position = Animated.subtract(index * CARD_HEIGHT, y);
  const isAppearing = height;
  const isBottom = height - CARD_HEIGHT;
  const isTop = 0;
  const isDisappearing = -CARD_HEIGHT;
  
  console.log('a, b, t, d:', isAppearing, isBottom, isTop, isDisappearing);

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
      style={[styles.card, { opacity, transform: [{ translateY }, { scale }] }]}
      key={index}
    >
        <View>
            <View style={[STYLES.card, styles.card]}>
            <Text style={STYLES.header}>{item.firstName} {item.lastName}</Text>
            {
              Object.keys(item).map((k) => {
                if(k.toString() == 'firstName'
                || k.toString() == 'lastName'
                || k.toString() == 'index') {
                  return null;
                }

                return (
                  <Text key={k} style={STYLES.cardBody}>{item[k]}</Text>
                )
              })
            }
            </View>
        </View>
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
  },
});

export default BCard;