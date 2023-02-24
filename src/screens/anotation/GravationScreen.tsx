import React, { useEffect, useRef, useState } from 'react';
import { Audio } from 'expo-av';
import { VStack, HStack, Text, IconButton, View, Spacer, Modal, Button, Input, Flex } from 'native-base';
import { Pressable, StyleSheet } from 'react-native';
import { Image } from 'react-native';
import { ArrowLeft, Trash, Microphone, PlayCircle, PauseCircle, StopCircle } from 'phosphor-react-native';
import { useNavigation } from '@react-navigation/native';
import { Animated } from 'react-native';
import Slider from '@react-native-community/slider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Sound } from 'expo-av/build/Audio';
import {translation} from '../../routes/utils'

type NoteType = {
  id: string;
  text: string;
  isRecording: boolean;
  audioPath: string;
  date: string;
  title: string;
}

export function GravationScreen(props) {
  const [recording, setRecording] = useState<any>();
  const [recordings, setRecordings] = useState([]);
  const [message, setMessage] = useState("");
  const [RecordingStatusUpdate, setRecordingStatusUpdate] = useState<any>();
  const [playPause, setPlayPause] = useState(true);
  const [playPauseRecording, setPlayPauseRecording] = useState(false);
  const [recordingControl, setRecordingControl] = useState(true);
  const [recordingControlIndex, setRecordingControlIndex] = useState(0);

  const [placement, setPlacement] = useState(undefined);
  const [open, setOpen] = useState(false);

  const [placementBack, setPlacementBack] = useState(undefined);
  const [openBack, setOpenBack] = useState(false);
  const [control, setControl] = useState<any>({
    isBuffering: 0,
    durationMillis: 0,
    positionMillis: 0,
  });

  const [textSave, setTextSave] = useState("");
  const [saveControl, setSaveControl] = useState(false);

  const [sound, setSound] = useState<Sound>(new Audio.Sound());

  const opacityAnimation = useRef(new Animated.Value(1)).current;

  const opacityStyle = { opacity: opacityAnimation };

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedLang, setSelectedLang] = useState(0);

  useEffect(() => {
    getLang();
  }, []);

  const getLang = async () => {
    
    setSelectedLang(parseInt(await AsyncStorage.getItem('LANG')));
  };

  useEffect(() => {
    if (control.didJustFinish) {
      setPlayPauseRecording(false);
      sound.setPositionAsync(0);
      sound.pauseAsync();
    }
  }, [control]);

  const animateElement = () => {
    if (playPause) {
      Animated.loop(
        Animated.timing(opacityAnimation, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true
        })
      ).start();
    } else {
      Animated.timing(opacityAnimation, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true
      }).start();
    }
  };

  const openModal = placement => {
    setOpen(true);
    setPlacement(placement);
  };

  const openModalBack = placement => {
    setOpenBack(true);
    setPlacementBack(placement);
  };

  function formatDate() {
    const dateNow = new Date(Date.now());

    return `${dateNow.getDate()}/${dateNow.getUTCMonth()}/${dateNow.getFullYear()}`
  }

  const navigation = useNavigation();

  const OnRecordingStatusUpdate = status => {
    setRecordingStatusUpdate(status);
  }

  function handleNewOrder() {
    if (recording !== undefined)
      stopRecording();
    openModalGoBack();
  }

  async function startRecording() {
    try {
      const permission = await Audio.requestPermissionsAsync();

      if (permission.status === "granted") {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true
        });

        const { recording } = await Audio.Recording.createAsync(
          Audio.RecordingOptionsPresets.HIGH_QUALITY
        );

        setRecording(recording);
        recording.setOnRecordingStatusUpdate(OnRecordingStatusUpdate);
      } else {
        setMessage("Please grant permission to app to access microphone");
      }

    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }

  async function stopRecording() {
    if (recordingControl) {
      setRecordingControl(false);
    }

    if (recording) {
      await recording.stopAndUnloadAsync();
      setRecording(undefined);

      let updatedRecordings = [...recordings];
      const { sound, status } = await recording.createNewLoadedSoundAsync();
      updatedRecordings.push({
        sound: sound,
        duration: getDurationFormatted(status.durationMillis),
        file: recording.getURI()
      });

      setRecordings(updatedRecordings);
    }
  }

  function getDurationFormatted(millis) {
    const minutes = millis / 1000 / 60;
    const minutesDisplay = Math.floor(minutes);
    const seconds = Math.round((minutes - minutesDisplay) * 60);
    const secondsDisplay = seconds < 10 ? `0${seconds}` : seconds;
    return `${minutesDisplay}:${secondsDisplay}`;
  }

  const playPauseRecordingControl = sound => {
    if (playPauseRecording) {
      sound.pauseAsync();
    } else {
      sound.playAsync();
    }
    setPlayPauseRecording(!playPauseRecording);
  }

  const onPlaybackStatusUpdate = status => {
    setControl(status);
  }

  function getRecordingLines() {

    return recordings.map((recordingLine, index) => {
      if (index === recordingControlIndex) {
        return (
          <VStack style={styles.legenda} bg="#32206A" key={index}
          >

            <View key={index} style={styles.row}>


              <IconButton
                icon={
                  playPauseRecording ?
                    <PauseCircle color="#FFFFFF" size={28} /> :
                    <PlayCircle color="#FFFFFF" size={28} />
                }
                onPress={() => {
                  setSound(recordingLine.sound);
                  recordingLine.sound.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
                  if (control.positionMillis >= control.durationMillis) {
                    recordingLine.sound.replayAsync();
                    setPlayPauseRecording(true);
                  } else {
                    playPauseRecordingControl(recordingLine.sound);
                  }
                }}
              />

              <VStack width={'250px'} alignItems='flex-end' marginTop={'14px'} marginLeft={'-20px'}>
                <Slider
                  style={styles.progressBar}
                  value={control.positionMillis}
                  minimumValue={0}
                  maximumValue={control.durationMillis}
                  thumbTintColor="#FFD369"
                  minimumTrackTintColor="#FFD369"
                  maximumTrackTintColor="#fff"
                  onSlidingStart={v => {
                    recordingLine.sound.pauseAsync();
                  }}
                  onSlidingComplete={v => {
                    recordingLine.sound.setPositionAsync(v);
                    recordingLine.sound.playAsync();
                  }}
                />
                <Text color="#FFFFFF" fontSize={10} fontFamily={'robolight'} marginRight={'16px'}>
                  {convertTimeRecording(control.positionMillis / 1000)}
                </Text>
              </VStack>

              <VStack style={styles.folha}>

                <IconButton
                  marginTop={-1}
                  icon={<Trash color="#FFFFFF" size={20} />}
                  onPress={removingRecording}
                />

                <Text
                  marginTop={2}
                  color="#FFFFFF"
                  fontSize={9}
                  fontFamily={'robolight'}>
                  {formatDate()}
                </Text>
              </VStack>

            </View>

          </VStack>
        );
      }
    });
  }

  const saveNote = async () => {
    recordings.map((recordingLine, index) => {
      if (index === recordingControlIndex) {

        setSaveControl(true);
        AsyncStorage.getItem("TESTECOUNT2").then((count) => {
          const countJson = count ? JSON.parse(count) : 0;

          AsyncStorage.getItem("ALLSECTIONTEST1").then((noteValue) => {
            const noteJson = noteValue ? JSON.parse(noteValue) : [];

            const dateNow = new Date(Date.now());
            const dateString = `${dateNow.getUTCDate()}/${dateNow.getUTCMonth() + 1}/${dateNow.getUTCFullYear()}`;

            const newValue: NoteType = {
              id: countJson,
              text: "",
              isRecording: true,
              audioPath: recordingLine.file,
              date: dateString,
              title: textSave,
            }

            const indexChange = noteJson.indexOf(noteJson.filter(function (obj) { return obj.name === props.route.params.name; })[0]);
            noteJson[indexChange].values.push(newValue);

            AsyncStorage.setItem("ALLSECTIONTEST1", JSON.stringify(noteJson)).then(() => {
              AsyncStorage.setItem("TESTECOUNT2", JSON.stringify(countJson + 1));
              setSaveControl(false);
              setTextSave("");
              navigation.navigate('allAnotation', {
                id: props.route.params.id,
                name: props.route.params.name
              });
            });
          });


        });
      }
    });

  }

  const pauseRecording = () => {
    if (recording) {
      if (playPause) {
        recording.pauseAsync();
      } else {
        recording.startAsync();
      }
      setPlayPause(!playPause);
    }
  }

  const convertTime = sec => {
    let dateObj: any = new Date(sec * 1000);
    if (isNaN(dateObj)) {
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

  const convertTimeRecording = sec => {
    let dateObj: any = new Date(sec * 1000);
    if (isNaN(dateObj)) {
      return '00:00'
    }
    let minutes = dateObj.getUTCMinutes();
    let seconds = dateObj.getSeconds();

    let timeString = minutes.toString().padStart(2, '0') + ':' +
      seconds.toString().padStart(2, '0');

    return timeString;
  }

  const openModalSave = () => {
    if (!recordingControl) {
      stopRecording();
      openModal("center");
    }
  }

  const openModalGoBack = () => {
    if (!recordingControl) {
      openModalBack("center");
    } else {
      navigation.goBack();
    }
  }

  const removingRecording = () => {
    setRecordingControl(true);
    setRecordingControlIndex(recordingControlIndex + 1);
  }

  return (
    <VStack flex={1} height={"100%"} bg="#180F34"  >

      <HStack paddingTop={2} paddingX={4} style={styles.title} >


        <IconButton
          marginTop={-2}
          icon={<ArrowLeft color="#FFFFFF" size={25} />}
          onPress={handleNewOrder}
        />

        <Text
          marginRight={5}
          fontFamily="robobold"
          textAlign="center"
          color={'#FFFFFF'}
          fontSize={18}>
            {selectedLang == 0
            ? translation[12].English
            : selectedLang == 1
            ? translation[12].Portuguese
            : null}
        </Text>

        <Pressable onPress={saveNote}>
          <Image style={styles.imageFolha} source={require('../../assets/images/moonalone.png')} />
        </Pressable>

      </HStack>



      <View style={styles.container}>
        <Text>{message}</Text>
        <IconButton
          // onPress={recordingControl ? startRecording : null}
          icon={(recording && playPause) ?
            <Microphone style={styles.microphone} color="#FD0541" size={45} /> :
            <Microphone style={styles.microphone} color="#FFFFFF" size={45} />
          }
        />


        <Button borderRadius={20} marginBottom={10} bg={recordingControl ?
          (recording ? "#FD0541" : "#2E888D")
          : null
        }
          style={styles.shadowProp}
          onPress={recordingControl ?
            (recording ? () => {
              stopRecording();  
              if (!playPause) {
                animateElement();
                setPlayPause(!playPause);
              }
            }: startRecording)
            : null
          }
        >
          <Text color="#FFFFFF">{recording ? 'Parar gravação' : 'Iniciar gravação'}</Text>
        </Button>
        <VStack style={styles.legenda} bg="#32206A"
        >

          <View style={styles.row}>
            <HStack flexDirection={'row'} justifyContent={'flex-start'}>
              <IconButton
                onPress={() => {
                  stopRecording();
                  if (!playPause) {
                    animateElement();
                    setPlayPause(!playPause);
                  }
                }}
                icon={<StopCircle style={styles.microphone} color="#FFFFFF" size={30} />}
              />
              <Animated.View

                style={[opacityStyle]} >
                <IconButton
                  onPress={() => {
                    if (recording) {
                      animateElement();
                      pauseRecording();
                    }
                  }}

                  icon={<PauseCircle color="#FFFFFF" size={30} />}
                />
              </Animated.View>
            </HStack>

            <View style={styles.Otobutton}>
              <Text style={styles.Durationtext}>
                {convertTime(RecordingStatusUpdate === undefined ? 0 : RecordingStatusUpdate.durationMillis / 1000)}
              </Text>
            </View>

            <VStack marginTop={-1} style={styles.folha}>
              < Image style={styles.imageFolha} source={require('../../assets/images/moonalone.png')} />
            </VStack>

          </View>

        </VStack>
        {getRecordingLines()}
      </View>


      <Spacer />

      <HStack marginBottom={10} flexDirection={'row'} justifyContent={'center'}
      >

        <Button
          width={'120px'}
          borderRadius={20}
          bg={'#5C4EBC'}
          onPress={openModalSave}>
          <Text style={styles.text}>
              {selectedLang == 0
              ? translation[11].English
              : selectedLang == 1
              ? translation[11].Portuguese
              : null}
          </Text>
        </Button>
      </HStack>

      <Modal isOpen={open} onClose={() => setOpen(false)} safeAreaTop={true}>
        <Modal.Content maxWidth="350" {...styles[placement]} bg="#5C4EBC">
          <Modal.Header bg="#5C4EBC" borderColor={"#5C4EBC"}>
            <Text color="#FFFFFF" fontSize={"16px"} fontFamily={'robobold'}>
            {selectedLang == 0
                        ? translation[13].English
                        : selectedLang == 1
                        ? translation[13].Portuguese
                        : null}
            </Text>
          </Modal.Header>

          <Modal.Body>
            <Input
              size="xs"
              variant="outline"
              _focus={{
                backgroundColor: "#FFFFFF",
                borderColor: "#FFFFFF"
              }}
              value={textSave}
              onChangeText={setTextSave}
              fontFamily={'robolight'}
              placeholder="new_music_0001"
              color="#0C091F"
              borderColor={"#1B1065"}
              fontSize={"12px"}
              bg="white"
            />
          </Modal.Body>

          <Modal.Footer bg="#5C4EBC" borderColor={"#5C4EBC"}>
            <Button.Group width={'100%'}>
              <Button bg="#2F2570" width={'120px'} height={'40px'} onPress={() => {
                setOpen(false);
              }}>
                <Text color="#FFFFFF" fontFamily={'robomedium'}>
                  Cancel
                </Text>
              </Button>
              <Spacer />
              <Button bg="#2F2570" disabled={saveControl} width={'120px'} height={'40px'} onPress={() => {
                setOpen(false);
                saveNote();
              }}>
                <Text color="#FFFFFF" fontFamily={'robomedium'}>
                  Ok
                </Text>
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>

      <Modal isOpen={openBack} onClose={() => setOpenBack(false)} safeAreaTop={true}>
        <Modal.Content maxWidth="350" {...styles[placementBack]} bg="#5C4EBC">
          <Modal.Header bg="#5C4EBC" borderColor={"#5C4EBC"}>
            <Text color="#FFFFFF" fontSize={"16px"} fontFamily={'robobold'}>
            {selectedLang == 0
                        ? translation[14].English
                        : selectedLang == 1
                        ? translation[14].Portuguese
                        : null}
            </Text>
          </Modal.Header>

          <Modal.Body>
            <Text color="#FFFFFF" fontSize={"14px"} fontFamily={'robomedium'}>
            {selectedLang == 0
                        ? translation[15].English
                        : selectedLang == 1
                        ? translation[15].Portuguese
                        : null}
            </Text>
          </Modal.Body>

          <Modal.Footer bg="#5C4EBC" borderColor={"#5C4EBC"}>
            <Button.Group width={'100%'}>
              <Button bg="#2F2570" width={'120px'} height={'40px'} onPress={() => {
                setOpenBack(false);
              }}>
                <Text color="#FFFFFF" fontFamily={'robomedium'}>
                  Cancel
                </Text>
              </Button>
              <Spacer />
              <Button bg="#2F2570" width={'120px'} height={'40px'} onPress={() => {
                setOpenBack(false);
                navigation.goBack();
              }}>
                <Text color="#FFFFFF" fontFamily={'robomedium'}>
                  Ok
                </Text>
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>

    </VStack>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#180F34",
    alignItems: 'center',
  },
  shadowProp: {
    shadowColor: "#000000",
    elevation: 15,
    shadowOpacity: 5

  },
  imageLogo: {
    width: 30,
    height: 30,
  },
  imageFolha: {
    width: 32,
    height: 32,
    marginLeft: 10,
  },
  title: {
    color: "#FFFFFF",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  secondtitle: {
    color: "#FFFFFF",
    alignContent: "center",
  },
  button: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 20,
    backgroundColor: "#5C4EBC",
  },
  Otobutton: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 13,
    borderRadius: 20,
    elevation: 3,
    backgroundColor: "#5C4EBC",
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  Durationtext: {
    fontSize: 13,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  fill: {
    flex: 1,
    color: "#FFFFFF"
  },
  microphone: {
    marginRight: 1,
  },
  data: {
    marginLeft: 20,
    marginTop: 20,
    marginBottom: 15,
    backgroundColor: "#5C4EBC",
    borderRadius: 20,
    paddingTop: 5,
    paddingBottom: 5,
    textAlign: 'center',
    width: 110,
    fontSize: 12,
    letterSpacing: 1.1,
  },
  legenda: {
    color: "#FFFFFF",
    width: 370,
    height: 65,
    paddingX: "50",
    borderRadius: 10,
    marginTop: 10,

  },
  folha: {
    width: 54,
    height: 35,
    left: 1,
    bottom: 14,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 210,
    borderTopLeftRadius: 150,
    borderTopRightRadius: 46,
    backgroundColor: "#2E888D",
  },
  progressBar: {
    width: '100%',
    flexDirection: 'row',
  },
});