import { useContext } from 'react'
import { View, Text, TextInput, SafeAreaView, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import { AuthContext } from '../auth/Authentication'

const Home = () => {
  const { signOut } = useContext(AuthContext)

  return (
    <View>
      <Text>Home</Text>
      <TouchableOpacity onPress={signOut}>
        <Text>Sign out</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Home