import { View, 
  Text, 
  TextInput, 
  SafeAreaView, 
  StyleSheet, 
  TouchableOpacity,
  Dimensions } from 'react-native'

const { width, height } = Dimensions.get('window')

const SignUp = ({ navigation }) => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText({width})}>Sign up</Text>
        </View>
        <View style={styles.formContainer}>
          <TextInput 
            placeholder="Name" 
            style={styles.input}/>
          <TextInput 
            placeholder="Surname" 
            style={styles.input}/>
          <TextInput 
            placeholder="Email" 
            style={styles.input}/>
          <TextInput 
            placeholder="Password" 
            style={styles.input}/>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText({width})}>Sign up</Text>
          </TouchableOpacity>
          <View style={styles.signInContainer}>
            <Text style={{fontSize: width * 0.035}}>Do you already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
              <Text style={styles.signInText({width})}>Sign in</Text>
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