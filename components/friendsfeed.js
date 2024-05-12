import React, {useState, useEffect} from 'react';
import {Text,View, StyleSheet,Image, ScrollView} from 'react-native';
import Navbar from "./navbar";
import { db } from '../firebaseConfig'
import { Rating, RatingProps } from 'react-native-ratings';
import { collection,getDoc ,getDocs, addDoc, where, query, updateDoc, doc, deleteDoc} from "firebase/firestore";

export default function FriendsFeed({route}) {
    const [friends, setFriends] = useState([]);
    const { username } = route.params;
    const [friendData, setFriendData] = useState([]);
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
                var friend_ratings = [];
                for (const friend of friends) {
                    const querySnapshot2 = await getDocs(query(collection(db, "user_games"), where("uid", "==", friend)));
                    querySnapshot2.forEach((doc) => {
                        // friend_ratings.push(doc.data());
                        friend_ratings.push({friend: friend, name: doc.data().game, image: doc.data().image, rating: doc.data().rating, id: doc.data().gid});
                    });
                }
                setFriendData(friend_ratings);

            }
        }
        fetchData();
    });
    return (
        <View style = {styles.container}>
            <Text>Feed</Text>
            <Text>Friends Reviews</Text>
            <ScrollView>
            {friendData.map((game, index) => (
                <View style = {styles.games} key={index} >
                    <Text>Friend: {game.friend}</Text>
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
            </ScrollView>
            <Navbar/>
        </View>

    );
}
styles = StyleSheet.create({
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
})