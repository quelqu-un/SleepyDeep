import { VStack, HStack, Text, ScrollView, IconButton, Actionsheet, useDisclose } from 'native-base';
import React, { useEffect, useState, useRef } from 'react';

import { Animated, Dimensions, FlatList, GestureResponderEvent, ImageBackground, SafeAreaView, StyleSheet, View } from 'react-native';
import { CardAnotation } from '../../components/CardAnotation';
import { CardMusic } from '../../components/CardMusic';
import { Image, TouchableOpacity, } from 'react-native';
import { Globe, ArrowLeft, SkipBack, SkipForward, Pause, Timer, Repeat, Play, Check } from 'phosphor-react-native';
import { useNavigation } from '@react-navigation/native';

// import songs from '../../model/Data';
import { Audio } from 'expo-av'

import Slider from '@react-native-community/slider';

const { width } = Dimensions.get('window');

const songs = [
  require('../../assets/audio/aboutu.mpeg'),
  require('../../assets/audio/enjoadinho.mp4'),
];

export function MusicPlayer1() {
  const {
    isOpen,
    onOpen,
    onClose
  } = useDisclose();

  const _30MIN = 1800000;
  const _1H = 3600000;
  const _6H = 21600000;
  
  const navigation = useNavigation();

  let TimerControl = function(callback, delay) {
    let timerId, start, remaining = delay;

    this.pause = function() {
      window.clearTimeout(timerId);
      timerId = null;
      remaining -= Date.now() - start;
    };

    this.resume = function() {
      if(timerId) {
        return;
      }

      start = Date.now();
      timerId = window.setTimeout(callback, remaining);
    };

    this.resume();
  }

  const [playPause, setplayPause] = useState(false);
  const [musicIndex, setMusicIndex] = useState(0);
  const [musicCheck, setMusicCheck] = useState(true);
  const [timerControl, setTimerControl] = useState<any>(new TimerControl(function() {
    pauseTimer();
  }, _1H));
  const [options, setOptions] = useState(_1H);

  useEffect(() => {
    if(musicCheck) {
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
        shouldPlay: true,
        isLooping: true,
      };
      
      this.sound.loadAsync(songs[musicIndex], status, false);

      setMusicCheck(false);
    }
    
    if(!musicCheck) {
      const status = {
        shouldPlay: true,
        isLooping: true
      };
      this.sound.unloadAsync();
      this.sound.loadAsync(songs[musicIndex], status, false);
      this.sound.playAsync();
    }
  }, [musicIndex]);

  function playSound() {
    if(playPause) {
      this.sound.playAsync();
      if(timerControl!== null) {
        timerControl.resume();
      }
    } else {
      this.sound.pauseAsync();
      if(timerControl!== null) {
        timerControl.pause();
      }
    }
    setplayPause(!playPause);
  }

  function nextMusic() {
    this.sound.pauseAsync();
    if(musicIndex === (songs.length-1)) {
      setMusicIndex(0);
    } else {
      setMusicIndex(musicIndex + 1);
    }
  }

  function backMusic() {
    this.sound.pauseAsync();
    if(musicIndex === 0) {
      setMusicIndex(songs.length-1);
    } else {
      setMusicIndex(musicIndex-1);
    }
  }

  function pauseTimer() {
    this.sound.pauseAsync();
    setplayPause(!playPause);
    setTimerControl(null);
  }

  function hadleGoBack() {
    navigation.goBack();
    this.sound.unloadAsync();
  }

  function setTimeOptions(time) {
    setOptions(time);

    setTimerControl(new TimerControl(function() {
      pauseTimer();
    }, time));

    onClose();
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView bg="#180F34"
        marginBottom={10}
      >
        <VStack bg="#180F34"
        >
          <ImageBackground source={require('../../assets/images/sleepbg.png')} resizeMode="cover" style={styles.image}>
            <HStack marginTop={10} paddingX={4} style={styles.title} >

              <IconButton
                marginTop={-1}
                icon={<ArrowLeft color="#FFFFFF" size={28} />}
                onPress={hadleGoBack}
              />
              <Text
                marginBottom={2}
                fontFamily={'bold'}

                color={'#FFFFFF'}
                fontSize={20}>
                Título da música
              </Text>

              < Image style={styles.imageLogo} source={require('../../assets/images/moonalone.png')} />

            </HStack>
          </ImageBackground>
        </VStack>

        <VStack style={styles.mainContainer} >

          <Text style={[styles.songContent, styles.songTitle]}>
            gabriel
          </Text>

          {/* SLIDER */}

          <VStack>
            <Slider
              style={styles.progressBar}
              value={10}
              minimumValue={0}
              maximumValue={100}
              thumbTintColor="#FFD369"
              minimumTrackTintColor="#FFD369"
              maximumTrackTintColor="#fff"
              onSlidingComplete={() => { }}
            />


            {/* music duration  */}

            <HStack style={styles.progressLevelDuration}>
              <Text style={styles.progressLabelText}>00:00</Text>
            </HStack>

          </VStack>

          {/* Icons Controls  */}
          <HStack marginTop={50} style={styles.musicControlsContainer}>

            <IconButton
              marginLeft={10}
              icon={<SkipBack color="#FFFFFF" size={28} />}
              onPress={backMusic}
            />

            <IconButton

              icon={
              playPause ? <Play color="#FFFFFF" size={28}/> : 
              <Pause color="#FFFFFF" size={28}/>
              }
              onPress={playSound}
            />

            <IconButton
              marginRight={10}
              icon={<SkipForward color="#FFFFFF" size={28} />}
              onPress={nextMusic}
            />

          </HStack>

          <HStack marginLeft={150}>

            <IconButton
              marginTop={180}
              icon={<Timer color="#FFFFFF" size={32} />}
              onPress={onOpen}
            />

          </HStack>
        </VStack>
      </ScrollView>

      <Actionsheet isOpen={isOpen} onClose={onClose} hideDragIndicator >
        <Actionsheet.Content borderTopRadius="20" bg="#251751" padding={0}>

          <Actionsheet.Item 
          bg={options === _30MIN ? "#5548E1" : "#251751"}
          _pressed={{
            bg: options === _30MIN ? "#5548E1" : "#3A3487"
          }}
          endIcon={options === _30MIN ? <Check color="#FFFFFF" size={24}/> : null}
          onPressOut={() => setTimeOptions(_30MIN)}>
            <Text color="#FFFFFF">
              30 minutos
            </Text>
          </Actionsheet.Item>

          <Actionsheet.Item 
          bg={options === _1H ? "#5548E1" : "#251751"}
          _pressed={{
            bg: options === _1H ? "#5548E1" : "#3A3487"
          }}
          endIcon={options === _1H ? <Check color="#FFFFFF" size={24}/> : null}
          onPressOut={() => setTimeOptions(_1H)}>
            <Text color="#FFFFFF">
              1 hora
            </Text>
          </Actionsheet.Item>

          <Actionsheet.Item 
          bg={options === _6H ? "#5548E1" : "#251751"}
          _pressed={{
            bg: options === _6H ? "#5548E1" : "#3A3487"
          }}
          endIcon={options === _6H ? <Check color="#FFFFFF" size={24}/> : null}
          onPressOut={() => setTimeOptions(_6H)}>
            <Text color="#FFFFFF">
              6 horas
            </Text>
          </Actionsheet.Item>

          <Actionsheet.Item 
          bg={options !== _30MIN && options !== _1H && options !== _6H && options > 0 ? "#5548E1" : "#251751"}
          _pressed={{
            bg: options !== _30MIN && options !== _1H && options !== _6H && options > 0  ? "#5548E1" : "#3A3487"
          }}
          endIcon={options !== _30MIN && options !== _1H && options !== _6H && options > 0 ? 
          <Check color="#FFFFFF" size={24}/> : null}
          onPressOut={() => setTimeOptions(20)}>
            <Text color="#FFFFFF">
              Personalizar
            </Text>
          </Actionsheet.Item>

        </Actionsheet.Content>
      </Actionsheet>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    color: "#FFFFFF",
    flexDirection: "row",
    justifyContent: "space-between"

  },
  secondtitle: {
    color: "#FFFFFF",

    alignContent: "center",

  },
  container: {
    flex: 1,
    color: "#FFFFFF",
  },
  imageLogo: {
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

  }, mainContainer: {
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
    justifyContent: 'center',
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
    justifyContent: 'flex-end',
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
