import React from 'react';
import { Button, Alert, StyleSheet, Text, View, Image, TextInput, ScrollView } from 'react-native';
import {Tab} from '@rneui/themed';
import { BottomNavigation } from 'react-native-paper';
export default function Navbar(){
    const [index, setIndex] = React.useState(0);
    return(
        <>
            <Text>Navbar</Text>
            <Tab
      value={index}
      onChange={(e) => setIndex(e)}
      indicatorStyle={{
        backgroundColor: 'white',
        height: 3,
      }}
      variant="primary"
    >
      <Tab.Item
        title="Recent"
        titleStyle={{ fontSize: 12 }}
        icon={{ name: 'timer', type: 'ionicon', color: 'white' }}
      />
      <Tab.Item
        title="favorite"
        titleStyle={{ fontSize: 12 }}
        icon={{ name: 'heart', type: 'ionicon', color: 'white' }}
      />
      <Tab.Item
        title="cart"
        titleStyle={{ fontSize: 12 }}
        icon={{ name: 'cart', type: 'ionicon', color: 'white' }}
      />
    </Tab>
        </>
    )
}
