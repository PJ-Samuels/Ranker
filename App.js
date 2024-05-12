import { StatusBar } from 'expo-status-bar';
import { Button, Alert, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './components/login';
import HomeScreen from './components/home';
import ProfileScreen from './components/profile';
import SignupScreen from './components/signup';
import FriendsScreen from './components/friends';
import DiscoverScreen from './components/discover';
import SearchScreen from './components/search';
import FriendsFeed from './components/friendsfeed';
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ animation: 'none'}}>
        <Stack.Screen name="Login" component={LoginScreen} options={{gestureEnabled: false}} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerLeft: () => <></>, gestureEnabled: false, title: null}} />
        <Stack.Screen name = "FriendsFeed" component={FriendsFeed} options={{ headerLeft: () => <></>, gestureEnabled: false}}/>
        <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerLeft: () => <></>, gestureEnabled: false}}/>
        <Stack.Screen name="Signup" component={SignupScreen} options={{ headerLeft: () => <></>, gestureEnabled: false}}/>
        <Stack.Screen name="Friends" component={FriendsScreen} options={{ headerLeft: () => <></>, gestureEnabled: false}}/>
        <Stack.Screen name="Discover" component={DiscoverScreen} options={{ headerLeft: () => <></>,gestureEnabled: false}}/>
        <Stack.Screen name="Search" component={SearchScreen} options={{ headerLeft: () => <></>,gestureEnabled: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
