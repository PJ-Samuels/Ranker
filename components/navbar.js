import React, {useEffect, lazy, Suspense } from 'react';
import { Alert, View, Text, StyleSheet } from 'react-native';
import { Tab } from '@rneui/themed';
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Icon } from '@rneui/themed';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


export default function Navbar() {
  const [index, setIndex] = React.useState(0);
  const navigation = useNavigation();
  const [password, setPass] = React.useState('');
  const [username, setUser] = React.useState('');
  
  const titles = ["home", "search", "user", "list", "group"];
  useEffect(() => {
    const checkStoredCredentials = async () => {
      const storedCredentials = await AsyncStorage.getItem('userCredentials');
      const { username, password } = JSON.parse(storedCredentials);
      setUser(username);
      setPass(password);
      
    };
    checkStoredCredentials();

  }, []);
  const changePage = (selectedIndex) => {
    setIndex(selectedIndex);
    switch (selectedIndex) {
      case 0:
        navigation.navigate('Home', {username})
        break;
      case 1:
        navigation.navigate('Search', {username})
        break;
      case 2:
        navigation.navigate('Profile',  {username})
        break;
      case 3:
        navigation.navigate('Discover', {username})
        break;
      case 4:
        navigation.navigate('Friends', {username})
        break;
      default:
        break;
    }
  }

  return (
    <View style = {styles.container}>
    {/* <View>
      <Text onPress = {() => (navigation.navigate("Home", {username}))}>Home</Text>
      <Text onPress = {() => (navigation.navigate("Search", {username}))}>Search</Text>
      <Text onPress = {() => (navigation.navigate("Profile", {username}))}>Profile</Text>
      <Text onPress = {() => (navigation.navigate("Discover", {username}))}>Discover</Text>
      <Text onPress = {() => (navigation.navigate("Friends", {username}))}>Friends</Text>
    </View> */}
      <Tab
        value={index}
        onChange={(selectedIndex) => changePage(selectedIndex)}
        containerStyle={{
          backgroundColor: '#707280',
          color: 'white',
          height: 50,

        }}
        indicatorStyle={{
          backgroundColor: null,
          color: null,
          height: 3,
        }}
        variant="primary"
      >
        {titles.map((title, tabIndex) => (
          <Tab.Item
            key={tabIndex}
            titleStyle={{ fontSize: 9 }}
            icon={{type: 'font-awesome', color: 'white', name: title }}
          />
        ))}
      </Tab>
    </View>
  )
}
const styles = StyleSheet.create({
  container :{
    paddingBottom : 30,
    backgroundColor: '#707280',
  }
})