import { useState, useEffect, useRef } from "react"
import { ImageBackground, StyleSheet, Animated } from "react-native"

const SignUpBackgroundImage = ({children}) => {
  const [count, setCount] = useState(0)
  const backgroundImages = [
    'https://static.wikia.nocookie.net/whumpapedia/images/3/3a/John_Wick_%282014%29.jpg/revision/latest?cb=20210413155139', 
    'https://m.media-amazon.com/images/M/MV5BMTg4ODkzMDQ3Nl5BMl5BanBnXkFtZTgwNTEwMTkxMDE@._V1_.jpg',
    'https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_.jpg',
    'https://upload.wikimedia.org/wikipedia/tr/9/91/VOL-%C4%B0.png',
    'https://upload.wikimedia.org/wikipedia/commons/b/b5/12_Angry_Men_%281957_film_poster%29.jpg'
  ]

  // setTimeout(() => {
  //   if(count < backgroundImages.length - 1) {
  //     setCount(count + 1)
  //   } else {
  //     setCount(0)
  //   }
  // }, 5000)

  useEffect(() => {
    const interval = setInterval(() => {
      if(count < backgroundImages.length - 1) {
        setCount(count + 1)
      } else {
        setCount(0)
      }
    }, 15000);
    return () => clearInterval(interval);
  }, [count]);

  return (
    <ImageBackground 
      source={{uri: backgroundImages[count]}}
      resizeMode="cover" 
      style={styles.container}
      blurRadius={5}>
      {children}
   </ImageBackground>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default SignUpBackgroundImage