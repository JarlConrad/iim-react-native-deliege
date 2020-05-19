import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './src/views/Home';
import Scan from './src/views/Scan';
import Details from './src/views/Details';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function HomeStack() {
  return (
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Details" component={Details} />
        {/*<Stack.Screen name="FullImage" component={FullImage} />*/}
      </Stack.Navigator>
  );
}

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isReady: false,
    };
  }

  render() {
    return (
        <NavigationContainer>
          <Tab.Navigator>
            <Tab.Screen name="Home" component={HomeStack} />
            <Tab.Screen name="Scan" component={Scan} />
          </Tab.Navigator>
        </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
