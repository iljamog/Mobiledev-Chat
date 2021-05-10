import React, { useEffect, useState, useLayoutEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  Switch,
  Form,
  TextInput,
} from 'react-native'
import { auth } from '../firebase'
import AsyncStorage from '@react-native-async-storage/async-storage'

const ProfileScreen = ({ navigation }) => {
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(function (user) {})
    // getDarkmode()
    return unsubscribe
  }, [])

  const [notes, setNotes] = useState('')

  useEffect(() => {
    const getNotes = async () => {
      try {
        const notesLS = await AsyncStorage.getItem('notes')
        if (notesLS) {
          setNotes(notesLS)
        }
      } catch (error) {
        // saving error
      }
    }
    getNotes()
  }, [])

  const handleChange = async (e) => {
    setNotes(e)
    try {
      console.log('setting notes')
      await AsyncStorage.setItem('notes', e.toString())
    } catch (error) {
      // saving error
    }
  }

  return (
    <View styles={styles.container}>
      <Image
        rounded
        source={{ uri: auth?.currentUser?.photoURL }}
        style={styles.profilePic}
        resizeMode={'cover'}
      />
      <TextInput
        multiline
        placeholder='Add notes here 📝'
        numberOfLines={10}
        onChangeText={(e) => handleChange(e)}
        value={notes ? notes : ''}></TextInput>
    </View>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  profilePic: {
    width: 200,
    height: 200,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 50,
    borderRadius: 200 / 2,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  switch: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 25,
  },
})
