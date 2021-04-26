import React, { useLayoutEffect, useState, useCallback, useEffect } from 'react'
import { View, Text, Touchable, Image } from 'react-native'
import { useTheme } from '@react-navigation/native'
import {
  GiftedChat,
  InputToolbar,
  Actions,
  Send,
} from 'react-native-gifted-chat'
import { auth, db } from '../firebase'
import { AntDesign, SimpleLineIcons } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Avatar } from 'react-native-elements/dist/avatar/Avatar'
import { Audio } from 'expo-av'

const ChatScreen = ({ navigation }) => {
  const [messages, setMessages] = useState([])
  const [recording, setRecording] = useState()
  const [itemColor, setItemColor] = useState('black')
  const { currentTheme } = useTheme()

  // Customizing the input bar

  const customtInputToolbar = (props) => {
    return (
      <InputToolbar
        {...props}
        containerStyle={{
          backgroundColor: 'currentTheme.colors',
        }}
      />
    )
  }

  // menu next to text input area
  const renderActions = (props) => (
    <Actions
      {...props}
      containerStyle={{
        width: 44,
        height: 44,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 4,
        marginRight: 4,
        marginBottom: 0,
      }}
      icon={() => <SimpleLineIcons name='menu' size={24} color={itemColor} />}
      options={{
        'Voice record': async function startRecording() {
          try {
            console.log('Requesting permissions..')
            await Audio.requestPermissionsAsync()
            await Audio.setAudioModeAsync({
              allowsRecordingIOS: true,
              playsInSilentModeIOS: true,
            })
            console.log('Starting recording..')
            const recording = new Audio.Recording()
            await recording.prepareToRecordAsync(
              Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
            )
            await recording.startAsync()
            setRecording(recording)
            console.log('Recording started')
          } catch (err) {
            console.error('Failed to start recording', err)
          }
        }, // function for file pick or take pic
        'Send Image': () => {
          console.log('An image')
        },
        Cancel: () => {
          console.log('Cancel')
        },
      }}
      optionTintColor='#222B45'
    />
  )

  const onSend = useCallback((messages = []) => {
    // messages[0].text = 'test'
    // console.log(messages[0].text)
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    )
    const { _id, createdAt, text, user } = messages[0]
    db.collection('chats').add({
      _id,
      createdAt,
      text,
      user,
    })
  }, [])

  const signOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace('Login')
      })
      .catch((error) => {
        // An error happened.
      })
  }

  // const toProfileScreen = () => {
  //   navigation.replace('Profile')
  // }

  useLayoutEffect(() => {
    const unsubscribe = db
      .collection('chats')
      .orderBy('createdAt', 'desc')
      .onSnapshot((snapshot) =>
        setMessages(
          snapshot.docs.map((doc) => ({
            _id: doc.data()._id,
            createdAt: doc.data().createdAt.toDate(),
            text: doc.data().text,
            user: doc.data().user,
          }))
        )
      )
    return unsubscribe
  }, [])

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity style={{ marginLeft: 10 }}>
          <Avatar
            rounded
            source={{ uri: auth?.currentUser?.photoURL }}
            onPress={() => navigation.navigate('Profile')}
            avatarStyle={{
              borderWidth: 1,
              borderColor: 'white',
            }}
          />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity
          style={{
            marginRight: 15,
          }}
          onPress={signOut}>
          <AntDesign name='logout' size={24} color={itemColor} />
        </TouchableOpacity>
      ),
    })
  }, [])

  useEffect(() => {
    if (currentTheme !== undefined) {
      setItemColor(currentTheme.text)
    }
  }, [currentTheme])

  return (
    <GiftedChat
      messages={messages}
      showAvatarForEveryMessage={true}
      onSend={(messages) => onSend(messages)}
      renderInputToolbar={(props) => customtInputToolbar(props)}
      renderActions={renderActions}
      // textProps={{ style: { color: colors.text } }}
      user={{
        _id: auth?.currentUser?.email,
        name: auth?.currentUser?.displayName,
        avatar: auth?.currentUser?.photoURL,
      }}
    />
  )
}

export default ChatScreen
