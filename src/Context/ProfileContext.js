import React, { useState, useEffect } from "react";
import AsyncStorage from '@react-native-community/async-storage';
import * as Location from 'expo-location';

export const ProfileContext = React.createContext({});

// export const FIELDS = {
//     firstName: 'First Name',
//     lastName: 'Last Name',
//     email: 'Email',
//     phone: 'Phone Number',
//     company: 'Company Name'
// }

export const FIELDS = {
    'Card Info': {
        'Personal Info': {
            firstName: 'First Name',
            lastName: 'Last Name',
            email: 'Email',
            phone: 'Phone Number',
        },
        'Business Info': {
            company: 'Company Name',
            industry: 'Company Industry',
            role: 'Job Role',
            website: 'Company Website'
        }
    },
    'Card Metadata': {
        'Connection Info': {
            location: 'Location',
            date: 'Date'
        }
    }
}

export const ProfileProvider = ({ children }) => {
    const [data, setData] = useState({});
    const [cards, setCards] = useState([])
    const [loading,setLoading] = useState(false);
    const [locationStatusGranted, setLocationStatusGranted] = useState(false);
  
    askLocationAcess = async () => {
        let { status } = await Location.requestPermissionsAsync();
        if (status !== 'granted') {
            setLocationStatusGranted(false);
            setErrorMsg('Permission to access location was denied');
        } else {
            setLocationStatusGranted(true);
        }
    }

    useEffect(() => {
        (async () => {
            askLocationAcess();
        })();
    }, []);

    const addCard = async (card) => {
        return new Promise((resolve, reject) => {
            let newCards;
    
            if (!locationStatusGranted) {
                askLocationAcess()
            }
            
            if(!cards) {
                newCards = [];
            } else {
                newCards = [...cards];
            }
            
            if(locationStatusGranted){
                Location.getCurrentPositionAsync({})
                .then((locationObject) => {
                    Location.reverseGeocodeAsync(locationObject.coords)
                    .then((location) => {
                        loc = location[0]
                        let locationString = `${loc.street}\n${loc.city}, ${loc.region}\n${loc.postalCode}\n${loc.country}`;
                        let date = new Date(Date.now())
                        let dateString = date.toLocaleString();
                
                        newCards.push({index: newCards.length, date: dateString, location: locationString, ...card});
                        setCards(newCards);
                        AsyncStorage.setItem('BCards', JSON.stringify(newCards, null, 2));
                        resolve();
                    });
                })
                .catch((error) => {
                    reject(error);
                });
            }
        });
    }

    const removeCard = (index) => {
        let newCards = [...cards];
        newCards.splice(index, 1);
        setCards(newCards);
        AsyncStorage.setItem('BCards', JSON.stringify(newCards, null, 2));
    }

    const fetchProfile = async () => {
        setLoading(true);
        // await AsyncStorage.setItem('BCardProfile', JSON.stringify(null, null, 2));
        // await AsyncStorage.removeItem('BCardProfile');
        // await AsyncStorage.removeItem('BCards');
        const newData = await AsyncStorage.getItem('BCardProfile');
        const newCards = await AsyncStorage.getItem('BCards');
        if(newData) setData(JSON.parse(newData));
        if(newCards) setCards(JSON.parse(newCards));

        setLoading(false);
    }

    useEffect(()=> {
        fetchProfile()
    },[]);


    return (
        <ProfileContext.Provider value={{loading, data, setData, cards, addCard, removeCard}}>
            {children}
        </ProfileContext.Provider>
    );
}