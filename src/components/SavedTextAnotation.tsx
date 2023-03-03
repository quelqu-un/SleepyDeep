import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { Text, VStack, IPressableProps, HStack, IconButton, Modal, Spacer, Button, Input } from 'native-base';
import { Trash } from 'phosphor-react-native';
import { TouchableOpacity } from 'react-native';
import { StyleSheet } from 'react-native';
import { useContext, useEffect, useState } from 'react';
import {translation} from '../routes/utils'
import { LangContext } from '../contexts/langProvider';

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
  name: string;
  id: number;
}

export function SavedTextAnotation({ data, onDelete, name, id, ...rest }: Props) {
  const navigation = useNavigation();
  const [open, setOpen] = useState(false);
  const [openBack, setOpenBack] = useState(false);
  const [textSave, setTextSave] = useState("");
  const [placement, setPlacement] = useState(undefined);

  const context:any = useContext(LangContext);

  function handleNewNewOrder() {
    setOpenBack(true);
  }

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

  const TodaysDate = (date) => {

    if(context.language == 0) {
      let dateFormat = date.split("/");
      return `${dateFormat[1]}/${dateFormat[0]}/${dateFormat[2]}`
    } else if(context.language == 1) {
      return date
    }
  }

  const handleNewOrder = () => {
    navigation.navigate("anotationText", {
      id: id,
      name: name,
      title: data.title,
      text: data.text,
      idAnotation: data.id,
    });
  }

  return (
    <TouchableOpacity onPress={handleNewOrder} >
      <VStack alignItems={'center'} paddingBottom={'12px'} >

        <VStack style={styles.legenda} bg="#32206A">
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
                //  onPress={deleteNote}
                  onPress={handleNewNewOrder }
                />

              </VStack>

              <Text
                marginTop={2}
                marginLeft = {5}
                color="#FFFFFF"
                fontSize={9}
                fontFamily={'robolight'}>
                {TodaysDate(data.date)}
              </Text>
            </VStack>


          </HStack>

        </VStack>

        <Modal isOpen={openBack} onClose={() => setOpenBack(false)} safeAreaTop={true}>
        <Modal.Content maxWidth="350" {...styles[placement]} bg="#5C4EBC">
          <Modal.Header bg="#5C4EBC" borderColor={"#5C4EBC"}>
            <Text color="#FFFFFF" fontSize={"16px"} fontFamily={'robobold'}>
            {context.language == 0
                ? translation[20].English
                : context.language == 1
                ? translation[20].Portuguese
                : null}
            </Text>
          </Modal.Header>

          <Modal.Body>
            <Text color="#FFFFFF" fontSize={"14px"} fontFamily={'robomedium'}>
               {context.language == 0
                ? translation[21].English
                : context.language == 1
                ? translation[21].Portuguese
                : null}
            </Text>
          </Modal.Body>


          <Modal.Footer bg="#5C4EBC" borderColor={"#5C4EBC"}>
            <Button.Group width={'100%'}>
              <Button bg="#2F2570" width={'120px'} height={'40px'} onPress={() => {
                 setOpenBack(false);
              }}>
                <Text color="#FFFFFF" fontFamily={'robomedium'}>
                {context.language == 0
                ? translation[19].English
                : context.language == 1
                ? translation[19].Portuguese
                : null}
                </Text>
              </Button>
              <Spacer />
              <Button bg="#2F2570" width={'120px'} height={'40px'} onPress={() => {
                deleteNote()
                setOpenBack(false);
                // saveNote();
                // navigation.navigate('allAnotation');
              }}>
                <Text color="#FFFFFF" fontFamily={'robomedium'} 
                >
                  Ok
                </Text>
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
        </Modal>
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