import { useEffect, useContext, useState } from 'react';
import { View, Text, ScrollView, SafeAreaView, StyleSheet, Dimensions } from 'react-native'
import { useTheme } from '@react-navigation/native';

import { AuthContext } from '../auth/Authentication'
import { fetchUsers } from '../lib/apiConnection'

const { width, height } = Dimensions.get('window')

const Users = () => {
  const { colors } = useTheme();
  const { getToken } = useContext(AuthContext)

  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getToken().then(token => {
      fetchUsers({token}).then(res => {
        setUsers(res)
      })
    })
  }, [])

  useEffect(() => {
    if(users.length > 0) {
      setLoading(false)
    }
  }, [users])

  const UserCard = ({user}) => {
    return (
      <View style={styles.userCard}>
        <Text style={styles.userCardText({height})}>{user.name}</Text>
        <Text style={styles.userCardText({height})}>{user.surname}</Text>
      </View>
    )
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.background}}>
      {loading 
        ? (<Text style={{color: '#fff'}}>Loading...</Text>)
        : (<ScrollView>
            {users.map((user, key) => (
              <UserCard key={key} user={user} />
            ))}
        </ScrollView>)}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  userCard:{
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
    marginTop: 10,
    padding: 10,
    flexDirection: 'row',
    gap: 20
  },
  userCardText: ({height}) => ({
    color: '#fff',
    fontSize: height * 0.02
  })
})

export default Users