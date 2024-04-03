import React,  { useEffect, useState, useSyncExternalStore }  from "react";
// import {NavigationContainer} from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from "@react-navigation/native";
import { Alert,StyleSheet, Text, View, TextInput } from 'react-native';
import { db } from '../firebaseConfig'
import { collection, getDocs, addDoc, where, query} from "firebase/firestore";
import { Input, Icon, Button } from '@rneui/themed';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login() {
    const navigation = useNavigation();
    const [password, setPass] = useState('');
    const [username, setUser] = useState('');
    const [staySignedIn, setStaySignedIn] = useState(true);

    const buttonPress = () => {
        // Alert.alert('Simple Button pressed')
        const fetchData = async () => {
          try{
              const querySnapshot = await getDocs(query(collection(db, "users"), where("username", "==", username), where("password", "==", password)));
              if (querySnapshot.size > 0) {
                querySnapshot.forEach((doc) => {
                  console.log("Password is valid for username:", doc.data().username);
                  navigation.navigate('Home', {username});
                  if (true) {
                    AsyncStorage.setItem('userCredentials', JSON.stringify({ username, password }));
                  }
                });
              } else {
                console.log("Invalid username or password.");
              }
          } catch (error) {
              console.error("Error fetching data:", error);
          }
        };
        fetchData();
    }
    const signupButton = () => {
      navigation.navigate('Signup');
    }
    useEffect(() => {
      const checkStoredCredentials = async () => {
        const storedCredentials = await AsyncStorage.getItem('userCredentials');
        console.log(storedCredentials);
        if (storedCredentials && staySignedIn) {
          const { username, password } = JSON.parse(storedCredentials);
          setUser(username);
          setPass(password);
          navigation.navigate('Home', {username});
        }
      };
      checkStoredCredentials();

    }, []);
  

    return(
    <View style={styles.container}>
        <Text>Video Game Rater</Text>
        {/* <Text>Username</Text> */}
        <Input
          placeholder='Username'
          onChangeText = {username => setUser(username)} value={username}
        />
        {/* <TextInput editable onChangeText = {username => setUser(username)} value={username}/> */}
        {/* <Text>Password</Text> */}
        <Input placeholder="password" onChangeText = {password => setPass(password)} value={password}/>
        {/* <TextInput editable onChangeText = {password => setPass(password)} value={password}/>
        <Text>Login </Text> */}

        <Button
          title="Login"
          color = "blue"
          onPress={() => buttonPress()}
        />

        <Button
        title = "Sign up"
        color = "blue"
        onPress={({}) => signupButton()}
        />
        <StatusBar style="auto" />
    </View>
    )
    
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    }
});