import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Input, Button } from 'react-native-elements'
import { auth } from '../firebase'

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [imageURL, setImageURL] = useState('')
  // sign up function
  const register = () => {
    // auth located in firebase.js
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user
        user
          .updateProfile({
            displayName: name,
            photoURL: imageURL
              ? imageURL
              : 'http://cdn.onlinewebfonts.com/svg/img_258083.png',
          })
          .then(function () {
            // Update successful.
          })
          .catch(function (error) {
            // An error happened.
          })
        // ...
        navigation.popToTop()
      })
      .catch((error) => {
        var errorCode = error.code
        var errorMessage = error.message
        // ..
      })
  }

  return (
    <View styles={styles.container}>
      <Input
        placeholder='Your name'
        label='Name'
        leftIcon={{ type: 'material', name: 'badge' }}
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <Input
        placeholder='Your e-mail adress'
        label='Email'
        leftIcon={{ type: 'material', name: 'email' }}
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <Input
        placeholder='Your password'
        label='Password'
        leftIcon={{ type: 'material', name: 'lock' }}
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />
      <Input
        placeholder='Your image URL'
        label='Profile picture'
        leftIcon={{ type: 'material', name: 'face' }}
        value={imageURL}
        onChangeText={(text) => setImageURL(text)}
      />
      <Button title='register' onPress={register} style={styles.button} />
    </View>
  )
}

export default RegisterScreen

const styles = StyleSheet.create({
  button: {
    width: 200,
    marginTop: 10,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },
})
