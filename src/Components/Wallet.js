import React, { useRef, useState, useContext, useEffect } from "react";
import { Animated, Dimensions, FlatList, Text } from "react-native";
import {ProfileContext} from '../Context/ProfileContext';
import { SearchBar } from 'react-native-elements';
import BCard from './BCard';
import { COLORS } from '../Styles/colors';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const useLazyRef = (initializer) => {
  const ref = useRef(null);
  if (ref.current === null) {
    ref.current = initializer();
  }
  return ref.current;
};

const Wallet = () => {
  const {cards} = useContext(ProfileContext);
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState("");
  const { width } = Dimensions.get("window");
  let emptyListWidth = width*.8;

  useEffect(() => {
    setFilteredData(cards);
  }, [cards]);

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

  const filter = (value) => {
    let searchText = value.replaceAll(" ", "");
    setSearch(value);

    if(!searchText || searchText === "") {
      return;
    }

    let newCards = cards.filter((item) => {
        let text = JSON.stringify(item).toLocaleLowerCase();
        return text.toLowerCase().indexOf(searchText.toLowerCase()) > -1;
    });

    setFilteredData(newCards);
}

  return (
    <>
      <SearchBar
          placeholder="Search"
          onChangeText={filter}
          value={search}
          round
          lightTheme
          searchIcon={{size: 25}}
          inputStyle={{fontSize: 20}}
          containerStyle={{borderTopWidth: 0, borderBottomWidth: 2, marginTop: 25, marginBottom: 43, backgroundColor: 'white', width: emptyListWidth+50}}
          inputContainerStyle={{borderWidth: 2, borderBottomWidth: 2, borderColor: COLORS.primary, backgroundColor: 'white'}}
      />
      <AnimatedFlatList
        ListEmptyComponent={
          <>
          {
            cards.length > 0 ?
            <Text style={{width: emptyListWidth, textAlign: 'center', alignSelf: 'center', fontSize: 18}}>
              No Matching BCards Found
            </Text>
            :
            <Text style={{width: emptyListWidth, textAlign: 'center', alignSelf: 'center', fontSize: 18}}>
              BCard Wallet Is Empty
            </Text>
          }
          </>
        }
        scrollEventThrottle={16}
        bounces={false}
        {...{ onScroll }}
        data={filteredData}
        renderItem={({ index, item }) => (
          // <WalletCard {...{ index, y, type }} />
          <BCard {...{item, y, index}}/>
        )}
        keyExtractor={(item) => `${item.index}`}
      />
    </>
  )
}

export default Wallet;