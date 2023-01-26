import { VStack, HStack, Text, ScrollView, IconButton, Actionsheet, useDisclose, Button } from 'native-base';
import React, { useEffect, useState } from 'react';

import { ImageBackground, StyleSheet } from 'react-native';
import { Image } from 'react-native';
import { ArrowLeft, SkipBack, SkipForward, Pause, Timer, Check, Play } from 'phosphor-react-native';
import { useNavigation } from '@react-navigation/native';
import Slider from '@react-native-community/slider';

import { Audio } from 'expo-av';
import { Sound } from 'expo-av/build/Audio';


const songs = [
  require('../../assets/audio/aboutu.mpeg'),
  require('../../assets/audio/enjoadinho.mp4'),
];

export function MusicPlayer1() {
  const timerOptions = useDisclose();
  const customOptions = useDisclose();

  const _30MIN = 1800000;
  const _1H = 3600000;
  const _6H = 21600000;

  const navigation = useNavigation();

  const [sound, setSound] = useState<Sound>(new Audio.Sound());
  const [playPause, setplayPause] = useState<boolean>(false);
  const [musicIndex, setMusicIndex] = useState<number>(0);
  const [musicCheck, setMusicCheck] = useState<boolean>(true);
  const [control, setControl] = useState<any>({
    isBuffering: 0,
    durationMillis: 0,
    positionMillis: 0,
  });
  const [soundTimer, setSoundTimer] = useState<boolean>(true);

  const [options, setOptions] = useState<number>(0);
  const [countTimer, setCountTimer] = useState<number>(-1);
  const [countControl, setCountControl] = useState<number>(0);

  const [onChangeValue, setOnChangeValue] = useState<number>(1);
  const [onChangeEndValue, setOnChangeEndValue] = useState<number>(1);
  const [onChangeValueFinal, setOnChangeValueFinal] = useState<number>(1);
  const [onChangeValueFinalControl, setOnChangeValueFinalControl] = useState<boolean>(true); 

  useEffect(() => {
    if (musicCheck) {
      Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true,
        staysActiveInBackground: true, 
      });

      const status = {
        shouldPlay: true,
        isLooping: true,
      };

      sound.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate)
      sound.loadAsync(songs[musicIndex], status, true)

      setMusicCheck(false);
    }

    if (!musicCheck) {
      const status = {
        shouldPlay: true,
        isLooping: true
      };
      sound.unloadAsync();
      sound.loadAsync(songs[musicIndex], status, false);
      sound.playAsync();
    }
  }, [musicIndex]);

  useEffect(() => {
    return sound
    ? () => {
        sound.unloadAsync();
      } : undefined;
  }, [sound]);

  useEffect(() => {
    if(countControl === 1) {
      if(countTimer < (options/1000)) {
        setTimeout(() => setCountTimer(countTimer+1), 1000);
      } else if(countTimer >= (options/1000)) {
        sound.pauseAsync();
        sound.setPositionAsync(0);
        setCountControl(0);
        setCountTimer(-1);
        setSoundTimer(true);
        if(options > 0) {
          setplayPause(!playPause);
          setOptions(0);
        } else {
          setOptions(0);
          sound.playAsync();
        }
      }
    } else if(countControl === 2) {
      setCountControl(1);
      setCountTimer(0);
    } else if(countControl === 3) {
      setCountControl(0);
      setCountTimer(-1);
    }
  }
  , [countTimer]);

  const onPlaybackStatusUpdate = status => {
    setControl(status);
  }

  const playPauseSound = () => {
    if (playPause) {
      sound.playAsync();
      if(countTimer > 0) {
        setCountControl(1);
        setCountTimer(countTimer-1);
      }
    } else {
      sound.pauseAsync();
      if(countTimer > 0) {
        setCountControl(0);
      }
    }
    setplayPause(!playPause);
  }

  const nextMusic = () => {
    sound.pauseAsync();
    setOptions(0);
    setSoundTimer(true);
    setCountControl(3);
    setOnChangeValue(1);
    setOnChangeEndValue(1);
    setOnChangeValueFinal(1);
    setOnChangeValueFinalControl(true);
    if (musicIndex === (songs.length - 1)) {
      setMusicIndex(0);
      setplayPause(false);
    } else {
      setMusicIndex(musicIndex + 1);
      setplayPause(false);
    }
  }

  const backMusic = () => {
    sound.pauseAsync();
    setOptions(0);
    setSoundTimer(true);
    setCountControl(3);
    setOnChangeValue(1);
    setOnChangeEndValue(1);
    setOnChangeValueFinal(1);
    setOnChangeValueFinalControl(true);
    if (musicIndex === 0) {
      setMusicIndex(songs.length - 1);
      setplayPause(false);
    } else {
      setMusicIndex(musicIndex - 1);
      setplayPause(false);
    }
  }

  const setTimeOptions = time => {
    setOptions(time);

    if(!playPause) {
      sound.pauseAsync();
      setplayPause(!playPause);
    }
    sound.setPositionAsync(0);
    if(countTimer>0) {
      setCountControl(2);
    } else {
      setCountControl(1);
    }
    setSoundTimer(false);
    sound.playAsync();
    setplayPause(false);
    if(!(countTimer > 0) || playPause) {
      setCountTimer(countTimer+1);
    } 
    timerOptions.onClose();
  }

  const setTimeOptionsCustom = () => {
    setOptions(onChangeEndValue*60*1000);
    
    if(!playPause) {
      sound.pauseAsync();
      setplayPause(!playPause);
    }
    sound.setPositionAsync(0);
    if(countTimer>0) {
      setCountControl(2);
    } else {
      setCountControl(1);
    }
    setSoundTimer(false);
    sound.playAsync();
    setplayPause(false);
    if(!(countTimer > 0)) {
      setCountTimer(countTimer+1);
    } 

    customOptions.onClose();
  } 

  const convertTime = sec => {
    let dateObj:any = new Date(sec * 1000);
    if(isNaN(dateObj)) {
      return '00:00:00'
    }
    let hours = dateObj.getUTCHours();
    let minutes = dateObj.getUTCMinutes();
    let seconds = dateObj.getSeconds();

    let timeString = hours.toString().padStart(2, '0') + ':' + 
    minutes.toString().padStart(2, '0') + ':' + 
    seconds.toString().padStart(2, '0');

    return timeString;
  }

  const hadleGoBack = () => {
    sound.unloadAsync();
    navigation.goBack();
  }

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

              <Image style={styles.imageLogo} source={require('../../assets/images/moonalone.png')} />

            </HStack>
          </ImageBackground>
        </VStack>

        <VStack style={styles.mainContainer}>

          <VStack>
            { soundTimer ?
            <Slider
              style={styles.progressBar}
              value={control.positionMillis}
              minimumValue={0}
              maximumValue={control.durationMillis}
              thumbTintColor="#FFD369"
              minimumTrackTintColor="#FFD369"
              maximumTrackTintColor="#fff"
              onSlidingStart={v => {
                playPauseSound();
              }}
              onSlidingComplete={v => {
                sound.setPositionAsync(v);
                playPauseSound();
              }}
            /> : null
            }

            <HStack style={styles.progressLevelDuration}>
              <Text style={styles.progressLabelText}>
                {soundTimer ? convertTime(control.positionMillis/1000) : null}
                {soundTimer ? null : convertTime(countTimer)}
              </Text>
            </HStack>

          </VStack>

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
              onPress={playPauseSound}
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
              onPress={timerOptions.onOpen}
            />

          </HStack>
        </VStack>
      </ScrollView>
      
      <Actionsheet isOpen={timerOptions.isOpen} onClose={timerOptions.onClose} hideDragIndicator>
        <Actionsheet.Content borderTopRadius="20" bg="#251751" padding={0}>

          <Actionsheet.Item
            bg={options === _30MIN ? "#5548E1" : "#251751"}
            _pressed={{
              bg: options === _30MIN ? "#5548E1" : "#3A3487"
            }}
            endIcon={options === _30MIN ? <Check color="#FFFFFF" size={24} /> : null}
            onPressOut={() => { 
              if(options === _30MIN) {
                setTimeOptions(0);
              } else {
                setTimeOptions(_30MIN);
              }
            }}>
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
            onPressOut={() => { 
              if(options === _1H) {
                setTimeOptions(0);
              } else {
                setTimeOptions(_1H);
              }
            }}>
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
            onPressOut={() => { 
              if(options === _6H) {
                setTimeOptions(0);
              } else {
                setTimeOptions(_6H);
              }
            }}>
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
            onPressOut={() => {
              timerOptions.onClose();
              customOptions.onOpen();
            }}>
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
            value={onChangeValueFinalControl ? onChangeValueFinal : onChangeEndValue}
            minimumValue={0}
            maximumValue={10}
            step={1}
            thumbTintColor="#B7AEFF"
            minimumTrackTintColor="#B7AEFF"
            maximumTrackTintColor="#fff"
            onSlidingComplete={v => {
              setOnChangeEndValue(Math.floor(v));
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
  imageLogo: {
    width: 35,
    height: 35,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  }, 
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
