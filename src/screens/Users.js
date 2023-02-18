import { useEffect, useContext, useState, useCallback} from 'react';
import { View, Text, ScrollView, SafeAreaView, StyleSheet, Dimensions } from 'react-native'
import { useTheme, useFocusEffect } from '@react-navigation/native';

import { AuthContext } from '../auth/Authentication'
import { fetchUsers } from '../lib/apiConnection'

const { width, height } = Dimensions.get('window')

const Users = () => {
  const { colors } = useTheme();
  const { getToken } = useContext(AuthContext)
  const { getUserIdAndToken } = useContext(AuthContext)

  const [users, setUsers] = useState([])
  const [userId, setUserId] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getUserIdAndToken().then(({id}) => {
      setUserId(id)
    })
  }, [])

  useFocusEffect(
    useCallback(() => {
      getToken().then(token => {
        fetchUsers({token}).then(res => {
          setUsers(res)
        })
      })
    }, [])
  )

  useEffect(() => {
    if(users.length > 0) {
      setLoading(false)

    } else {
      setLoading(true)
    }
  }, [users])

  const UserCard = ({user}) => {
    return (
      <View style={styles.userCard}>
        <Text style={styles.userCardText({height})}>{user.name}</Text>
        <Text style={styles.userCardText({height})}>{user.surname}</Text>
        {userId === user._id &&
          <View style={{backgroundColor: colors.buttonBackground, paddingHorizontal:5, borderRadius:2}}>
            <Text style={{color: 'white'}}>You</Text>
          </View>
        }
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
    fontSize: height * 0.02,
    fontWeight: 300
  })
})

export default Users