import React, { useState, useEffect } from "react";
import { AsyncStorage } from "react-native";

export const ProfileContext = React.createContext({});

export const ProfileProvider = ({ children }) => {
    const [data, setData] = useState({});
    const [cards, setCards] = useState({})
    const [loading,setLoading] = useState(false);

    const addCard = (card) => {
        let newCards;
        
        if(!cards) {
            newCards = [];
        } else {
            newCards = [...cards];
        }

        newCards.push({index: newCards.length, ...card});
        setCards(newCards);
        AsyncStorage.setItem('BCards', JSON.stringify(newCards, null, 2));
    }

    const fetchProfile = async () => {
        setLoading(true);
        const newData = await AsyncStorage.getItem('BCardProfile');
        const newCards = await AsyncStorage.getItem('BCards');
        let d = JSON.parse(newData);
        let c = JSON.parse(newCards);
        
        if(d) {
            setData(JSON.parse(d));
        }

        if(c) {
            setCards(JSON.parse(c));
        }

        setLoading(false);
    }

    useEffect(()=> {
        fetchProfile()
    },[]);


    return (
        <ProfileContext.Provider value={{loading, data, setData, cards, addCard}}>
            {children}
        </ProfileContext.Provider>
    );
}