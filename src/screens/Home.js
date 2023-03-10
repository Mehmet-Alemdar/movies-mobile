import { useContext, useEffect, useState, useCallback } from 'react'
import { View, Text, Image, SafeAreaView, StyleSheet, RefreshControl, Dimensions, ImageBackground, ScrollView } from 'react-native'
import { useTheme } from '@react-navigation/native';

import { AuthContext } from '../auth/Authentication'
import { fetchMovies } from '../lib/apiConnection'

const { width, height } = Dimensions.get('window')

const wait = timeout => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const Home = () => {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false);
  const { getToken } = useContext(AuthContext)
  const { colors } = useTheme();

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(1000).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    if(refreshing) {
      getToken().then(token => {
        fetchMovies({token}).then(res => {
          setMovies(res)
          setLoading(false)
        })
      })
    }
  }, [refreshing])

  useEffect(() => {
    getToken().then(token => {
      fetchMovies({token}).then(res => {
        setMovies(res)
        setLoading(false)
      })
    })
  }, [])

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
    <SafeAreaView style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      {loading ?
      (<Text style={{color: "white"}}>Loading...</Text>) 
      : <ScrollView 
          contentContainerStyle={{flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-start', backgroundColor: colors.background }}
          refreshControl={
            <RefreshControl 
              refreshing={refreshing} 
              onRefresh={onRefresh} 
            />
          }>
        {
          movies.map((movie, key) => {
            return (
              <MovieCard key={key} movie={movie} />
            )
          })
        }
        </ScrollView>
      }
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  movieContainer: ({height}) => ({
    width: '50%',
    height: height * 0.35,
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
    width: 120,
    height: height*0.2, 
    resizeMode: 'contain',
    borderRadius: 8,
    marginBottom: 5
  }),
  movieCardText: ({height}) => ({
    color: 'white',
    fontSize: height * 0.016,
  })
})


export default Home