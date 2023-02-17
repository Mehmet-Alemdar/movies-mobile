import React, { useState, useEffect, useContext } from 'react'
import { Modal, Text, TouchableOpacity, StyleSheet, Dimensions, View, TextInput } from 'react-native'
import { useTheme } from '@react-navigation/native';

import { fetchUser } from '../lib/apiConnection'
import { AuthContext } from '../auth/Authentication'

const { width, height } = Dimensions.get('window')
import Input from './input'
import Button from './button'
import { updateUser } from '../lib/apiConnection'

const ModalUserUpdate = ({ visible, handleClose}) => {
  const [name, setName] = useState()
  const [surname, setSurname] = useState()
  const [user, setUser] = useState()
  const [loading, setLoading] = useState(true)

  const { colors } = useTheme()
  const { getUserIdAndToken } = useContext(AuthContext)

  useEffect(() => {
    getUserIdAndToken().then(({token, id}) => {
      fetchUser({token, id}).then(res => {
        setUser(res)
      })
    })
  }, [])

  useEffect(() => {
    if(user) {
      setName(user.name)
      setSurname(user.surname)
      setLoading(false)
    } else {
      setLoading(true)
    }
  }, [user])

  const handleUpdate = () => {
    getUserIdAndToken().then(({token, id}) => {
      console.log("token", token);
      console.log("id", id);
      console.log("user", user);
      updateUser({ token, id, body: {"name": name, "surname": surname} }).then(res => {
        console.log("res", res);
        handleClose()
      })
    })
  }

  return (
    <>
    {loading 
      ? (<Text>Loading...</Text>) 
      : (<Modal
        animationType="slide"
        transparent={true}
        visible={visible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView(colors.modalBackground)}>
            <Input placeholder="Name" value={name} onChangeText={setName} />
            <Input placeholder="Surname" value={surname} onChangeText={setSurname} />
            <Button onPress={() => handleUpdate()}>
              <Text style={styles.textStyle}>Update</Text>
            </Button>
            <Button onPress={() => handleClose()}>
              <Text style={styles.textStyle}>Close</Text>
            </Button>
          </View>
        </View>
      </Modal>)}
    </>

  )
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
  modalView: (background) =>  ({
    margin: 20,
    backgroundColor: background,
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  }),
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
})

export default ModalUserUpdate