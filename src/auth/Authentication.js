import React, { createContext, useReducer, useEffect, useMemo } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import AsyncStorage from '@react-native-async-storage/async-storage'

import SplashScreen from '../screens/Splash'
import MainNavigator from '../navigation/Main'
import AuthNavigator from '../navigation/Auth'

export const AuthContext = createContext()

const Stack = createStackNavigator()

const Authentication = () => {
  const [state, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          }
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  )

  useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken

      try {
        userToken = await AsyncStorage.getItem('userToken')
      } catch(e) {
        console.log("error fetching token");
      }

      dispatch({ type: 'RESTORE_TOKEN', token: userToken })
    }

    bootstrapAsync()
  }, [])

  const authContext = useMemo(() => ({
    signIn: async data => {
      try {
        await AsyncStorage.setItem('userToken', data.token)
      } catch(e) {
        console.log("error signing in", e);
      }
      dispatch({ type: 'SIGN_IN', token: data.token})
    },
    signOut: async () => {
      try {
        await AsyncStorage.removeItem('userToken')
      } catch(e) {
        console.log("error signing out", e);
      }
      dispatch({ type: 'SIGN_OUT' })
    },
    signUp: async (data) => {
      try {
        await AsyncStorage.setItem('userToken', data.token)
      } catch(e) {
        console.log("error signing up", e);
      }
      dispatch({ type: 'SIGN_IN', token: data.token})
    }
  }), [])

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator>
          {state.isLoading ? (
            <Stack.Screen name="Splash" component={SplashScreen} options={{headerShown: false}}/>
          ) : state.userToken == null ? (
            <Stack.Screen name="Auth" component={AuthNavigator} options={{headerShown: false}}/>
          ) : (
            <Stack.Screen name="Main" component={MainNavigator} options={{headerShown: false}}/>
          )
        }
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  )
}

export default Authentication