import Slider from '@react-native-community/slider';
import { useNavigation } from '@react-navigation/native';
import { Sound } from 'expo-av/build/Audio';
import { Audio } from 'expo-av';
import { Text, VStack, IPressableProps, HStack, IconButton } from 'native-base';
import { PauseCircle, PlayCircle, Trash } from 'phosphor-react-native';
import { useEffect, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type NoteType = {
  id: string;
  text: string;
  isRecording: boolean;
  audioPath: string;
  date: string;
  title: string;
}

type Props = IPressableProps & {
  data: NoteType;
  onDelete: Function;
}

export function SavedRecAnotation({ data, onDelete, ...rest }: Props) {
  const navigation = useNavigation();
  const [sound, setSound] = useState<Sound>(new Audio.Sound());

  const [playPauseRecording, setPlayPauseRecording] = useState(false);
  const [control, setControl] = useState<any>({
    isBuffering: 0,
    durationMillis: 0,
    positionMillis: 0,
  });

  useEffect(() => {
    const status = {
      shouldPlay: false,
      isLooping: false,
    };

    sound.loadAsync({uri:data.audioPath}, status, true);
  }, []);

  useEffect(() => {
    return sound
      ? () => {
        sound.unloadAsync();
      } : undefined;
  }, [sound]);

  const deleteNote = async () => {
    await AsyncStorage.getItem("TESTE7").then((notes) => {
      let newNotes = JSON.parse(notes);
      newNotes.splice(newNotes.indexOf(newNotes.filter(function(obj){
        return obj.id === data.id;
      })[0]), 1);
      AsyncStorage.setItem("TESTE7", JSON.stringify(newNotes)).then((value) => {
        onDelete();
      });
    });
  }

  const onPlaybackStatusUpdate = status => {
    setControl(status);
  }

  const playPauseRecordingControl = sound => {
    if(playPauseRecording) {
      sound.pauseAsync();
    } else {
      
      sound.playAsync();
    }
    setPlayPauseRecording(!playPauseRecording);
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

  function formatDate() {
    const dateNow = new Date(Date.now());

    return `${dateNow.getDate()}/${dateNow.getUTCMonth()}/${dateNow.getFullYear()}`
  }

  return (
    <VStack style={styles.legenda} bg="#32206A">

      <View style={styles.row}>


        <IconButton
          icon={
            playPauseRecording ?
              <PauseCircle color="#FFFFFF" size={28} /> :
              <PlayCircle color="#FFFFFF" size={28} />
          }
          onPress={() => {
            sound.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
            if (control.positionMillis >= control.durationMillis) {
              sound.replayAsync();
              setPlayPauseRecording(true);
            } else {
              playPauseRecordingControl(sound);
            }
          }}
        />

        <VStack width={'250px'} alignItems='flex-end' marginLeft={'-20px'}>
          <VStack width={'250px'} alignItems='flex-start' marginRight={'-10px'}>
            <Text color="#FFFFFF" fontSize={'12px'} fontFamily={'robobold'}>
              {data.title}
            </Text>
          </VStack>

          <Slider
            style={styles.progressBar}
            value={control.positionMillis}
            minimumValue={0}
            maximumValue={control.durationMillis}
            thumbTintColor="#FFD369"
            minimumTrackTintColor="#FFD369"
            maximumTrackTintColor="#fff"
            onSlidingStart={v => {
              sound.pauseAsync();
            }}
            onSlidingComplete={v => {
              sound.setPositionAsync(v);
              sound.playAsync();
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
            onPress={deleteNote}
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

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
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