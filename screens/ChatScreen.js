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
import { AntDesign, SimpleLineIcons, FontAwesome, Entypo  } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Avatar } from 'react-native-elements/dist/avatar/Avatar'
import { Audio } from 'expo-av'

const ChatScreen = ({ navigation }) => {
  const [messages, setMessages] = useState([])
  const [itemColor, setItemColor] = useState('black')
  const { currentTheme } = useTheme()
  const [recording, setRecording] = React.useState();
  // Customizing the input bar

  const customtInputToolbar = (props) => {
    return (
      <InputToolbar
        {...props}
        containerStyle={{
          flex: 1,
          backgroundColor: 'currentTheme.colors',
        }}
        accessoryStyle = {{
          
          borderWidth: 2,
          borderColor: 'red',
          width: '100%',
          height: '45%'
        }}
        primaryStyle = {{
          alignItems: 'flex-end',
        }}

      />
    )
  }

  // Mic and Camera icons below input line.
  const renderAccessory = (props) => (
      <View style={{ flexDirection:'row'}} >

        <View style={{flex:1}}>
          <TouchableOpacity 
          style = {{justifyContent:'center', alignItems:'center'}}
          onLongPress={() => startRecording()}
          onPressOut={() => stopRecording()}
          >
            <FontAwesome name="microphone" size={24} color="black" />
          </TouchableOpacity>
        </View>

        <View style={{flex:1}}>
          <TouchableOpacity style = {{ justifyContent:'center', alignItems:'center' }}>
            <Entypo name="camera" size={24} color="black" />
          </TouchableOpacity>
        </View>

      </View>
  )
  //functions for recording

  async function startRecording() {
    try {
      console.log('Requesting permissions..');
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      }); 
      console.log('Starting recording..');
      const recording = new Audio.Recording();
      await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
      await recording.startAsync(); 
      setRecording(recording);
      console.log('Recording started');
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }

  async function stopRecording() {
    console.log('Stopping recording..');
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    const uri = recording.getURI(); 
    console.log('Recording stopped and stored at', uri);
    
    // playRecording(uri);
  }

  // async function playRecording(uri){
  // const soundObject = new Audio.Sound()

  //           try {
  //             let source = uri
  //             await soundObject.loadAsync(source)
  //             await soundObject
  //               .playAsync()
  //               .then(async playbackStatus => {
  //                 setTimeout(() => {
  //                   soundObject.unloadAsync()
  //                 }, playbackStatus.playableDurationMillis)
  //               })
  //               .catch(error => {
  //                 console.log(error)
  //               })
  //           } catch (error) {
  //             console.log(error)
  //           }
  // }


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
      //renderActions={renderActions}
      renderAccessory={renderAccessory}
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
