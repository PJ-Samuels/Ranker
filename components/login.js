import React from "react";
// import {NavigationContainer} from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from "@react-navigation/native";
import { Button, Alert,StyleSheet, Text, View } from 'react-native';
export default function Login() {
    const navigation = useNavigation();

    const buttonPress = () => {
        Alert.alert('Simple Button pressed')
        navigation.navigate('Home');
    }
    return(
    <View style={styles.container}>
        <Text>Video Game Rater</Text>
        <Text>Login </Text>
        <StatusBar style="auto" />
        <Button
          title="Login"
          color = "blue"
          onPress={() => buttonPress()}
        />
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