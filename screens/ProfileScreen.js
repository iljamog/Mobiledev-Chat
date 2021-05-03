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
import { TouchableOpacity } from 'react-native-gesture-handler'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Input, Button } from 'react-native-elements'

const ProfileScreen = ({ navigation }) => {
  // const [darkMode, setDarkMode] = useState('')
  // const storeDarkmode = async (value) => {
  //   try {
  //     await AsyncStorage.setItem('darkMode', value.toString())
  //     setDarkMode(value)
  //   } catch (e) {
  //     // saving error
  //   }
  // }

  // const getDarkmode = async () => {
  //   try {
  //     const value = await AsyncStorage.getItem('darkMode')
  //     if (value === 'true') {
  //       setDarkMode(Boolean(value))
  //     } else {
  //       setDarkMode(false)
  //     }
  //     // }
  //   } catch (e) {
  //     console.log(e)
  //   }
  // }

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
      {/* <Switch
        trackColor={{ false: '#767577', true: '#81b0ff' }}
        thumbColor={darkMode ? '#f5dd4b' : '#ffffff'}
        ios_backgroundColor='#3e3e3e'
        onValueChange={() => storeDarkmode(!darkMode)}
        style={styles.switch}
        value={darkMode}
      /> */}
      <TextInput
        multiline
        placeholder='Add notes here 📝'
        numberOfLines={10}
        onChangeText={(e) => handleChange(e)}
        value={notes}></TextInput>
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
