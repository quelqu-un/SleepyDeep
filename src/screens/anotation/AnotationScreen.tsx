import { VStack, HStack, Text, ScrollView, IconButton, Modal, Input, Button, Spacer } from 'native-base';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Image } from 'react-native';
import { ArrowLeft, PlusCircle } from 'phosphor-react-native';
import { useNavigation } from '@react-navigation/native';
import { CardAnotation } from '../../components/CardAnotation';
import { dataAnotationScreen } from '../../model/Data';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function AnotationScreen() {
  const navigation = useNavigation();

  const [placement, setPlacement] = useState(undefined);
  const [open, setOpen] = useState(false);
  const [textSave, setTextSave] = useState("");
  const [sections, setSections] = useState([]);

  function handleNewOrder() {
    navigation.goBack();
  }

  const saveSection = async () => {
    //ALLSECTIONTEST1
    await AsyncStorage.getItem("TESTECOUNT3").then((count) => {
      const countJson = count ? JSON.parse(count) : 0;
      AsyncStorage.getItem("ALLSECTIONTEST1").then((noteValue) => {
          let noteJson = noteValue ? JSON.parse(noteValue) : [];
  
          noteJson.push({
            id: countJson,
            name: textSave,
            values: [
              {
                text: 'oi'
              }
            ]
          });
  
          AsyncStorage.setItem("ALLSECTIONTEST1", JSON.stringify(noteJson)).then(() => {
            AsyncStorage.getItem("ALLSECTIONTEST1")
            .then((noteValue) => {
              setSections(JSON.parse(noteValue));
              AsyncStorage.setItem("TESTECOUNT3", JSON.stringify(countJson + 1));
            });
          });
      });
    });

  }

  useEffect(() => {
    AsyncStorage.getItem("ALLSECTIONTEST1").then((noteValue) => {
      let noteJson = noteValue ? JSON.parse(noteValue) : [];
      setSections(noteJson)
    });
  }, [sections])

  return (
    <VStack 
      height={'100%'}>
      <VStack flex={1}
        bg="#180F34"
      >

        <HStack paddingTop={5} paddingX={4} style={styles.title}     >

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
              Anotação
            </Text>
            <Image style={styles.imageLogo} source={require('../../assets/images/moon.png')} />
          </HStack>

          <IconButton
            marginTop={-3}
            marginRight={-2}
            icon={<PlusCircle color="#FFFFFF" size={28} />}
            onPress={() => { setOpen(true)}}
          />

        </HStack>

        <FlatList
            data={sections}
            keyExtractor={item => item.id}
            renderItem={({ item }) => 
            <View  key={item.id}>
              <TouchableOpacity onPress={handleNewOrder}>
                <Text 
                paddingX={5} 
                fontFamily={'robolight'} 
                marginBottom={3} 
                style={styles.secondtitle}>
                  {item.name}
                </Text>
              </TouchableOpacity>

              <HStack marginBottom={10}>

                <CardAnotation
                  cor={"#5C4EBC"}
                  name={'Recentes'}
                  value={item.values}
                ></CardAnotation>

                <CardAnotation
                  cor={"#5C4EBC"}
                  name={'Todas'}
                  value={item.values}
                ></CardAnotation>

              </HStack>
            </View>
            }
            contentContainerStyle={{ paddingBottom: 40 }}
          />

      </VStack>

      <Modal isOpen={open} onClose={() => setOpen(false)} safeAreaTop={true}>
        <Modal.Content maxWidth="350" {...styles[placement]} bg="#5C4EBC">
          <Modal.Header bg="#5C4EBC" borderColor={"#5C4EBC"}>
            <Text color="#FFFFFF" fontSize={"16px"} fontFamily={'robobold'}>
              Digite o nome da seção
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
                  Cancel
                </Text>
              </Button>
              <Spacer/>
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
