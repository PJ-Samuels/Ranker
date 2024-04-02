import React, { useEffect, useState, useSyncExternalStore } from "react";
import { Button, Alert, StyleSheet, Text, View, Image, TextInput, ScrollView } from 'react-native';
import Navbar from "./navbar";
export default function MyGame() {
    
    return (
        <View>
            <Text>My Games</Text>
            <Navbar/>
        </View>
    )
}