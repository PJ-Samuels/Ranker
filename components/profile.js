import React, { useEffect, useState, useSyncExternalStore } from "react";
import {useNavigation} from "@react-navigation/native";
import { Button, Alert, StyleSheet, Text, View, Image, TextInput, ScrollView} from 'react-native';
import Navbar from "./navbar";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { collection, getDocs, addDoc, where, query, deleteDoc, doc, updateDoc} from "firebase/firestore";
import {db} from '../firebaseConfig';
import { Rating } from 'react-native-ratings';
import { set } from "firebase/database";

export default function MyGame({route}) {
    const navigation = useNavigation();
    const username = route.params.username;
    const [editable, setEditable] = useState([]);
    const [currGame, setCurrGame] = useState('');
    const [reviews, setReview] = useState([]);
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
                    games.push({name: doc.data().game, 
                        image: doc.data().image, 
                        rating: doc.data().rating, 
                        id: doc.data().gid, 
                        review: doc.data().review,
                        editable: true});
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
    const onEdit = async (currName) =>{
        setGames(prevGames =>
            prevGames.map(game =>
                game.name === currName ? { ...game, editable: false } : game
            )
        );

    }
    

    const handleRatingChange = async (newRating, currGame) => {
            console.log("curr game =",currGame)
            const q = query(
                collection(db, "user_games"),
                    where("uid", "==", username),
                    where("game", "==", currGame)
            );
            const querySnapshot = await getDocs(q);
            
            if (!querySnapshot.empty) {
                querySnapshot.forEach(async (doc) => {
                    const docRef = doc.ref;
                    try {
                        await updateDoc(docRef, {
                            rating: newRating
                        });
                        console.log("New rating = ", newRating);
                        console.log("Document successfully updated!");
                    } catch (error) {
                        console.error("Error updating document:", error);
                    }
                });
            } else {
                console.log("No documents found for the specified UID and game name.");
            
        }
    };
    const onSave = (currName) => {
        setGames(prevGames =>
            prevGames.map(game =>
                game.name === currName ? { ...game, editable: true } : game
            )
        );

    }
    const onChangeText = async (text, currName) => {
        setGames(prevGames =>
            prevGames.map(game =>
                game.name === currName ? { ...game, review: text } : game
            )
        );
        const q = query(
            collection(db, "user_games"),
                where("uid", "==", username),
                where("game", "==", currName)
        );
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
            querySnapshot.forEach(async (doc) => {
                const docRef = doc.ref;
                try {
                    await updateDoc(docRef, {
                        review : text
                    });
                    console.log("Document successfully updated!");
                } catch (error) {
                    console.error("Error updating document:", error);
                }
            });
        } else {
            console.log("No documents found for the specified UID and game name.");
        
    }
        
    }
    return (
        <View style = {{flex: 1}}>
            <Text>My Games</Text>
                <ScrollView> 
                {userGames.map((game,index)=> (
                    <View key = {index} p>
                        <Text>{game.name}</Text>
                        <Image source = {{uri: game.image}} style = {{width: 200, height: 200}}/>
                        <Rating
                            id = {game.id}
                            type='custom'
                            onFinishRating={(newRating) => handleRatingChange(newRating,game.name)}
                            ratingColor='#3b66de'
                            startingValue={game.rating}
                            ratingCount ={5}
                            style = {{marginTop: 10}}
                            readonly={game.editable}
                            tintColor = "#707280"

                        />
                        <Text>Review</Text>
                        <TextInput
                            editable = {!(game.editable)}
                            multiline
                            numberOfLines={4}
                            maxLength={40}
                            placeholder={game.review}
                            onChangeText={(text) => onChangeText(text,  game.name)}
                        />
                        <Button title = "Edit" onPress = {()=> onEdit(game.name)}></Button>
                        <Button title = "save" onPress = {() => onSave(game.name)}></Button>
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