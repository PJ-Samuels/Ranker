import React, {useEffect} from 'react';
import { Alert } from 'react-native';
import { Tab } from '@rneui/themed';
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Navbar() {
  const [index, setIndex] = React.useState(0);
  const navigation = useNavigation();
  const [password, setPass] = React.useState('');
  const [username, setUser] = React.useState('');

  const titles = ["Home", "Search", "Profile", "Discover", "Friends"];
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

    // You can add navigation logic here based on the selected index
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
    <>
      <Tab
        value={index}
        onChange={(selectedIndex) => changePage(selectedIndex)}
        indicatorStyle={{
          backgroundColor: 'white',
          height: 3,
        }}
        variant="primary"
      >
        {titles.map((title, tabIndex) => (
          <Tab.Item
            key={tabIndex}
            title={title}
            titleStyle={{ fontSize: 12 }}
            icon={{type: 'ionicon', color: 'white' }}
          />
        ))}
      </Tab>
    </>
  )
}
