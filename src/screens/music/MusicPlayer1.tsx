import { VStack, HStack, Text,  ScrollView, IconButton, } from 'native-base';
import React,{useEffect,useState,useRef} from 'react';

import { Animated, Dimensions, FlatList, GestureResponderEvent, ImageBackground, SafeAreaView, StyleSheet, View } from 'react-native';
import { CardAnotation } from '../../components/CardAnotation';
import { CardMusic } from '../../components/CardMusic';
import { Image,TouchableOpacity, } from 'react-native';
import { Globe, ArrowLeft,SkipBack, SkipForward, Pause, Timer, Repeat, Play } from 'phosphor-react-native';
import { useNavigation } from '@react-navigation/native';

import songs from '../../model/Data';
import {Audio}from 'expo-av'

import Slider from '@react-native-community/slider';


const {width, height} = Dimensions.get('window');




export function MusicPlayer1() {
const navigation = useNavigation();



const [songIndex, setsongIndex] = useState(0);

const scrollX = useRef(new Animated.Value(0)).current;

useEffect(()=> {
  Audio.setAudioModeAsync({
		allowsRecordingIOS: false,
		// interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
		playsInSilentModeIOS: true, 
	//	interruptionModeAndroid: Audio.INTTERUPTION_MODE_ANDROID_DUCK_OTHERS,
		shouldDuckAndroid: true,
		staysActiveInBackground: true,
	//	playsThroughEarpieceAndroid: true, 
	});
	
	this.sound = new Audio.Sound();
	
	const status = {
		shouldPlay: false
	};
  this.sound.loadAsync(require("../../assets/audio/gabrielenjoadinho.mp3"), status, false);

  scrollX.addListener(({value}) =>{
    const index = Math.round(value/width);
    setsongIndex(index)

})



},[])

 function playSound() {
	this.sound.playAsync();
}
function handleNewOrder() {
  navigation.navigate("home");
}

  
  const renderSongs = ({item, index}) => {
    return (
     <Animated.View style={styles.mainImageWrapper}>
       <View style={[styles.imageWrapper, styles.elevation]}>
          <Image
           
            source={item.artwork} 
            style={styles.musicImage}
          />
        </View>

     </Animated.View>
       
 
    );
 };


return(
  <SafeAreaView style={styles.container}> 
  
    <ScrollView bg="#180F34"
    marginBottom={10}
    >
   
        <VStack   bg="#180F34"
         >
       <ImageBackground source={require('../../assets/images/sleepbg.png')} resizeMode="cover" style={styles.image}>
        <HStack marginTop={10} paddingX={4} style={styles.title} >

          <IconButton
                  marginTop = {-1}
                icon={<ArrowLeft  color="#FFFFFF" size={28} />}
                 onPress={handleNewOrder}
              />
          <Text
            marginBottom={2}
            fontFamily={'bold'} 
           
            color={'#FFFFFF'}
            fontSize={20}>
            Título da música
          </Text>
  
          < Image   style={styles.imageLogo} source={require('../../assets/images/moonalone.png')} />

        </HStack>
        </ImageBackground>
        </VStack>
           
           <VStack style={styles.mainContainer} >
            {/* IMAGEM*/}

           {/* <VStack style={styles.imageWrapper}>
          < Image   style={[styles.musicImage, styles.elevation]} source={require('../../assets/images/larGATA.jpeg')} />
          </VStack> */}

           <Animated.FlatList 
              renderItem={renderSongs}
          
              data={songs}
              keyExtractor={item => item.id}
              horizontal
              pagingEnabled
              scrollEventThrottle={16}
              showsHorizontalScrollIndicator={false}
              onScroll={Animated.event(
                [
                  {
                    nativeEvent : {
                      contentOffset : {x : scrollX},
                    }
                  }
                ],
                {useNativeDriver: true},
              )}
          /> 

          <Text style={[styles.songContent, styles.songTitle]}>
            {songs[songIndex].title}
          </Text>
             
         {/* SLIDER */}

         <VStack>
          <Slider 
          style= {styles.progressBar}
            value={10}
            minimumValue={0}
            maximumValue={100}
            thumbTintColor="#FFD369"
            minimumTrackTintColor="#FFD369"
            maximumTrackTintColor="#fff"
            onSlidingComplete={() =>{}}
            />


            {/* music duration  */}

            <HStack style={styles.progressLevelDuration}>
              <Text style={styles.progressLabelText}>00:00  </Text>
              <Text style={styles.progressLabelText}>00:00   </Text> 
            
            
            </HStack>
         </VStack>

          {/* Icons Controls  */}
        <HStack marginTop={50} style={styles.musicControlsContainer}>
        <TouchableOpacity onPress={() => {}}>

        <IconButton
                 marginLeft={10}
                icon={<SkipBack  color="#FFFFFF" size={28} />}
                 onPress={handleNewOrder}
              />
</TouchableOpacity>

           <TouchableOpacity onPress={() =>{}}>
              <IconButton
                  
                  icon={<Play   color="#FFFFFF" size={28} />}
                   onPress={playSound}
                />
</TouchableOpacity>
        
               <TouchableOpacity onPress={() => {}}>
               <IconButton
                   marginRight={10}
                  icon={<SkipForward color="#FFFFFF" size={28} />}
                   onPress={handleNewOrder}
                />
               </TouchableOpacity>
        
             
        </HStack>

        <HStack marginLeft={150}>
        <TouchableOpacity onPress={() => {}}>

        <IconButton
                  marginTop={180}
                 icon={<Timer color="#FFFFFF" size={32} />}
                  onPress={handleNewOrder}
               />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => {}}>
            <IconButton
                  marginTop={180}
                 icon={<Repeat color="#FFFFFF" size={32} />}
                  onPress={handleNewOrder}
               />
               </TouchableOpacity>
        </HStack>
          
        
          
           </VStack>
          
     
     
        
    </ScrollView>
   
    </SafeAreaView>


)
}

const styles = StyleSheet.create({
  title: {
    color: "#FFFFFF",
    flexDirection: "row",
    justifyContent: "space-between"
    
  },
  secondtitle:{
    color: "#FFFFFF",
    
    alignContent: "center",
   
  },
  container: {
    flex:1,
    color: "#FFFFFF",
  },
  imageLogo:{
      width: 35,
      height: 35,
    
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  bottomSection: {
    borderTopColor: '#393E46',
    borderWidth: 1,
    width: width,
    alignItems: 'center',
    paddingVertical: 15,
  },
  bottomIconContainer: {
    alignContent: 'center',
    alignItems: 'center',
    flex: 1,
    
  },mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  mainWrapper: {
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
  },
  imageWrapper: {
    width: 300,
    height: 340,
    marginBottom: 20,
 
    marginTop: 20, 
  },
  mainImageWrapper: {
    width: width,
    justifyContent:'center',
    alignItems: 'center',
 
    marginTop: 20, 
  },
  musicImage: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
  },
  elevation: {
    elevation: 5,

    shadowColor: '#ccc',
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
  },
  songContent: {
    textAlign: 'center',
    color: '#EEEEEE',
  },
  songTitle: {
    fontSize: 18,
    fontWeight: '600',
  },

  songArtist: {
    fontSize: 16,
    fontWeight: '300',
  },
  progressBar: {
    width: 350,
    height: 40,
    marginTop: 25,
    flexDirection: 'row',
  },
  progressLevelDuration: {
    width: 340,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressLabelText: {
    color: '#FFF',
   
  },
  musicControlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 30,
    width: '90%',
  },
});
