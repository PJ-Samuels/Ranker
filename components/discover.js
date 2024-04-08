import React, { useEffect, useState } from 'react';
import {View,Text, Image, ScrollView} from 'react-native';
import Navbar from "./navbar";
import config from './config';
import { set } from 'firebase/database';

export default function Discover() {
    const apiKey = config.RAWGAPIKEY;
    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchData = async () =>{
            const response = await fetch(`https://rawg.io/api/games?key=${apiKey}`);
            const data = await response.json();
            const games = data.results.map(game => {
                const { name, id, background_image: image, rating } = game;
                console.log(name)
                console.log([ name, id, image, rating ])
                return { name, id, image, rating };
            });
            setData(games);
            console.log(games);
        
        }
        fetchData();
    }, []);
    return(
        <View style={{ flex: 1 }}>
            <Text>Discover</Text>
            <ScrollView>
            {data.map((game, index) => (
                <View key = {index}>
                    <Text>{game.name}</Text>
                    <Image source={{uri: game.image}} style={{width: 200, height: 200}}/>
                </View>
            ))}
            </ScrollView>
            <Navbar/>
        </View>        
        )
}

