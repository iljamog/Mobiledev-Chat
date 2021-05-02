import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer, StackActions } from '@react-navigation/native'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ChatScreen from './screens/ChatScreen'
import ProfileScreen from './screens/ProfileScreen'
import { AppearanceProvider, useColorScheme } from 'react-native-appearance'
import { DefaultTheme, DarkTheme } from '@react-navigation/native'

const Stack = createStackNavigator()

export default function App() {
  const scheme = useColorScheme()
  return (
    <AppearanceProvider>
      <NavigationContainer theme={DefaultTheme}>
        <Stack.Navigator screenOptions={{ headerTitleAlign: 'center' }}>
          <Stack.Screen name='Login' component={LoginScreen} />
          <Stack.Screen name='Register' component={RegisterScreen} />
          <Stack.Screen name='Chat' component={ChatScreen} />
          <Stack.Screen name='Profile' component={ProfileScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </AppearanceProvider>
  )
}
