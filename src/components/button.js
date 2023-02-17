import { TouchableOpacity, StyleSheet, Dimensions } from "react-native"
import { useTheme } from "@react-navigation/native"

const { height } = Dimensions.get('window')

const Button = ({ onPress, children }) => {
  const { colors } = useTheme()

  return (
    <TouchableOpacity 
      style={styles.button(colors.buttonBackground)}
      onPress={() => onPress()}>
      {children}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: (background) => ( {
    width: '80%',
    height: height * 0.06,
    backgroundColor: background,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3
  }),
})

export default Button