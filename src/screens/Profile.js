import { useState, useEffect, useContext } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import { useTheme } from '@react-navigation/native';

import { fetchUser } from '../lib/apiConnection'
import { AuthContext } from '../auth/Authentication'

const { width, height } = Dimensions.get('window')

const Profile = () => {
  const [user, setUser] = useState()
  const [loading, setLoading] = useState(true)

  const { colors } = useTheme()

  const { getUserIdAndToken } = useContext(AuthContext)
  const { signOut } = useContext(AuthContext)

  useEffect(() => {
    getUserIdAndToken().then(({token, id}) => {
      fetchUser({token, id}).then(res => {
        setUser(res)
      })
    })
  }, [])

  useEffect(() => {
    if(user) {
      console.log("user", user);
      setLoading(false)
    } else {
      setLoading(true)
    }
  }, [user])

  
  return (
    <View style={stlyes.container}>
      {loading
        ? (<Text style={stlyes.text({height, colors})}>Loading...</Text>)
        : (<>
            <Text style={stlyes.text({height, colors})}>{user.name}</Text>
            <Text style={stlyes.text({height, colors})}>{user.surname}</Text>
            <TouchableOpacity onPress={() => signOut()} style={stlyes.button}>
              <Text style={stlyes.text({height, colors})}>Sign out</Text>
            </TouchableOpacity>
          </>)}
    </View>
  )
}

const stlyes = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: (({height, colors}) => ({
    fontSize: height * 0.02,
    color: colors.textColor
  })),
  button: {
    width: '80%',
    height: height * 0.06,
    backgroundColor: 'black',
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3
  },
})

export default Profile