import React,  { useEffect, useState, useSyncExternalStore }  from "react";
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from "@react-navigation/native";
import { Alert,StyleSheet, Text, View, TextInput } from 'react-native';
import { db } from '../firebaseConfig'
import { collection, getDocs, addDoc, where, query} from "firebase/firestore";
import { Input, Icon, Button,CheckBox } from '@rneui/themed';
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
        if (storedCredentials && staySignedIn) {
          const { username, password } = JSON.parse(storedCredentials);
          setUser(username);
          setPass(password);
          navigation.navigate('Home', {username});
        }
      };
      checkStoredCredentials();

    }, []);
    const staySigned = (temp) => {
      setStaySignedIn(!staySignedIn)
    }
  

    return(
    <View style={styles.container}>
        <Text style = {styles.Header}>Video Game Rater</Text>
        <Input
          placeholder='Username'
          backgroundColor = 'white'
          onChangeText = {username => setUser(username)} value={username}
        />
        <Input 
          placeholder="Password"
          onChangeText = {password => setPass(password)} 
          value={password}
          backgroundColor = 'white'
          secureTextEntry={true}
          />

        <Button
          title="Login"
          buttonStyle={{ backgroundColor: '#c5d2f5', width: 100}}
          onPress={() => buttonPress()}
          containerStyle={{ margin: 10 , padding: 10}}
        />
        <Button
        title = "Sign up"
        buttonStyle={{ backgroundColor: '#c5d2f5' , width: 100}}
        onPress={({}) => signupButton()}
        />
        <CheckBox
          center
          checked={staySignedIn}
          title = 'Stay Signed In'
          color = '#707280'
          onPress = {() => staySigned(staySignedIn)}
          />
        <StatusBar style="auto" />
    </View>
    )
    
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#707280',
      alignItems: 'center',
      justifyContent: 'center',
    },
    Header:{
      fontSize: 40,
      color: 'white',
      paddingBottom: 80,
    }

});