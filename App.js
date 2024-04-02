import { StatusBar } from 'expo-status-bar';
import { Button, Alert, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './components/login';
import HomeScreen from './components/home';
import MyGameScreen from './components/mygames';
import SignupScreen from './components/signup';
import FriendsScreen from './components/friends';
import DiscoverScreen from './components/discover';
import SearchScreen from './components/search';
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator         screenOptions={{
          animation: 'none', 
        }}>
        <Stack.Screen name="Login" component={LoginScreen} options={{}} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerLeft: () => <></>}} />
        <Stack.Screen name="MyGames" component={MyGameScreen} options={{ headerLeft: () => <></>}}/>
        <Stack.Screen name="Signup" component={SignupScreen} options={{ headerLeft: () => <></>}}/>
        <Stack.Screen name="Friends" component={FriendsScreen} options={{ headerLeft: () => <></>}}/>
        <Stack.Screen name="Discover" component={DiscoverScreen} options={{ headerLeft: () => <></>}}/>
        <Stack.Screen name="Search" component={SearchScreen} options={{ headerLeft: () => <></>}}/>
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
