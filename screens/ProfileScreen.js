import React, { useEffect, useState, useLayoutEffect } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { Input, Button } from 'react-native-elements'
import { auth } from '../firebase'
import { AntDesign } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native-gesture-handler'

const ProfileScreen = ({ navigation }) => {
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(function (user) {})

    return unsubscribe
  }, [])

  return (
    <View styles={styles.container}>
      <Image
        rounded
        source={{ uri: auth?.currentUser?.photoURL }}
        style={styles.profilePic}
        resizeMode={'cover'}
      />
    </View>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  profilePic: {
    width: 200,
    height: 200,
    borderRadius: '50%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 50,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
})
