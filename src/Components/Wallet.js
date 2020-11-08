import React, { useRef, useState, useContext } from "react";
import { Animated, Dimensions, FlatList } from "react-native";
import {ProfileContext} from '../Context/ProfileContext';

import BCard from './BCard';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const useLazyRef = (initializer) => {
  const ref = useRef(null);
  if (ref.current === null) {
    ref.current = initializer();
  }
  return ref.current;
};

// const cards = [
//   {
//     index: 1,
//     firstName: "Jay",
//     lastName: "Korhonen",
//     phone: 2347056626,
//     email: "me@jaykorhonen.com",
//     company: "Odeza"
//   },
//   {
//     index: 2,
//     firstName: "Jay",
//     lastName: "Korhonen",
//     phone: 2347056626,
//     email: "me@jaykorhonen.com",
//     company: "Odeza"
//   },
//   {
//     index: 3,
//     firstName: "Jay",
//     lastName: "Korhonen",
//     phone: 2347056626,
//     email: "me@jaykorhonen.com",
//     company: "Odeza"
//   },
//   {
//     index: 4,
//     firstName: "Jay",
//     lastName: "Korhonen",
//     phone: 2347056626,
//     email: "me@jaykorhonen.com",
//     company: "Odeza"
//   },
//   {
//     index: 5,
//     firstName: "Jay",
//     lastName: "Korhonen",
//     phone: 2347056626,
//     email: "me@jaykorhonen.com",
//     company: "Odeza"
//   },
//   {
//     index: 6,
//     firstName: "Jay",
//     lastName: "Korhonen",
//     phone: 2347056626,
//     email: "me@jaykorhonen.com",
//     company: "Odeza"
//   },
//   {
//     index: 7,
//     firstName: "Jay",
//     lastName: "Korhonen",
//     phone: 2347056626,
//     email: "me@jaykorhonen.com",
//     company: "Odeza"
//   },
//   {
//     index: 8,
//     firstName: "Jay",
//     lastName: "Korhonen",
//     phone: 2347056626,
//     email: "me@jaykorhonen.com",
//     company: "Odeza"
//   },
//   {
//     index: 9,
//     firstName: "Jay",
//     lastName: "Korhonen",
//     phone: 2347056626,
//     email: "me@jaykorhonen.com",
//     company: "Odeza"
//   },
//   {
//     index: 10,
//     firstName: "Jay",
//     lastName: "Korhonen",
//     phone: 2347056626,
//     email: "me@jaykorhonen.com",
//     company: "Odeza"
//   },
// ];

const Wallet = () => {
  const {cards} = useContext(ProfileContext);

  const y = useLazyRef(() => new Animated.Value(0));
  const onScroll = useLazyRef(() =>
    Animated.event(
      [
        {
          nativeEvent: {
            contentOffset: { y },
          },
        },
      ],
      { useNativeDriver: true }
    )
  );

  return (
      <AnimatedFlatList
        scrollEventThrottle={16}
        bounces={false}
        {...{ onScroll }}
        data={cards}
        renderItem={({ index, item }) => (
          // <WalletCard {...{ index, y, type }} />
          <BCard {...{item, y, index}}/>
        )}
        keyExtractor={(item) => `${item.index}`}
      />
  )
}

export default Wallet;