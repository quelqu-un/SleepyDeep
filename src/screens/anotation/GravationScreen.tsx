
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Audio } from 'expo-av';
import { VStack, HStack, Text, ScrollView, IconButton, Center, View, Flex, Spacer, Button, Input, } from 'native-base';
import { Pressable, StyleSheet, TextInput } from 'react-native';
import { Image, ImageBackground } from 'react-native';
import { Globe, ArrowLeft, Trash, Microphone, PlayCircle, MagnifyingGlass } from 'phosphor-react-native';
import { useNavigation } from '@react-navigation/native';
import { SearchBarComponent } from '../../components/SearchBar';
import { background } from 'native-base/lib/typescript/theme/styled-system';

//import * as Sharing from 'expo-sharing';

export function GravationScreen() {
  const [recording, setRecording] = React.useState<any>();
  const [recordings, setRecordings] = React.useState([]);
  const [message, setMessage] = React.useState("");
  const navigation = useNavigation();

  function handleNewOrder() {
    navigation.goBack();
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
      } else {
        setMessage("Please grant permission to app to access microphone");
      }
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }

  async function stopRecording() {
    setRecording(undefined);
    await recording.stopAndUnloadAsync();

    let updatedRecordings = [...recordings];
    const { sound, status } = await recording.createNewLoadedSoundAsync();
    updatedRecordings.push({
      sound: sound,
      duration: getDurationFormatted(status.durationMillis),
      file: recording.getURI()
    });

    setRecordings(updatedRecordings);
  }

  function getDurationFormatted(millis) {
    const minutes = millis / 1000 / 60;
    const minutesDisplay = Math.floor(minutes);
    const seconds = Math.round((minutes - minutesDisplay) * 60);
    const secondsDisplay = seconds < 10 ? `0${seconds}` : seconds;
    return `${minutesDisplay}:${secondsDisplay}`;
  }

  function getRecordingLines() {

    return recordings.map((recordingLine, index) => {
      return (

        <VStack style={styles.legenda} bg="#32206A"
        >

          <View key={index} style={styles.row}>


            <IconButton
              icon={<PlayCircle color="#FFFFFF" size={28} />}
              onPress={() => recordingLine.sound.replayAsync()}

            />

            <Text style={styles.fill}>Recording {index + 1} - {recordingLine.duration}</Text>

            <VStack style={styles.folha}>
              <IconButton
                marginTop={-1}
                icon={<Trash color="#FFFFFF" size={20} />}
                onPress={handleNewOrder}
              />
              <Text

                marginTop={2}
                color="#FFFFFF"
                fontSize={9}
                fontFamily={'robolight'}>
                21/05/2025
              </Text>
            </VStack>
          </View>

        </VStack>
      );
    });
  }

  return (
    <VStack flex={1} height={"100%"} bg="#180F34"  >




      <HStack paddingTop = {2}paddingX={4} style={styles.title} >


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
          Título
        </Text>


        <IconButton
          marginTop={-2}
          icon={<Trash color="#FFFFFF" size={25} />}
          onPress={handleNewOrder}
        />

      </HStack>

   

      <View  style={styles.container}>
        <Text>{message}</Text>
        <IconButton
          onPress={recording ? stopRecording : startRecording}
          icon={<Microphone style={styles.microphone} color="#FFFFFF" size={25} />}
      />
        <Text marginBottom={10}> {recording ? 'Stop Recording' : 'Start Recording'}  </Text>
        {getRecordingLines()}
      </View>


      <Spacer />

      <HStack marginBottom={5} flexDirection={'row'} justifyContent={'center'}
      >

        <Pressable style={styles.button} onPress={handleNewOrder}>
          <Text style={styles.text}>Salvar</Text>
        </Pressable>
      </HStack>
    </VStack>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#180F34",
    alignItems: 'center',
    //justifyContent: 'center',
    
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
  imageLogo: {
    width: 25,
    height: 25,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  fill: {
    flex: 1,
    //margin: 16,
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
    //borderLeftRa
    // border-radius: 26px 26px 200px 0px,
    backgroundColor: "#2E888D",
  },

});