import { useState, useContext } from 'react'
import { View, 
  Text, 
  TextInput, 
  SafeAreaView, 
  StyleSheet, 
  TouchableOpacity,
  Dimensions } from 'react-native'
import { showMessage } from 'react-native-flash-message'

import { useTheme } from '@react-navigation/native'

import { AuthContext } from '../auth/Authentication'
import { signUpApi } from '../lib/apiConnection'
import SignUpBackgroundImage from '../components/signUpBackgroundImage';
import Input from '../components/input'
import Button from '../components/button'

const { width, height } = Dimensions.get('window')

const SignUp = ({ navigation }) => {
  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
  const { colors } = useTheme()

  const { signIn } = useContext(AuthContext)

  const handlerSignUp = () => {
    signUpApi({name, surname, email, password})
    .then(res => {
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
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <Text style={styles.titleText({width})}>Sign up</Text>
          </View>
          <View style={styles.formContainer}>
            <Input placeholder={"Name"} onChangeText={setName} />
            <Input placeholder={"Surname"} onChangeText={setSurname} />
            <Input placeholder={"Email"} onChangeText={setEmail} />
            <Input placeholder={"Password"} onChangeText={setPassword} secureTextEntry={true}/>
            <Button onPress={handlerSignUp}>
              <Text style={styles.buttonText({width})}>Sign up</Text>
            </Button>
            <View style={styles.signInContainer}>
              <Text style={{fontSize: width * 0.035, color: colors.textColor}}>Do you already have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
                <Text style={[styles.signInText({width}), {color: colors.textColor}]}>Sign in</Text>
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
    backgroundColor: 'rgba(0,0,0,0.5)'
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
  signInContainer: {
    width: '80%',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 10
  },
  signInText: ({width}) => ({
    fontSize: width * 0.035,
    color: 'black',
    fontWeight: 'bold'
  })
})

export default SignUp