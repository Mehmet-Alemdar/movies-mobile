import { useState, useContext, useEffect, useRef } from 'react'
import { View, 
  Text, 
  TextInput, 
  SafeAreaView, 
  StyleSheet, 
  TouchableOpacity,
  Dimensions,
  Animated } from 'react-native'
import { showMessage } from "react-native-flash-message";
import { useTheme } from '@react-navigation/native';

import { AuthContext } from '../auth/Authentication'
import { signInApi } from '../lib/apiConnection';
import SignUpBackgroundImage from '../components/signUpBackgroundImage';
import Input from '../components/input'
import Button from '../components/button'

const { width, height } = Dimensions.get('window')

const SignIn = ({ navigation }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { colors } = useTheme()

  const { signIn } = useContext(AuthContext)
  const { getToken } = useContext(AuthContext)

  const handlerSignIn = () => {
    signInApi("signin", {
      "email": email,
      "password": password
    }).then(res => {
      if(!res.error) {
        signIn({email: email, token: res.token, id: res.id})
        return
      }
      showMessage({
        message: res.error,
        type: "info",
        backgroundColor: colors.buttonBackground,
      });
    })
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <SignUpBackgroundImage>
        <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.5)'}}>
          <View style={styles.titleContainer}>
            <Text style={styles.titleText({width})}>Sign in</Text>
          </View>
          <View style={styles.formContainer}>
            <Input placeholder={"Email"} onChangeText={setEmail} />
            <Input placeholder={"Password"} onChangeText={setPassword} secureTextEntry={true} />
            <Button onPress={handlerSignIn}>
              <Text style={styles.buttonText({width})}>Sign in</Text>
            </Button>
            <View style={styles.signUpContainer}>
              <Text style={{fontSize: width * 0.035, color: colors.textColor}}>Don't have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
                <Text style={[styles.signUpText({width}), {color: colors.textColor}]}>Sign up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SignUpBackgroundImage>
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
    color: 'white'
  }),
  formContainer: {
    flex: 2,
    alignItems: 'center',
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