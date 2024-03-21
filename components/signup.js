import React from 'react';
import { Button, Alert,StyleSheet, Text, View, TextInput } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { db } from '../firebaseConfig'
import { collection, getDocs, addDoc, where, query} from "firebase/firestore";

export default function Signup(){
    const navigation = useNavigation();
    const [email, setEmail] = React.useState('');
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');

    const confirmButton = async () => {
        if (password != confirmPassword) {
            Alert.alert("Passwords do not match");
            return;
        }
        const docRef = await addDoc(collection(db, "users"), {
            email: email,
            username: username,
            password: password
        });
        console.log("confirmButton")
        navigation.navigate('Home', {username})
    }
    return(
    <>
        <Text>Sign up</Text>
        <Text>Email</Text>
        <TextInput editable  onChangeText = {email => setEmail(email)}/>
        <Text>Username</Text>
        <TextInput editable  onChangeText = {username => setUsername(username)}/>
        <Text>Password</Text>
        <TextInput editable  onChangeText = {password => setPassword(password)}/>
        <Text>Confirm Password</Text>
        <TextInput editable onChangeText = {password => setConfirmPassword(password)}/>
        <Button
        title = "Confirm"
        color = "blue"
        onPress={({}) => confirmButton()}
        />
    </> 
   );
}