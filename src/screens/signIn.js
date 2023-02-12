import { View, 
  Text, 
  TextInput, 
  SafeAreaView, 
  StyleSheet, 
  TouchableOpacity,
  Dimensions } from 'react-native'

const { width, height } = Dimensions.get('window')

const SignIn = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText({width})}>SignIn</Text>
        </View>
        <View style={styles.formContainer}>
          <TextInput 
            placeholder="Email" 
            style={styles.input}/>
          <TextInput 
            placeholder="Password" 
            style={styles.input}/>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText({width})}>Sign in</Text>
          </TouchableOpacity>
          <View style={styles.signUpContainer}>
            <Text style={{fontSize: width * 0.035}}>Don't have an account? </Text>
            <TouchableOpacity>
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
    flex: 1,
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