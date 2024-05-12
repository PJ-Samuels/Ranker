import React, {useState, useEffect} from 'react';
import {Text,View, StyleSheet, Image, ScrollView} from 'react-native';
import { useNavigation, useFocusEffect} from "@react-navigation/native";
import Navbar from "./navbar";
import { Input, Icon, Button } from '@rneui/themed';
import { db } from '../firebaseConfig'
import { Rating, RatingProps } from 'react-native-ratings';
import { collection,getDoc ,getDocs, addDoc, where, query, updateDoc, doc, deleteDoc} from "firebase/firestore";


export default function Friends({route}) {
    const [search, setSearch] = useState('');
    const [result, setResult] = useState("");
    const [friends, setFriends] = useState([]);
    const { username } = route.params;
    const [friendData, setFriendData] = useState([]);
    const navigation = useNavigation();

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
                setFriends(friends);
                // var friend_ratings = [];
                // for (const friend of friends) {
                //     const querySnapshot2 = await getDocs(query(collection(db, "user_games"), where("uid", "==", friend)));
                //     querySnapshot2.forEach((doc) => {
                //         // friend_ratings.push(doc.data());
                //         friend_ratings.push({name: doc.data().game, image: doc.data().image, rating: doc.data().rating, id: doc.data().gid});
                //     });
                // }
                // setFriendData(friend_ratings);

            }
        }
        fetchData();
    });
    const onButtonPress = () => {
        console.log(search);
        const fetchUsers = async () =>{
            const querySnapshot = await getDocs(query(collection(db, "users"), where("username", "==", search)));
            if(querySnapshot.empty){
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
    const removeFriend = async(newFriend) => {
        setFriends(prevFriends => prevFriends.filter(friends => friends !== newFriend));
        try {
        const q = query(collection(db, "user_friends"), 
                where("uid", "==", username), 
                where("friend", "==", newFriend));
        const querySnapshot = await getDocs(q);
        const docToDelete = querySnapshot.docs[0];

            await deleteDoc(doc(db, "user_friends", docToDelete.id));
            console.log("Document successfully deleted");
        } catch (error) {
            console.error("Error deleting document: ", error);
        }

    }
    const onAddFriend = async() => {
        const fetchUsers = async () =>{
            const querySnapshot = await getDocs(query(collection(db, "users"), where("username", "==", search)));

            const docRef = await addDoc(collection(db, "user_friends"),{
                uid: username,
                friend: search
            });
        }
        fetchUsers()
    }
    const friendReviews = () =>{
        navigation.navigate('Feed', {username: username});
    }
    return(
        <View style= {styles.container} >
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
            <ScrollView >

            <Text>Friends List</Text>
            {friends.map((friend, index) =>(
                <View key={index} style = {styles.follower}>
                    <Text >{friend}</Text>
                    <Button title="Unfollow" onPress = {() => removeFriend(friend)}/>
                </View>
            ))}

        </ScrollView>
        <Text onPress = {() => friendReviews()}>Friends Reviews</Text>
        <Navbar/>
        </View>
    )
}
const styles = StyleSheet.create({
    games:{
        display: 'flex',
        flexDirection: 'column',
        flex: 0,
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        padding: 20,
    },
    container : {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: '#c9cacf'
    },
    follower:{
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignContent: 'center',
    }
});