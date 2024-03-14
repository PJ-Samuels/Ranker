import React, { useEffect, useState, useSyncExternalStore } from "react";
import { useNavigation } from "@react-navigation/native";
import { Button, Alert, StyleSheet, Text, View, Image, TextInput, ScrollView } from 'react-native';
import { db } from '../firebaseConfig'
import { collection, getDocs, addDoc, where, query} from "firebase/firestore";
import { Rating, RatingProps } from '@rneui/themed';

export default function Home() {
    const [data, setData] = useState([]);
    const [userGames, setGames] = useState([]);
    const [text, setText] = useState('');
    const apiKey = '0cca977a2f9f43caa5f37f1cbdea2f64';
    const ratingCompleted = (rating) => {
        console.log('Rating is: ' + rating);
    };
    
    useEffect(() => {
        const fetchData = async () => {
            try{
                const querySnapshot = await getDocs(query(collection(db, "user_games"), where("uid", "==", 1)));
                var games = [];
                querySnapshot.forEach((doc) => {
                    // console.log(`${doc.id} => ${doc.data()}`);
                    games.push({name: doc.data().game, image: doc.data().image, id: doc.data().gid});
                });
                setGames(games);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    const onChangeText = (text) => {
        setText(text);
    }
    const searchSubmit =  () =>{
        const getData = async () => {
            const response = await fetch(`https://rawg.io/api/games?search=${text}&key=${apiKey}`);
            const data = await response.json();
            const game = data.results.slice(0, 1);
            const name = game[0].name;
            const id = game[0].id;
            const image = game[0].background_image;
            setData([{ name, id, image }]);
        };
        getData();

    }
    const addGame = async() => {
        const docRef = await addDoc(collection(db, "user_games"), {
            game: data[0].name,
            image: data[0].image,
            gid: data[0].id,
            uid: 1,
        });
    }
    return (
        <View>
            <Text>User Home Page</Text>
            {data.map((game, index) => (
                <View key={index}>
                    <Text>{game.name}</Text>
                    <Image
                        source={{ uri: game.image }}
                        style={{ width: 100, height: 100 }}
                    />
                </View>
            ))}
                  <TextInput
                    editable
                    multiline
                    numberOfLines={4}
                    maxLength={40}
                    onChangeText={text => onChangeText(text)}
                    value={text}
                    style={{padding: 10}}
                />
            <Button           
            title="Submit"
            onPress = {() => searchSubmit()}/>
            <Text>Enter a video game name here</Text>
            <Button title = "Add" onPress = {() => addGame()}/>
            <Text>My Games</Text>
            <ScrollView horizontal>
            {userGames.map((game, index) => (
                <View key={index} >
                    <Text>{game.name}</Text>
                    <Image
                        source={{ uri: game.image }}
                        style={{ width: 100, height: 100 }}
                    />
                    <Rating
                        showRating
                        imageSize={40}
                        onFinishRating={ratingCompleted}
                        style={{ paddingVertical: 10 }}
                        />
                </View>
                
            ))}
            </ScrollView>
        </View>
    );
}
