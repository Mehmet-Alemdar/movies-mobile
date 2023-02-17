import React, { createContext, useReducer, useEffect, useMemo } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { MyTheme } from '../lib/theme'

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
            userId: action.id,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
            userId: action.id
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
            userId: null
          }
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
      userId: null
    }
  )

  useEffect(() => {
    const bootstrapAsync = async () => {
      let user
      try {
        user = JSON.parse(await AsyncStorage.getItem('user'))
        console.log("bootstrap user", user);
      } catch(e) {
        console.log("error fetching token");
      }

      dispatch({ type: 'RESTORE_TOKEN', token: user?.token, id: user?.id })
    }

    bootstrapAsync()
  }, [])

  const authContext = useMemo(() => ({
    signIn: async data => {
      try {
        console.log("sign in data", data);
        await AsyncStorage.setItem('user', JSON.stringify(data))
      } catch(e) {
        console.log("error signing in", e);
      }
      dispatch({ type: 'SIGN_IN', token: data.token, id: data.id})
    },
    signOut: async () => {
      try {
        await AsyncStorage.removeItem('user')
      } catch(e) {
        console.log("error signing out", e);
      }
      dispatch({ type: 'SIGN_OUT' })
    },
    signUp: async (data) => {
      try {
        await AsyncStorage.setItem('user', JSON.stringify(data))
      } catch(e) {
        console.log("error signing up", e);
      }
      dispatch({ type: 'SIGN_IN', token: data.token, id: data.id})
    },
    getToken: async () => {
      try {
        const token = await state.userToken
        return token
      } catch (error) {
        console.log("error getting token", error);
        return {error: error}
      }
    },
    getUserIdAndToken: async () => {
      try {
        const id = await state.userId
        const token = await state.userToken
        return { id, token }
      } catch (error) {
        console.log("error getting user id", error);
        return {error: error}
      }
    }
  }), [state.userToken, state.userId])

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer theme={MyTheme}>
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