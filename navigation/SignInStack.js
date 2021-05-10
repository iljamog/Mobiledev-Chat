import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import ChatScreen from '../screens/ChatScreen'
import ProfileScreen from '../screens/ProfileScreen'
import { DrawerContent } from './DrawerContent'

const Drawer = createDrawerNavigator()

export default function SignInStack() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={(props) => <DrawerContent {...props} />}
        screenOptions={{ headerShown: true, headerTitleAlign: 'center' }}>
        <Drawer.Screen
          name='Chat'
          component={ChatScreen}
          options={({ navigation }) => ({
            title: 'Chat',
          })}
        />
        <Drawer.Screen
          name='Profile'
          component={ProfileScreen}
          options={({ navigation }) => ({
            title: 'Profile',
          })}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  )
}
