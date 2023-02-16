import { useContext, useEffect, useState } from 'react'
import { View, Text, Image, SafeAreaView, StyleSheet, TouchableOpacity, Dimensions, ImageBackground } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { AuthContext } from '../auth/Authentication'
import { fetchMovies } from '../lib/apiConnection'
import { ScrollView } from 'react-native-gesture-handler'

const { width, height } = Dimensions.get('window')

const Home = () => {
  const [movies, setMovies] = useState([])
  const { signOut } = useContext(AuthContext)
  const { getToken } = useContext(AuthContext)


  useEffect(() => {
    getToken().then(token => {
      console.log("home token", token);
      fetchMovies({token}).then(res => {
        setMovies(res)
      })
    })
  }, [])

  useEffect(() => {
    console.log("movies", movies);
  }, [movies])

  const MovieCard = ({movie}) => {
    return (
      <View style={styles.movieContainer({height})}>
        <ImageBackground source={{uri: movie.image}} resizeMode="cover" style={styles.backgroundImage} blurRadius={5}>
          <View style={styles.movieCard}>
            <Image style={styles.movieImage({height})} source={{uri: movie.image}}/>
            <Text style={[styles.movieCardText({height}), {fontWeight: 'bold'}]}>{movie.name}</Text>
            <Text style={styles.movieCardText({height})}>{movie.type}</Text>
            <Text style={styles.movieCardText({height})}>{movie.director}</Text>
          </View>
        </ImageBackground>
      </View>
    )

  }

  return (
    <SafeAreaView style={{flex: 1}}>
      {!movies.length > 0 ?
      (<Text>Loading...</Text>) 
      : <ScrollView contentContainerStyle={{flex: 1, flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-start', }}>
        {
          movies.map((movie, key) => {
            return (
              <MovieCard key={key} movie={movie} />
            )
          })
        }
        </ScrollView>
      }
      {/* <TouchableOpacity onPress={() => signOut()}>
        <Text>Sign out</Text>
      </TouchableOpacity> */}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  movieContainer: ({height}) => ({
    width: '50%',
    height: height * 0.3,
  }),
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
  movieCard: {
    backgroundColor: '#000000c0', 
    height: '100%', 
    justifyContent: 'center',
     alignItems: 'center'
  },
  movieImage: ({height}) => ({
    width: 100,
    height: height*0.2, 
    resizeMode: 'contain'
  }),
  movieCardText: ({height}) => ({
    color: 'white',
    fontSize: height * 0.016,
  })
})


export default Home