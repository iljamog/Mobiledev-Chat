import React from 'react'
import { View, StyleSheet } from 'react-native'
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer'
import { Avatar, Title, Drawer, Text } from 'react-native-paper'
import { auth } from '../firebase'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

export function DrawerContent(props) {
  const signOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace('Profile')
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={{ flexDirection: 'row', marginTop: 15 }}>
              <Avatar.Image
                source={{ uri: auth?.currentUser?.photoURL }}
                size={50}
              />
              <View
                style={{
                  marginLeft: 15,
                  marginBottom: 15,
                  flexDirection: 'column',
                }}>
                <Title style={styles.title}>
                  {auth?.currentUser?.displayName}
                </Title>
              </View>
            </View>
          </View>

          <Drawer.Section stlye={styles.drawerSection}>
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name='account-circle-outline' color={color} size={size} />
              )}
              label='Profile'
              onPress={() => {
                props.navigation.navigate('Profile')
              }}></DrawerItem>
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name='cog-outline' color={color} size={size} />
              )}
              label='Settings'
              onPress={() => {}}></DrawerItem>
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name='account-group-outline' color={color} size={size} />
              )}
              label='Friends'
              onPress={() => {}}></DrawerItem>
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name='chat-outline' color={color} size={size} />
              )}
              label='Chat'
              onPress={() => {
                props.navigation.navigate('Chat')
              }}></DrawerItem>
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({ color, size }) => (
            <Icon name='exit-to-app' color={color} size={size} />
          )}
          label='Sign Out'
          onPress={signOut}></DrawerItem>
      </Drawer.Section>
    </View>
  )
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 10,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
})
