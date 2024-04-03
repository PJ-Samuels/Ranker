import React, {useState, useEffect} from 'react';
import {Text,View} from 'react-native';
import Navbar from "./navbar";
import { Input, Icon, Button } from '@rneui/themed';

export default function Friends() {
    const [search, setSearch] = useState('');

    const onButtonPress = () => {
        console.log(search);
    }
    return(
        <View>
            <Text>Friends Page</Text>
            <Input placeholder = "Friend Search" onChangeText = {search => setSearch(search)}/>
            <Button title = "Search" onPress = {onButtonPress}/>
            <Navbar/>
        </View>
        )
}