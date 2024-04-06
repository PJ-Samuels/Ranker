import React, {useState, useEffect} from 'react';
import {Text,View, StyleSheet, Image, ScrollView} from 'react-native';
import Navbar from "./navbar";
import { Input, Icon, Button } from '@rneui/themed';
import { db } from '../firebaseConfig'
import { Rating, RatingProps } from 'react-native-ratings';
import { collection,getDoc ,getDocs, addDoc, where, query, updateDoc, doc} from "firebase/firestore";


export default function Friends({route}) {
    const [search, setSearch] = useState('');
    const [result, setResult] = useState("");
    const { username } = route.params;
    const [friendData, setFriendData] = useState([]);
    const styles = StyleSheet.create({
        games:{
            display: 'flex',
            flexDirection: 'column',
            flex: 0,
            flexWrap: 'wrap',
            justifyContent: 'space-around',
            padding: 20,
        }
    });
    useEffect(() => {
        const fetchData = async () => {
            const querySnapshot = await getDocs(query(collection(db, "user_friends") ,where("uid", "==", username)));
            if(querySnapshot.empty){
                console.log('No matching documents');
                return;
            }
            else{
                var friends = [];
                querySnapshot.forEach((doc) =>{
                    friends.push(doc.data().friend);
                });
                var friend_ratings = [];
                for (const friend of friends) {
                    const querySnapshot2 = await getDocs(query(collection(db, "user_games"), where("uid", "==", friend)));
                    querySnapshot2.forEach((doc) => {
                        // friend_ratings.push(doc.data());
                        friend_ratings.push({name: doc.data().game, image: doc.data().image, rating: doc.data().rating, id: doc.data().gid});
                    });
                }
                setFriendData(friend_ratings);

            }
        }
        fetchData();
    });
    const onButtonPress = () => {
        console.log(search);
        const fetchUsers = async () =>{
            const querySnapshot = await getDocs(query(collection(db, "users"), where("username", "==", search)));
            if(querySnapshot.empty){
                console.log('No matching documents');
                return;
            }
            else{
                querySnapshot.forEach((doc) =>{
                    console.log(doc.id, " => ", doc.data().username);
                    setResult(doc.data().username);

                });
            }

        }
        fetchUsers()
    }
    const onAddFriend = async() => {
        const fetchUsers = async () =>{
            const querySnapshot = await getDocs(query(collection(db, "users"), where("username", "==", search)));
            if(querySnapshot.empty){
                const docRef = await addDoc(collection(db, "user_friends"),{
                    uid: username,
                    friend: search
                });
            }
            else{
                console.log("already a friend");
            }
        }
        fetchUsers()
    }
    return(
        <ScrollView>
            <Text>Friends Page</Text>
            <Input placeholder = "Friend Search" onChangeText = {search => setSearch(search)}/>
            <Button title = "Search" onPress = {onButtonPress}/>
            {result ? 
            <>  
                <Text>{result}</Text>
                <Button title="Add Friend" onPress = {onAddFriend}/>
            </>
            : 
            <>
                <Text>No Results</Text>
            </>}
            {friendData.map((game, index) => (
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

            <Navbar/>
        </ScrollView>
        )
}