import React, { useEffect, useState, useSyncExternalStore } from "react";
import Navbar from "./navbar";
import { useNavigation } from "@react-navigation/native";
import { Button, Alert, StyleSheet, Text, View, Image, TextInput, ScrollView } from 'react-native';
import { db } from '../firebaseConfig'
import { collection, getDocs, addDoc, where, query} from "firebase/firestore";
import { Rating, RatingProps } from 'react-native-ratings';
import config from './config';

export default function Home({ route }) {
    const [userGames, setGames] = useState([]);
    const { username } = route.params;
    const apiKey = config.RAWGAPIKEY;
    const navigation = useNavigation();
    
    useEffect(() => {
        const fetchData = async () => {
            try{
                const querySnapshot = await getDocs(query(collection(db, "user_games"), where("uid", "==", username)));
                var games = [];
                querySnapshot.forEach((doc) => {
                    games.push({name: doc.data().game, image: doc.data().image, rating: doc.data().rating, id: doc.data().gid});
                });
                setGames(games);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);


    const mygames = () =>{
        navigation.navigate('MyGames');
    }
    const styles = StyleSheet.create({
        games:{
            display: 'flex',
            flexDirection: 'column',
            flex: 0,
            flexWrap: 'wrap',
            justifyContent: 'space-around',
            padding: 20,
        },
        input:{
            height: 40,
            width: 250,
            margin: 12,
            borderWidth: 1,
            padding: 5,

        },
        add:{

            flexDirection: 'column',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 20,
        },
        search:{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
        },
        bottomNavbar: {
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 60,
            backgroundColor: '#f2f2f2',
            paddingHorizontal: 20,
            paddingVertical: 10,
        },

    });
    return (
        <View style = {{flex: 1}}>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text>Home</Text>
            </View>

            <Text onPress = {() => mygames()}>My Games</Text>
            <ScrollView horizontal>
            {userGames.map((game, index) => (
                <View style = {styles.games} key={index} >
                    <Text>{game.name}</Text>
                    <Image
                        source={{ uri: game.image }}
                        style={{ display: "flex", width: 200, height: 200 }}
                    />
                    <View pointerEvents="none">
                        <Rating
                            id = {game.id}
                            type='custom'
                            showRating
                            // onFinishRating={ratingCompleted}
                            ratingColor='red'
                            ratingBackgroundColor='#c8c7c8'
                            startingValue={game.rating}
                            ratingCount ={5}
                        />
                    </View>
                </View>
                
            ))}
            </ScrollView>
            <Navbar/>
        </View>
    );

}

Home.navigationOptions = {
    headerLeft: null,
}