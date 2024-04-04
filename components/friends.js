import React, {useState, useEffect} from 'react';
import {Text,View} from 'react-native';
import Navbar from "./navbar";
import { Input, Icon, Button } from '@rneui/themed';
import { db } from '../firebaseConfig'
import { collection, getDocs, addDoc, where, query, updateDoc, doc} from "firebase/firestore";


export default function Friends({route}) {
    const [search, setSearch] = useState('');
    const [result, setResult] = useState("");
    const { username } = route.params;

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
                    console.log("results" ,result);
                });
            }

        }
        fetchUsers()
    }
    const onAddFriend = async() => {
        console.log("username", username)
        console.log("search", search)
        const docRef = doc(db, "user_friends", username);
        const dataToAdd = {
            friend: search
          };
        await updateDoc(docRef, dataToAdd);

    }
    return(
        <View>
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
            <Navbar/>
        </View>
        )
}