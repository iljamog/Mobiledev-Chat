import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import ChatScreen from '../screens/ChatScreen'
import ProfileScreen from '../screens/ProfileScreen'
import MessagesScreen from '../screens/MessagesScreen'
import { DrawerContent } from './DrawerContent'

const Drawer = createDrawerNavigator()

export default function SignInStack() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={(props) => <DrawerContent {...props} />}
        screenOptions={{ headerShown: true, headerTitleAlign: 'center' }}
        initialRouteName='Messages'>
        <Drawer.Screen
          name='Chat'
          component={ChatScreen}
          options={({ route, navigation }) => ({
            title: route.params.chatId,
          })}
          initialParams={{ chatId: 'Chat 1' }}
        />
        <Drawer.Screen
          name='Profile'
          component={ProfileScreen}
          options={({ navigation }) => ({
            title: 'Profile',
          })}
        />
        <Drawer.Screen
          name='Messages'
          component={MessagesScreen}
          options={({ navigation }) => ({
            title: 'Messages',
          })}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  )
}
