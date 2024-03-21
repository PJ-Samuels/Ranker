import React, { useEffect, useState, useSyncExternalStore } from "react";
import { useNavigation } from "@react-navigation/native";
import { Button, Alert, StyleSheet, Text, View, Image, TextInput, ScrollView } from 'react-native';
import { db } from '../firebaseConfig'
import { collection, getDocs, addDoc, where, query} from "firebase/firestore";
import { Rating, RatingProps } from '@rneui/themed';
// import {RAWGAPIKEY} from "react-native-dotenv"
export default function Home() {
    const [data, setData] = useState([]);
    const [userGames, setGames] = useState([]);
    const [text, setText] = useState('');

    // const apiKey = RAWGAPI
    // console.log(apiKey)
    const apiKey = '0cca977a2f9f43caa5f37f1cbdea2f64';
    const navigation = useNavigation();

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
    const mygames = () =>{
        navigation.navigate('MyGames');
    }
    const styles = StyleSheet.create({
        games:{
            display: 'flex',
            flexDirection: 'column',
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
        }

    });
    return (
        <View>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}><Text>Home</Text>
            </View>

            <View style = {{justifyContent: "center", alignItems: 'center',}}>
            {data.map((game, index) => (
                <View style = {styles.add} key={index}>
                    <Text>{game.name}</Text>
                    <Image
                        source={{ uri: game.image }}
                        style={{ width: 100, height: 100 }}
                    />
                    <Button title = "Add" onPress = {() => addGame()}/>
                </View>
                
            ))}
            </View>

                <Text>Enter a video game name here</Text>
            <View style = {styles.search}>
                <TextInput
                    editable
                    // multiline
                    // numberOfLines={4}
                    // maxLength={40}
                    onChangeText={text => onChangeText(text)}
                    value={text}
                    style={styles.input}
                />
                <Button           
                title="Submit"
                onPress = {() => searchSubmit()}/>
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
                    <Rating
                        showRating
                        imageSize={40}
                        // onFinishRating={ratingCompleted}
                        style={{ backgroundColor: "gray", paddingVertical: 10 }}
                        />
                </View>
                
            ))}
            </ScrollView>
        </View>
    );

}
