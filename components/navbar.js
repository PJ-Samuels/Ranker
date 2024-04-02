import React from 'react';
import { Alert } from 'react-native';
import { Tab } from '@rneui/themed';
import { useNavigation } from "@react-navigation/native";

export default function Navbar() {
  const [index, setIndex] = React.useState(0);
  const navigation = useNavigation();

  const titles = ["Home", "Search", "Profile", "Discover", "Friends"];

  const changePage = (selectedIndex) => {
    setIndex(selectedIndex);
    // You can add navigation logic here based on the selected index
    switch (selectedIndex) {
      case 0:
        navigation.navigate('Home')
        break;
      case 1:
        navigation.navigate('Search')
        break;
      case 2:
        navigation.navigate('MyGames')
        break;
      case 3:
        navigation.navigate('Discover')
        break;
      case 4:
        navigation.navigate('Friends')
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
