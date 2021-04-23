import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer, StackActions} from '@react-navigation/native';
import loginScreen from './screens/loginScreen';
import registerScreen from './screens/registerScreen';

const stack = createStackNavigator();


export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name ="Login" component = {loginScreen}/>
          <Stack.Screen name ="Register" component = {registerScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
    
  );
}
