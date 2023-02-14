import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { Text, VStack, IPressableProps, HStack, IconButton } from 'native-base';
import { Trash } from 'phosphor-react-native';
import { TouchableOpacity } from 'react-native';
import { StyleSheet } from 'react-native';

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

export function SavedTextAnotation({ data, onDelete, ...rest }: Props) {
  const navigation = useNavigation();

  const deleteNote = async () => {
    await AsyncStorage.getItem("ALLSECTIONTEST1").then((notes) => {
      let newNotes = JSON.parse(notes);

      const indexSectionRemove = newNotes.indexOf(newNotes.filter(function(obj){return obj.name === 'teste';})[0]);
      const arrayRemove = newNotes[indexSectionRemove].values;
      const indexAnotation = arrayRemove.indexOf(arrayRemove.filter(function(obj){return obj.id === data.id;})[0]);
      arrayRemove.splice(indexAnotation, 1);
      newNotes[indexSectionRemove].values = arrayRemove;

      AsyncStorage.setItem("ALLSECTIONTEST1", JSON.stringify(newNotes)).then((value) => {
        onDelete();
      });
    });
  }

  const handleNewOrder = () => {
    navigation.goBack();
  }

  return (
    <TouchableOpacity onPress={handleNewOrder} >
      <VStack alignItems={'center'} paddingBottom={'12px'} >

        <VStack style={styles.legenda} bg="#32206A"

        >
          <HStack flexDirection={'row'}
            justifyContent={'space-between'}>

            <Text
              marginTop={5}
              marginLeft={5}
              color="#FFFFFF"
              fontSize={16}
              fontFamily={'robolight'}>
              {data.title}
            </Text>


            <VStack>

              <VStack marginLeft={5} style={styles.folha}>
                <IconButton
                  marginTop={-1}
                  icon={<Trash color="#FFFFFF" size={20} />}
                  onPress={deleteNote}
                />

              </VStack>

              <Text
                marginTop={2}
                marginLeft = {5}
                color="#FFFFFF"
                fontSize={9}
                fontFamily={'robolight'}>
                {data.date}
              </Text>
            </VStack>


          </HStack>

        </VStack>

      </VStack>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  imagens: {
    color: "#FFFFFF",
    width: 120,
    height: 110

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
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 210,
    borderTopLeftRadius: 150,
    borderTopRightRadius: 46,
    backgroundColor: "#2E888D",
  },
});