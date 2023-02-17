import { TextInput, StyleSheet, Dimensions } from "react-native"
import { useTheme } from '@react-navigation/native'

const { height } = Dimensions.get('window')

const Input = ({ placeholder, value, onChangeText, secureTextEntry }) => {
  const { colors } = useTheme()

  return (
    <TextInput 
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      style={styles.input(colors.inputTextColor)}
    />
  )
}

const styles = StyleSheet.create({
  input: (color) => ( {
    width: '80%',
    height: height * 0.06,
    borderWidth: 1,
    borderColor: 'white',
    marginTop: 10,
    borderRadius: 3,
    backgroundColor: 'white',
    color: color,
  }),
})

export default Input