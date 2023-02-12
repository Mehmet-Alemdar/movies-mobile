import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import SignInScreen from '../screens/SignIn'
import SignUpScreen from '../screens/SignUp'

const Stack = createStackNavigator()

const AuthNavigator = () => {
  return(
    <Stack.Navigator>
      <Stack.Screen name="SignIn" component={SignInScreen} options={{headerShown: false}}/>
      <Stack.Screen name="SignUp" component={SignUpScreen} options={{headerShown: false}}/>
    </Stack.Navigator>
  )
}

export default AuthNavigator