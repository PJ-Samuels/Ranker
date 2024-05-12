import React, { useEffect, useState } from 'react';
import {View,Text, Image, ScrollView, StyleSheet} from 'react-native';
import Navbar from "./navbar";
import config from './config';
export default function Discover({route}) {
    const apiKey = config.RAWGAPIKEY;
    const username = route.params.username;
    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchData = async () =>{
            const response = await fetch(`https://rawg.io/api/games?key=${apiKey}`);
            const data = await response.json();
            const games = data.results.map(game => {
                const { name, id, background_image: image, rating } = game;
                return { name, id, image, rating };
            });
            setData(games);
        }
        fetchData();
    }, []);
    return(
        <View style={{ flex: 1, backgroundColor: "#c9cacf" }}>
            <ScrollView>
            {data.map((game, index) => (
                <View key = {index} style = {styles.card}>
                    <Text>{game.name}</Text>
                    <Image source={{uri: game.image}} style={{width: 200, height: 200, borderRadius: 10}}/>
                </View>
            ))}
            </ScrollView>
            <Navbar/>
        </View>        
        )
}
const styles = StyleSheet.create({
    card: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#707280',
        margin: 10,
        padding: 10,
        borderRadius: 10
    }
})
