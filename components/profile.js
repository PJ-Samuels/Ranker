import React, { useEffect, useState, useSyncExternalStore } from "react";
import {useNavigation} from "@react-navigation/native";
import { Button, Alert, StyleSheet, Text, View, Image, TextInput, ScrollView} from 'react-native';
import Navbar from "./navbar";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { collection, getDocs, addDoc, where, query, deleteDoc, doc} from "firebase/firestore";
import {db} from '../firebaseConfig';

export default function MyGame({route}) {
    const navigation = useNavigation();
    const username = route.params.username;
    const [userGames, setGames] = useState([]);
    const onLogout = async () => {
        navigation.navigate('Login');
        await AsyncStorage.removeItem('userCredentials');
    }
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
    const onDelete = async (gameName) => {
        console.log(gameName)
        setGames(prevGames => prevGames.filter(game => game.name !== gameName));
        const q = query(collection(db, "user_games"), 
                where("uid", "==", username), 
                where("game", "==", gameName));
        const querySnapshot = await getDocs(q);
        const docToDelete = querySnapshot.docs[0];
        await deleteDoc(doc(db, "user_games", docToDelete.id));
        console.log('Game deleted successfully');
    }
    return (
        <View style = {{flex: 1}}>
            <Text>My Games</Text>
                <ScrollView> 
                {userGames.map((game,index)=> (
                    <View key = {index}>
                        <Text>{game.name}</Text>
                        <Image source = {{uri: game.image}} style = {{width: 200, height: 200}}/>
                        <Button title = "delete" onPress = {() => onDelete(game.name)}></Button>
                    </View>
                
                ))}
            </ScrollView>
            <Text>Settings</Text>
            <Button title = "Logout" onPress = {onLogout}></Button>

            <Navbar/>
        </View>
    )
}