import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Button, Alert, StyleSheet, Text, View, Image, TextInput } from 'react-native';
import { db } from '../firebaseConfig'
import { collection, getDocs, addDoc } from "firebase/firestore";

export default function Home() {
    const [data, setData] = useState([]);
    const [text, setText] = useState('');
    const apiKey = '0cca977a2f9f43caa5f37f1cbdea2f64';

    useEffect(() => {
        const fetchData = async () => {
            try {


                // const querySnapshot = await getDocs(collection(db, "user_games"));
                // querySnapshot.forEach((doc) => {
                //     console.log(`${doc.id} => ${doc.data()}`);
                //   });



                  
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
            try{
                const response = await fetch(`https://rawg.io/api/games?search=${text}&key=${apiKey}`);
                const data = await response.json();
                const game = data.results.slice(0, 1);
                const name = game[0].name;
                const id = game[0].id;
                const image = game[0].background_image;
                setData([{ name, id, image }]);
            }
            catch{
                console.log('error')
            }
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
        console.log("completed")
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
        </View>
    );
}
