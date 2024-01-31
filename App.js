import { StatusBar } from 'expo-status-bar';
import { Button, Alert,StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Video Game Rater</Text>
      <StatusBar style="auto" />
      <Button
        title="Press me"
        color = "blue"
        onPress={() => Alert.alert('Simple Button pressed')}
      />
    </View>
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
