import React from 'react'
import { View, Text } from 'react-native'
import { Input, Button } from 'react-native-elements';

const loginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    return (
        <View styles = {styles.container}>
           <Input
           placeholder = "Your e-mail adress"
           label = "Email"
           leftIcon = {{type:'material',name:'email'}}
           value = {email}
           onChangeText = {text => setEmail(text)}
           />
           <Input
           placeholder = "Your password"
           label = "Password"
           leftIcon = {{type:'material',name:'lock'}}
           value = {password}
           onChangeText = {text => setPassword(text)}
           secureTextEntry
           />
           <Button title="Sign in" style={style.button}/>
           <Button title="Register" style={style.button} 
           onPress ={()=> navigation.navigate('Register')}/>
        </View>
    )
}

export default loginScreen

const styles = StyleSheet.create({

    button: {
        width: 200,
        marginTop: 10
    },
    container: {
        flex: 1,
        alightItems: 'center',
        padding: 10
    }
})
