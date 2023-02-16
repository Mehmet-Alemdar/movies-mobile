import { useState, useContext, useEffect } from 'react'
import { View, 
  Text, 
  TextInput, 
  SafeAreaView, 
  StyleSheet, 
  TouchableOpacity,
  Dimensions } from 'react-native'
import { showMessage } from "react-native-flash-message";
import AsyncStorage from '@react-native-async-storage/async-storage'

import { AuthContext } from '../auth/Authentication'
import { signInApi } from '../lib/apiConnection';

const { width, height } = Dimensions.get('window')

const SignIn = ({ navigation }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { signIn } = useContext(AuthContext)
  const { getToken } = useContext(AuthContext)

  const handlerSignIn = () => {
    signInApi("signin", {
      "email": email,
      "password": password
    }).then(res => {
      if(!res.error) {
        console.log("sign in res:", res);
        signIn({email: email, token: res.token})
        console.log('sign in success');
        return
      }
      showMessage({
        message: res.error,
        type: "info",
      });
    })
  }

  useEffect(() => {
    getToken().then(res => {
      console.log("sign in token", res);
    })
  }, [])

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText({width})}>Sign in</Text>
        </View>
        <View style={styles.formContainer}>
          <TextInput 
            placeholder="Email" 
            style={styles.input}
            onChangeText={setEmail}/>
          <TextInput 
            placeholder="Password" 
            style={styles.input}
            onChangeText={setPassword}/>
          <TouchableOpacity 
            style={styles.button}
            onPress={() => handlerSignIn()}>
            <Text style={styles.buttonText({width})}>Sign in</Text>
          </TouchableOpacity>
          <View style={styles.signUpContainer}>
            <Text style={{fontSize: width * 0.035}}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
              <Text style={styles.signUpText({width})}>Sign up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  titleText: ({width})=> ({
    fontSize: width * 0.08,
    fontWeight: 'bold',
    color: 'black'
  }),
  formContainer: {
    flex: 2,
    alignItems: 'center',
  },
  input: {
    width: '80%',
    height: height * 0.06,
    borderWidth: 1,
    borderColor: 'black',
    marginTop: 10,
    borderRadius: 3
  },
  button: {
    width: '80%',
    height: height * 0.06,
    backgroundColor: 'black',
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3
  },
  buttonText: ({width}) => ({
    color: 'white',
    fontSize: width * 0.05,
    fontWeight: '300'
  }),
  signUpContainer: {
    width: '80%',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 10
  },
  signUpText: ({width}) => ({
    fontSize: width * 0.035,
    color: 'black',
    fontWeight: 'bold'
  })
})

export default SignIn