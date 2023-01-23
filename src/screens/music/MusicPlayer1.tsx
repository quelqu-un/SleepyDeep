import { VStack, HStack, Text, ScrollView, IconButton, Actionsheet, useDisclose, Button, Input } from 'native-base';
import React, { useEffect, useState, useRef } from 'react';

import { Animated, Dimensions, FlatList, GestureResponderEvent, ImageBackground, Platform, KeyboardAvoidingView, StyleSheet, View } from 'react-native';
import { CardAnotation } from '../../components/CardAnotation';
import { CardMusic } from '../../components/CardMusic';
import { Image, TouchableOpacity, } from 'react-native';
import { Globe, ArrowLeft, SkipBack, SkipForward, Pause, Timer, Repeat, Play, Check, SelectionPlus } from 'phosphor-react-native';
import { useNavigation } from '@react-navigation/native';

// import songs from '../../model/Data';
import { Audio } from 'expo-av';

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

  const customOptions = useDisclose();

  const _30MIN = 1800000;
  const _1H = 3600000;
  const _6H = 21600000;

  const _1S = 1000;

  const navigation = useNavigation();

  let TimerControl = function (callback, delay) {
    let timerId, start, remaining = delay;

    this.pause = function () {
      window.clearTimeout(timerId);
      timerId = null;
      remaining -= Date.now() - start;
    };

    this.resume = function () {
      if (timerId) {
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
  const [timerControl, setTimerControl] = useState<any>(new TimerControl(function () {
    pauseTimer();
  }, _1H));
  const [options, setOptions] = useState(_1H);
  const [onChangeValue, setOnChangeValue] = useState(1);
  const [onChangeEndValue, setOnChangeEndValue] = useState(1);
  const [onChangeValueFinal, setOnChangeValueFinal] = useState(1);
  const [onChangeValueFinalControl, setOnChangeValueFinalControl] = useState(true);

  const [countTime, setCountTime] = useState(0);
  const [countHour, setCountHour] = useState(0);
  const [countMinute, setCountMinute] = useState(0);
  const [countSeconds, setCountSeconds] = useState(0);


  // useEffect(() => {
  //   if (musicCheck) {
  //     Audio.setAudioModeAsync({
  //       allowsRecordingIOS: false,
  //       // interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
  //       playsInSilentModeIOS: true,
  //       //	interruptionModeAndroid: Audio.INTTERUPTION_MODE_ANDROID_DUCK_OTHERS,
  //       shouldDuckAndroid: true,
  //       staysActiveInBackground: true,
  //       //	playsThroughEarpieceAndroid: true, 
  //     });

  //     this.sound = new Audio.Sound();

  //     const status = {
  //       shouldPlay: true,
  //       isLooping: true,
  //     };

  //     this.sound.loadAsync(songs[musicIndex], status, false);

  //     setMusicCheck(false);
  //   }

  //   if (!musicCheck) {
  //     const status = {
  //       shouldPlay: true,
  //       isLooping: true
  //     };
  //     this.sound.unloadAsync();
  //     this.sound.loadAsync(songs[musicIndex], status, false);
  //     this.sound.playAsync();
  //   }
  // }, [musicIndex]);

  useEffect(() => {
    setCountHour(Math.floor(countTime/3600));
    setCountMinute(Math.floor(countTime/60));
    updateTime();
  },[countTime]);

  function playSound() {
    if (playPause) {
      this.sound.playAsync();
      if (timerControl !== null) {
        timerControl.resume();
      }
    } else {
      this.sound.pauseAsync();
      if (timerControl !== null) {
        timerControl.pause();
      }
    }
    setplayPause(!playPause);
  }

  function nextMusic() {
    this.sound.pauseAsync();
    if (musicIndex === (songs.length - 1)) {
      setMusicIndex(0);
    } else {
      setMusicIndex(musicIndex + 1);
    }
  }

  function backMusic() {
    this.sound.pauseAsync();
    if (musicIndex === 0) {
      setMusicIndex(songs.length - 1);
    } else {
      setMusicIndex(musicIndex - 1);
    }
  }

  function pauseTimer() {
    this.sound.pauseAsync();
    setplayPause(!playPause);
    setTimerControl(null);
  }

  function hadleGoBack() {
    customOptions.onOpen();

    // navigation.goBack();
    // this.sound.unloadAsync();
  }

  function setTimeOptions(time) {
    setOptions(time);

    setTimerControl(new TimerControl(function () {
      pauseTimer();
    }, time));

    onClose();
  }

  function setTimeOptionsCustom() {
    setOptions(onChangeEndValue*60*1000);
    setOnChangeValueFinal(onChangeEndValue);

    setOnChangeValueFinalControl(true);

    setTimerControl(new TimerControl(function () {
      pauseTimer();
    }, options));

    customOptions.onClose();
  }

  function updateTime() {
    if(countTime < (options/1000)) {
      if(countMinute < 59) {
        if(countSeconds < 59) {
          setTimeout(() => { 
            setCountTime(countTime+1); 
            setCountSeconds(countSeconds+1);
          }, _1S); 
        } else {
          setTimeout(() => { 
            setCountTime(countTime+1); 
            setCountSeconds(0);
            setCountMinute(countMinute+1)
          }, _1S); 
        }
      } else {
        if(countSeconds < 59) {
          setTimeout(() => { 
            setCountTime(countTime+1); 
            setCountSeconds(countSeconds+1);
          }, _1S); 
        } else {
          setTimeout(() => { 
            setCountTime(countTime+1); 
            setCountSeconds(0);
            setCountMinute(0);
            setCountHour(countHour+1);
          }, _1S); 
        } 
      }
    }
  }  

  let convertTime = minutes => {
    if (minutes) {
      const hrs = minutes / 60;
      const minute = hrs.toString().split('.')[0];
      const percent = parseInt(hrs.toString().split('.')[1].slice(0, 2));
      const sec = Math.ceil((60 * percent) / 100);
      if (parseInt(minute) < 10 && sec < 10) {
        return `0${minute}:0${sec}`;
      }
  
      if (sec == 60) {
        return `${minute + 1}:00`;
      }
  
      if (parseInt(minute) < 10) {
        return `0${minute}:${sec}`;
      }
  
      if (sec < 10) {
        return `${minute}:0${sec}`;
      }
  
      return `${minute}:${sec}`;
    }
  };
  
  console.log(convertTime(3601))

  // função para ficar chamando de segundo em segundo o getStatus
  // estado geral que controla a contagem de segundos geral
  // função que converter milisegundos para segundos no formato desejado
  // slider, pause e player vão ser controlado por AV

  // resolver erro após clicar na seta para voltar

  return (
    <VStack height={"100%"} bg="#180F34">
      
      <ScrollView
        marginBottom={10}
      >
        <VStack
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
              value={countTime}
              minimumValue={0}
              maximumValue={100}
              step={1}
              thumbTintColor="#FFD369"
              minimumTrackTintColor="#FFD369"
              maximumTrackTintColor="#fff"
              onSlidingComplete={v => {
                v && setCountTime(Math.floor(v));
              }}
            />


            {/* music duration  */}

            <HStack style={styles.progressLevelDuration}>
              <Text style={styles.progressLabelText}>
                {countHour}:{countMinute}:{countSeconds}
              </Text>
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
                playPause ? <Play color="#FFFFFF" size={28} /> :
                  <Pause color="#FFFFFF" size={28} />
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
      
      <Actionsheet isOpen={isOpen} onClose={onClose} hideDragIndicator>
        <Actionsheet.Content borderTopRadius="20" bg="#251751" padding={0}>

          <Actionsheet.Item
            bg={options === _30MIN ? "#5548E1" : "#251751"}
            _pressed={{
              bg: options === _30MIN ? "#5548E1" : "#3A3487"
            }}
            endIcon={options === _30MIN ? <Check color="#FFFFFF" size={24} /> : null}
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
            endIcon={options === _1H ? <Check color="#FFFFFF" size={24} /> : null}
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
            endIcon={options === _6H ? <Check color="#FFFFFF" size={24} /> : null}
            onPressOut={() => setTimeOptions(_6H)}>
            <Text color="#FFFFFF">
              6 horas
            </Text>
          </Actionsheet.Item>

          <Actionsheet.Item
            bg={options !== _30MIN && options !== _1H && options !== _6H && options > 0 ? "#5548E1" : "#251751"}
            _pressed={{
              bg: options !== _30MIN && options !== _1H && options !== _6H && options > 0 ? "#5548E1" : "#3A3487"
            }}
            endIcon={options !== _30MIN && options !== _1H && options !== _6H && options > 0 ?
              <Check color="#FFFFFF" size={24} /> : null}
            onPressOut={() => setTimeOptions(20)}>
            <Text color="#FFFFFF">
              Personalizar
            </Text>
          </Actionsheet.Item>

        </Actionsheet.Content>
      </Actionsheet>

      <Actionsheet isOpen={customOptions.isOpen} onClose={customOptions.onClose} hideDragIndicator >
        <Actionsheet.Content borderTopRadius="20" bg="#251751" padding={0}>
          
          <VStack 
            paddingTop={5}
            paddingBottom={5}>
            <Text 
            color="#FFFFFF" 
            textAlign="center" 
            fontFamily={'robomedium'}
            fontSize={16}>
              Personalizar
            </Text>
          </VStack>

          <Text 
            color="#FFFFFF" 
            textAlign="center" 
            fontFamily={'robolight'}
            fontSize={14}>
            {onChangeValueFinalControl ? onChangeValueFinal : onChangeEndValue}
            {onChangeEndValue === 1 ? ' hora' : ' horas'}
          </Text>

          <Slider
            style={styles.progressBar}
            value={onChangeValueFinal}
            minimumValue={1}
            maximumValue={10}
            step={1}
            thumbTintColor="#B7AEFF"
            minimumTrackTintColor="#B7AEFF"
            maximumTrackTintColor="#fff"
            onSlidingComplete={v => {
              v && setOnChangeEndValue(Math.floor(v));
              setOnChangeValueFinalControl(false);
            }}
            onSlidingStart={v => {
              setOnChangeValue(Math.floor(v));
            }}
          />

          <VStack
             bg="#251751"
             alignItems={'center'}
             paddingTop={5}
             paddingBottom={10}>

            <HStack>
              
              <Button 
              marginRight={10}
              width={140}
              bg="#2F2570"
              borderRadius={6}
              onPress={customOptions.onClose}>
                <Text 
                color="#FFFFFF"
                >
                  Cancelar
                </Text>
              </Button>

              <Button 
              width={140}
              bg="#5548E1"
              borderRadius={6}
              onPress={setTimeOptionsCustom}>
                <Text
                color="#FFFFFF"
                >
                  Ok 
                </Text>
              </Button>

            </HStack>

          </VStack>

        </Actionsheet.Content>
      </Actionsheet>

    </VStack>
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
