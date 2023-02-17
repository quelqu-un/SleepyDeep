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
  recControl: Array<Object>;
  setRecControl: Function;
  name: string;
}

export function SavedRecAnotation({ data, onDelete, recControl, setRecControl, name, ...rest }: Props) {
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

  useEffect(() => {
    if(sound) {
      if(recControl[0] !== data.id && !(recControl[0] === -1) && playPauseRecording) {
        setPlayPauseRecording(false);
        sound.pauseAsync();
      }
    }

    if(control.didJustFinish) {
      setPlayPauseRecording(false);
      sound.setPositionAsync(0);
      sound.pauseAsync();
    }
  }, [control]); 

  const deleteNote = async () => {
    await AsyncStorage.getItem("ALLSECTIONTEST1").then((notes) => {
      let newNotes = JSON.parse(notes);

      const indexSectionRemove = newNotes.indexOf(newNotes.filter(function(obj){return obj.name === name;})[0]);
      const arrayRemove = newNotes[indexSectionRemove].values;
      const indexAnotation = arrayRemove.indexOf(arrayRemove.filter(function(obj){return obj.id === data.id;})[0]);
      arrayRemove.splice(indexAnotation, 1);
      newNotes[indexSectionRemove].values = arrayRemove;

      AsyncStorage.setItem("ALLSECTIONTEST1", JSON.stringify(newNotes)).then((value) => {
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
    setRecControl([data.id,!playPauseRecording]);
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

  return (
    <VStack alignItems={'center'} paddingBottom={'12px'} >
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
                setRecControl([data.id,!playPauseRecording]);
              } else {
                playPauseRecordingControl(sound);
              }
            }}
          />

          <VStack width={'250px'} alignItems='flex-end' marginLeft={'-20px'}>
            <VStack width={'250px'} alignItems='flex-start' marginRight={'-10px'}>
              <Text color="#FFFFFF" fontSize={'12px'} fontFamily={'robolight'}>
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

          <VStack marginTop = {-2}style={styles.folha}>

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
               {data.date}
            </Text>
          </VStack>

        </View>

      </VStack>
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

  },
  folha: {
    width: 54,
    height: 35,
   
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