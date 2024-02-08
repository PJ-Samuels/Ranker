import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Button, Alert,StyleSheet, Text, View, Image } from 'react-native';
import {useEffect, useState} from 'react';

export default function Home(){
    const [data, setData] = useState([]);
    const apiKey = '0cca977a2f9f43caa5f37f1cbdea2f64';
    useEffect(() =>{
        fetch(`https://rawg.io/api/games?token&key=${apiKey}`)
          .then(res => res.json())
          .then(data => {
            var game = data.results.slice(0, 1);
            var name = game[0].name
            var id = game[0].id
            var image = game[0].background_image
            setData([{name, id, image}])
          });

        });
    return(
        <View>
            <Text>Home</Text>
            {data.map((game, index) => (
                <View key={index}>
                    <Text>{game.name}</Text>
                    <Image
                        source={{ uri: game.image }}
                        style={{ width: 100, height: 100 }}
                    />
                </View>
            ))}
            <Text>Welcome to the Video Game Rater</Text>
        </View>
    )
}