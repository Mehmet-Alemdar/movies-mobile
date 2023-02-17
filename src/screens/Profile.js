import { useState, useEffect, useContext } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import { useTheme } from '@react-navigation/native';

import { fetchUser } from '../lib/apiConnection'
import { AuthContext } from '../auth/Authentication'
import ModalUserUpdate from '../components/modal'
import Button from '../components/button'

const { width, height } = Dimensions.get('window')

const Profile = () => {
  const [user, setUser] = useState()
  const [loading, setLoading] = useState(true)
  const [modalVisible, setModalVisible] = useState(false)

  const { colors } = useTheme()

  const { getUserIdAndToken } = useContext(AuthContext)
  const { signOut } = useContext(AuthContext)

  useEffect(() => {
    getUserIdAndToken().then(({token, id}) => {
      fetchUser({token, id}).then(res => {
        setUser(res)
      })
    })
  }, [modalVisible])

  useEffect(() => {
    if(user) {
      console.log("user", user);
      setLoading(false)
    } else {
      setLoading(true)
    }
  }, [user])

  const modalOpen = () => {
    setModalVisible(true)
  }

  const modalClose = () => {
    setModalVisible(false)
  }
  
  return (
    <View style={stlyes.container}>
      {loading
        ? (<Text style={stlyes.text({height, colors})}>Loading...</Text>)
        : (<>
            <Text style={stlyes.text({height, colors})}>{user.name}</Text>
            <Text style={stlyes.text({height, colors})}>{user.surname}</Text>
            <ModalUserUpdate visible={modalVisible} handleClose={modalClose} />
            <Button onPress={modalOpen}>
              <Text style={stlyes.text({height, colors})}>Update information</Text>
            </Button>
            <Button onPress={signOut}>
              <Text style={stlyes.text({height, colors})}>Sign out</Text>
            </Button>
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
})

export default Profile