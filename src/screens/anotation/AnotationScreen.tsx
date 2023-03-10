import { VStack, HStack, Text, ScrollView, IconButton, Modal, Input, Button, Spacer } from 'native-base';
import React, { useContext, useEffect, useState } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Image } from 'react-native';
import { ArrowLeft, PlusCircle } from 'phosphor-react-native';
import { useNavigation } from '@react-navigation/native';
import { CardAnotation } from '../../components/CardAnotation';
import { dataHome } from '../../model/Data';
import {translation} from '../../routes/utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LangContext } from '../../contexts/langProvider';

export function AnotationScreen() {
  const navigation = useNavigation();

  const [placement, setPlacement] = useState(undefined);
  const [open, setOpen] = useState(false);
  const [textSave, setTextSave] = useState("");
  const [sections, setSections] = useState([]);
  const [openBack, setOpenBack] = useState(false);
  const [placementBack, setPlacementBack] = useState(undefined);

  const context:any = useContext(LangContext);

  function handleNewOrder() {
    navigation.goBack();
  }

  function handleNavigateToTextAnotation(id, name) {
    navigation.navigate("allAnotation", {
      id: id,
      name: name,
    });
  }

  const onDelete = async () => {
    AsyncStorage.getItem("ALLSECTIONTEST1").then((noteValue) => {
      if (noteValue) {
        let noteJson = JSON.parse(noteValue);
        setSections(noteJson)
      }
    });
  }

  const saveSection = async () => {
    //ALLSECTIONTEST1
    await AsyncStorage.getItem("TESTECOUNT3").then((count) => {
      const countJson = count ? JSON.parse(count) : 0;
      AsyncStorage.getItem("ALLSECTIONTEST1").then((noteValue) => {
        let noteJson = noteValue ? JSON.parse(noteValue) : [];

        const sectionName = noteJson.map(item => item.name);

        noteJson.push({
          id: countJson,
          name: textSave,
          values: []
        });

        if (sectionName.indexOf(textSave) === -1) {
          AsyncStorage.setItem("ALLSECTIONTEST1", JSON.stringify(noteJson)).then(() => {
            AsyncStorage.getItem("ALLSECTIONTEST1")
              .then((noteValue) => {
                setSections(JSON.parse(noteValue));
                AsyncStorage.setItem("TESTECOUNT3", JSON.stringify(countJson + 1));
              });
          });
        } else {
          setOpenBack(true);
        }

      });
    });

  }

  useEffect(() => {
    AsyncStorage.getItem("ALLSECTIONTEST1").then((noteValue) => {
      if (noteValue) {
        let noteJson = JSON.parse(noteValue);
        setSections(noteJson)
      }
    });
  }, [sections]);

  useEffect(() => {
    AsyncStorage.getItem("ALLSECTIONTEST1").then((noteValue) => {
      if (!(noteValue === undefined)) {
        setSections(JSON.parse(noteValue));
      } else {
        AsyncStorage.getItem("TESTECOUNT3").then((count) => {
          const countJson = count ? JSON.parse(count) : 0;

          const newArray = [
            {
              id: countJson,
              name: "Sonhos",
              values: []
            },
            {
              id: countJson + 1,
              name: "Estresse do dia",
              values: []
            },
            {
              id: countJson + 2,
              name: "Metas do dia",
              values: []
            },
          ];

          AsyncStorage.setItem("ALLSECTIONTEST1", JSON.stringify(newArray)).then(() => {
            AsyncStorage.getItem("ALLSECTIONTEST1")
              .then((noteValue) => {
                setSections(JSON.parse(noteValue));
                AsyncStorage.setItem("TESTECOUNT3", JSON.stringify(countJson + 3));
              });
          });

        });
      }
    });
  }, []);

  return (
    <VStack
      height={'100%'}>
      <VStack flex={1}
        bg="#180F34"
      >

        <HStack marginBottom={8} paddingTop={4} paddingX={4} style={styles.title}>

          <TouchableOpacity onPress={handleNewOrder}>
            <IconButton
              marginTop={-2}
              icon={<ArrowLeft color="#FFFFFF" size={25} />}
              onPress={handleNewOrder}
            />
          </TouchableOpacity>


          <HStack >
            <Text
              marginTop={-1}
              fontFamily="robobold"
              textAlign="center"
              color={'#FFFFFF'}
              fontSize={18}>
                {context.language == 0
                ? translation[4].English
                : context.language == 1
                ? translation[4].Portuguese
                : null}
            </Text>
            <Image style={styles.imageLogo} source={require('../../assets/images/moon.png')} />
          </HStack>

          <IconButton
            marginTop={-3}
            marginRight={-2}
            icon={<PlusCircle color="#FFFFFF" size={28} />}
            onPress={() => { setOpen(true) }}
          />

        </HStack>

        <FlatList
          data={sections}
          keyExtractor={item => item.id}
          renderItem={({ item, index }) =>
            <View key={item.id}>


              <VStack marginBottom={5}
                alignSelf={'center'} justifyContent={'center'}
              >

                <TouchableOpacity onPress={() => {
                  handleNavigateToTextAnotation(item.id, item.name);
                }}>
                  {
                    index < 3 ?
                    <Text
                    fontFamily={'robolight'}
                    marginBottom={3}
                    style={styles.secondtitle}>
                    {context.language == 0
                    ? dataHome[3][index].textEn
                    : context.language == 1
                    ? dataHome[3][index].textBr
                    : null}
                  </Text> : 
                  <Text
                  fontFamily={'robolight'}
                  marginBottom={3}
                  style={styles.secondtitle}>
                    {item.name}
                </Text>
                  }
                  
                </TouchableOpacity>

                <CardAnotation
                  cor={"#2E888D"}
                  name={context.language == 0
                    ? "All"
                    : context.language == 1
                    ? "Todas"
                    : null}
                  onDelete={onDelete}
                  navId={item.id}
                  navName={item.name}
                  value={item.values}
                ></CardAnotation>

              </VStack>
            </View>
          }
          contentContainerStyle={{ paddingBottom: 40 }}
        />

      </VStack>

      <Modal isOpen={open} onClose={() => setOpen(false)} safeAreaTop={true}>
        <Modal.Content maxWidth="350" {...styles[placement]} bg="#5C4EBC">
          <Modal.Header bg="#5C4EBC" borderColor={"#5C4EBC"}>
            <Text color="#FFFFFF" fontSize={"16px"} fontFamily={'robobold'}>
            {context.language == 0
              ? translation[16].English
              : context.language == 1
              ? translation[16].Portuguese
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
              placeholder="new_section_0001"
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
                  {context.language == 0
                  ? "Cancel"
                  : context.language == 1
                  ? "Cancelar"
                  : null}
                </Text>
              </Button>
              <Spacer />
              <Button bg="#2F2570" width={'120px'} height={'40px'} onPress={() => {
                setOpen(false);
                saveSection();
                // saveNote();
                // navigation.navigate('allAnotation');
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
            {context.language == 0
              ? translation[14].English
              : context.language == 1
              ? translation[14].Portuguese
              : null}
            </Text>
          </Modal.Header>

          <Modal.Body>
            <Text color="#FFFFFF" fontSize={"14px"} fontFamily={'robomedium'}>
            {context.language == 0
              ? translation[17].English
              : context.language == 1
              ? translation[17].Portuguese
              : null}
            </Text>
          </Modal.Body>

          <Modal.Footer bg="#5C4EBC" borderColor={"#5C4EBC"}>
            <Button.Group width={'100%'}>
              <Spacer />
              <Button bg="#2F2570" width={'120px'} height={'40px'} onPress={() => {
                setOpenBack(false);
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
  title: {
    color: "#FFFFFF",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  secondtitle: {
    color: "#FFFFFF",
    alignContent: "center",
    fontSize: 12,

  },
  imageLogo: {
    width: 18,
    height: 18,
    marginRight: -2,
    marginLeft: 5,

  },
  imageLogoHome: {
    width: 35,
    height: 35,
    marginTop: -8,

  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },

});
