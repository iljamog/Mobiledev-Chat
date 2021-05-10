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

//import { utils } from '@react-native-firebase/app'
import firebase from 'firebase/app'
import 'firebase/storage'
import moment from 'moment'

import {
  AntDesign,
  SimpleLineIcons,
  FontAwesome,
  Entypo,
  Feather,
} from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Avatar } from 'react-native-elements/dist/avatar/Avatar'
import { Audio } from 'expo-av'
import * as FileSystem from 'expo-file-system'

const ChatScreen = ({ route, navigation }) => {
  const [messages, setMessages] = useState([])
  const [itemColor, setItemColor] = useState('black')
  const [isRecording, setIsRecording] = useState(false)
  const [recording, setRecording] = useState(null)
  const [sound, setSound] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const { userName } = route.params

  // Recording settings
  const recordingSettings = {
    android: {
      extension: '.m4a',
      outputFormat: Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_MPEG_4,
      audioEncoder: Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_AAC,
      sampleRate: 44100,
      numberOfChannels: 2,
      bitRate: 128000,
    },
    ios: {
      extension: '.m4a',
      outputFormat: Audio.RECORDING_OPTION_IOS_OUTPUT_FORMAT_MPEG4AAC,
      audioQuality: Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_MIN,
      sampleRate: 44100,
      numberOfChannels: 2,
      bitRate: 128000,
      linearPCMBitDepth: 16,
      linearPCMIsBigEndian: false,
      linearPCMIsFloat: false,
    },
  }

  // Customizing the input bar - every part is separate - composer/menu below composer etc...

  const customtInputToolbar = (props) => {
    return (
      <InputToolbar
        {...props}
        containerStyle={{
          flex: 1,
          backgroundColor: 'currentTheme.colors',
        }}
        accessoryStyle={{
          borderWidth: 2,
          borderColor: 'red',
          width: '100%',
          height: '45%',
        }}
        primaryStyle={{
          alignItems: 'flex-end',
        }}
      />
    )
  }
  // Send icon props
  const renderSend = (props) => (
    <Send {...props}>
      <View
        style={{
          marginRight: 10,
          marginBottom: 8,
          marginLeft: '78%',
        }}>
        <Feather name='send' size={24} color='black' />
      </View>
    </Send>
  )

  // Mic and Camera icons below input line.
  const renderAccessory = (props) => (
    <View style={{ flexDirection: 'row' }}>
      <View style={{ flex: 1 }}>
        <TouchableOpacity
          style={{ justifyContent: 'center', alignItems: 'center' }}
          onLongPress={() => startRecording()}
          onPressOut={() => stopRecording()}>
          <FontAwesome name='microphone' size={24} color='black' />
        </TouchableOpacity>
      </View>

      <View style={{ flex: 1 }}>
        <TouchableOpacity
          style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Entypo name='camera' size={24} color='black' />
        </TouchableOpacity>
      </View>
    </View>
  )

  const renderMessageAudio = (props) => {
    const { currentMessage } = props
    const { sound: playbackObject } = async () => {
      await Audio.Sound.createAsync({ uri: url }, { shouldPlay: true })
    }
    //audiomessage bubble
    return (
      <View style={{ padding: 20 }}>
        <TouchableOpacity
          style={{ justifyContent: 'center', alignItems: 'center' }}>
          <AntDesign name='playcircleo' size={24} color='black' />
        </TouchableOpacity>
      </View>
    )
  }

  //functions for recording voice message

  const startRecording = async () => {
    // stop playback
    if (sound !== null) {
      await sound.unloadAsync()
      sound.setOnPlaybackStatusUpdate(null)
      setSound(null)
    }
    console.log('Requesting permissions..')
    await Audio.requestPermissionsAsync()

    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      playThroughEarpieceAndroid: false,
      staysActiveInBackground: true,
    })
    const _recording = new Audio.Recording()
    try {
      await _recording.prepareToRecordAsync(recordingSettings)
      setRecording(_recording)
      await _recording.startAsync()
      console.log('recording')
      setIsRecording(true)
    } catch (error) {
      console.log('error while recording:', error)
    }
  }

  const stopRecording = async () => {
    try {
      console.log('stopped')
      await recording.stopAndUnloadAsync()
    } catch (error) {
      // Do nothing -- we are already unloaded.
    }

    const info = await FileSystem.getInfoAsync(recording.getURI())
    console.log(`FILE INFO: ${JSON.stringify(info)}`)
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      playsInSilentLockedModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      playThroughEarpieceAndroid: false,
      staysActiveInBackground: true,
    })
    const { sound: _sound, status } = await recording.createNewLoadedSoundAsync(
      {
        isLooping: true,
        isMuted: false,
        volume: 1.0,
        rate: 1.0,
        shouldCorrectPitch: true,
      }
    )
    setSound(_sound)
    setIsRecording(false)

    // await _sound.playAsync();
    //   //Your sound is playing!
    // console.log('playing')
    //   //Don't forget to unload the sound from memory
    //   //when you are done using the Sound object
    // await _sound.unloadAsync();
    uploadAudio()
  }

  // uploading the audio recording to firebase storage

  const uploadAudio = async () => {
    const uri = recording.getURI()
    try {
      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest()
        xhr.onload = () => {
          try {
            resolve(xhr.response)
          } catch (error) {
            console.log('error:', error)
          }
        }
        xhr.onerror = (e) => {
          console.log(e)
          reject(new TypeError('Network request failed'))
        }
        xhr.responseType = 'blob'
        xhr.open('GET', uri, true)
        xhr.send(null)
      })
      if (blob != null) {
        const uriParts = uri.split('.')
        const fileType = uriParts[uriParts.length - 1]
        let time = moment().utcOffset('+03:00').format('DD.MM.YYYY hh:mm:ss a')
        const nameOfTheFile = auth?.currentUser?.displayName + ' ' + time
        firebase
          .storage()
          .ref(`/voice/`)
          .child(`${nameOfTheFile}.${fileType}`)
          .put(blob, {
            contentType: `audio/${fileType}`,
          }) // get url of the voice message
          .then(async () => {
            console.log('File sent!')
            const url = await firebase
              .storage()
              .ref(`/voice/${nameOfTheFile}.${fileType}`)
              .getDownloadURL()
            //console.log("uri:", url);

            // create a message with audio
            //onSend({text: url})
          })
          .catch((e) => console.log('error:', e))

        //link to file
      } else {
        console.log('erroor with blob')
      }
    } catch (error) {
      console.log('error:', error)
    }
  }

  const onSend = useCallback((messages = []) => {
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
    console.log(route)
  }, [])

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

  return (
    <GiftedChat
      messages={messages}
      showAvatarForEveryMessage={true}
      onSend={(messages) => onSend(messages)}
      renderInputToolbar={(props) => customtInputToolbar(props)}
      renderAccessory={renderAccessory}
      renderSend={renderSend}
      renderMessageAudio={renderMessageAudio}
      user={{
        _id: auth?.currentUser?.email,
        name: auth?.currentUser?.displayName,
        avatar: auth?.currentUser?.photoURL,
      }}
    />
  )
}

export default ChatScreen
