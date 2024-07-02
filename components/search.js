import React from 'react';
import {useState} from 'react';
import {Text, View, StyleSheet, TextInput, Image} from 'react-native';
import { db } from '../firebaseConfig'
import { collection, getDocs, addDoc, where, query} from "firebase/firestore";
import { Rating, RatingProps } from 'react-native-ratings';
import {Input, Button } from '@rneui/themed';
import Navbar from "./navbar";
//import config from './config';

export default function Search({route}) {
    const { username } = route.params;
    const [data, setData] = useState([]);
    const [text, setText] = useState('');
    const [rating, setRating] = useState([]);
    //const apiKey = config.RAWGAPIKEY;
    const apiKey = "0cca977a2f9f43caa5f37f1cbdea2f64"


    const onChangeText = (text) => {
        setText(text);
    }
    const ratingCompleted = (rating) => {
        setRating(rating)
        console.log('Rating is: ' + rating);
    };
    const searchSubmit =  () =>{
        const getData = async () => {
            const response = await fetch(`https://rawg.io/api/games?search=${text}&key=${apiKey}`);
            const data = await response.json();
            const game = data.results.slice(0, 1);
            const name = game[0].name;
            const id = game[0].id;
            const image = game[0].background_image;
            const rating = game[0].rating;
            setData([{ name, id, image, rating }]);
        };
        getData();
        console.log(data);

    }
    const addGame = async() => {
        const docRef = await addDoc(collection(db, "user_games"), {
            game: data[0].name,
            image: data[0].image,
            gid: data[0].id,
            uid: username,
            rating: rating
        });
        console.log("added")
    }
    const styles = StyleSheet.create({    
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
        flex: '1',
        justifyContent: 'center',
        alignItems: 'center',
        },
        container: {
            flex: 1,
            justifyContent: 'flex-end',
            backgroundColor: "#c9cacf",
        },
    });
    return(
        <View style = {styles.container}>
            {/* <Text>Search Page</Text> */}
            <View style = {{justifyContent: "center", alignItems: 'center',}}>
            {data.map((game, index) => (
                <View style = {styles.add} key={index}>
                    <Text>{game.name}</Text>
                    <Image
                        source={{ uri: game.image }}
                        style={{ width: 200, height: 200 }}
                    />
                    <Rating
                        id = {game.id}
                        type='custom'
                        // showRating
                        onFinishRating={ratingCompleted}
                        ratingColor='#3b66de'
                        // ratingBackgroundColor='#c8c7c8'
                        tintColor = "#c9cacf"
                        startingValue= {3}
                        ratingCount ={5}
                    />
                    <Button title = "Add" onPress = {() => addGame()}/>
                </View>
                
            ))}
            </View>


            <View style = {styles.search}>
                <Text>Enter a video game name here</Text>
                {/* <TextInput
                    editable
                    onChangeText={text => onChangeText(text)}
                    value={text}
                    style={styles.input}
                /> */}
                <View style={{ width: '80%' }}>
                    <Input 
                        placeholder="Search"
                        onChangeText = {text => onChangeText(text)} 
                        value={text}
                        backgroundColor = 'white'
                        inputContainerStyle={{ }}
                    />
                </View>

                <Button           
                title="Submit"
                onPress = {() => searchSubmit()}/>
            </View>
            <Navbar/>
        </View>
    )
}