import { View, Text, StyleSheet, Dimensions } from 'react-native'
import { useTheme } from '@react-navigation/native'

const { width, height } = Dimensions.get('window')

const Splash = () => {
  const { colors } = useTheme()

  return (
    <View style={styles.container(colors.background)}>
      <View style={styles.box(colors.buttonBackground)}>
        <Text style={styles.text(colors.buttonBackground, height)}>Movies</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: (background) => ({
    flex: 1, 
    backgroundColor: background, 
    justifyContent: 'center', 
    alignItems: 'center'
  }),
  box: (background) => ({
    width: '70%', 
    borderTopWidth: 2, 
    borderBottomWidth: 2, 
    borderColor: background, 
    justifyContent: 'center', 
    alignItems: 'center',
    paddingVertical: 10
  }),
  text: (color, height) => ({
    fontSize: height * 0.08, 
    color: color, 
    fontWeight: 'bold'
  }),
})

export default Splash