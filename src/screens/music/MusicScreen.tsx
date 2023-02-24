import { VStack, HStack, Text, ScrollView } from 'native-base';
import React, { useEffect, useState } from 'react';
import { FlatList, GestureResponderEvent, StyleSheet } from 'react-native';
import { CardMusic } from '../../components/CardMusic';
import { CardindividualMusic } from '../../components/CardindividualMusic';
import { Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { dataHome } from '../../model/Data';
import { dataindividualHome } from '../../model/Data';
import {translation} from '../../routes/utils';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function MusicScreen() {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedLang, setSelectedLang] = useState(0);

  useEffect(() => {
    getLang();
  }, []);
  
  const getLang = async () => {
    setSelectedLang(parseInt(await AsyncStorage.getItem('LANG')));
  };

  function handleNewOrder() {
    navigation.navigate("home");
  }

  return (
    <VStack height={"100%"} bg="#180F34">
      <ScrollView>
        <VStack flex={1}>
          <HStack paddingTop={3}
            paddingX={4} style={styles.title} >
            <TouchableOpacity onPress={handleNewOrder}>
              <Image style={styles.imageLogo} source={require('../../assets/images/homeicon.png')} />
            </TouchableOpacity>
            <Text
              marginBottom={5}
              fontFamily={'robobold'}
              color={'#FFFFFF'}
              fontSize={19}>
              Chuva
            </Text>


            < Image style={styles.imageLogo} source={require('../../assets/images/moonalone.png')} />


          </HStack>

          <Text paddingX={5} marginTop={8} marginBottom={4} fontFamily={'medium'} style={styles.secondtitle} >
            alguma coisa
            </Text>

          <HStack marginBottom={10}>
            <FlatList
              data={dataindividualHome[0]}
              horizontal={true}
              keyExtractor={item => item.id}
              renderItem={({ item }) =>
                <CardindividualMusic
                  data={item}
                ></CardindividualMusic>
              }
              contentContainerStyle={{ paddingBottom: 40 }}
            />

          </HStack>
          <HStack marginBottom={10}>
            <FlatList
              data={dataindividualHome[1]}
              horizontal={true}
              keyExtractor={item => item.id}
              renderItem={({ item }) =>
                <CardindividualMusic
                  data={item}
                ></CardindividualMusic>
              }
              contentContainerStyle={{ paddingBottom: 40 }}
            />

          </HStack>

         
        
        </VStack>


      </ScrollView>
    </VStack>
  );
}

const styles = StyleSheet.create({
  title: {
    color: "#FFFFFF",
    flexDirection: "row",
    justifyContent: "space-between",

  },
  secondtitle: {
    color: "#FFFFFF",
    alignContent: "center",
    fontSize: 11,


  },
  imageLogo: {
    width: 35,
    height: 35,
    marginTop: -5,

  },
});
