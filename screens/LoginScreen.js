import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Input, Button } from 'react-native-elements'
import { auth } from '../firebase'

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const signIn = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user
        // ...
      })
      .catch((error) => {
        var errorCode = error.code
        var errorMessage = error.message
      })
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(function (user) {
      navigation.canGoBack() && navigation.popToTop()
      // No user is signed in.
    })

    return unsubscribe
  }, [])

  return (
    <View styles={styles.container}>
      <View>
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
      </View>
      <View style={styles.buttonContainer}>
        <Button title='Sign in' onPress={signIn} style={styles.button} />
        <Button
          title='Register'
          style={styles.button}
          buttonStyle={{ marginTop: 20 }}
          onPress={() => navigation.navigate('Register')}
        />
      </View>
    </View>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  button: {
    //width: 200,
    width: '100%',
    borderRadius: 25,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },
  buttonContainer: {
    marginTop: 20,
    width: '50%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
})
