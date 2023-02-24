import { VStack, HStack, Text,  ScrollView, IconButton } from 'native-base';
import React, { useState } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, SafeAreaView,} from 'react-native';
import { HomeCardAnotation } from '../../components/HomeCardAnotation';
import { CardMusic } from '../../components/CardMusic';
import { Image } from 'react-native';
import { Globe, ListBullets } from 'phosphor-react-native';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { dataHome } from '../../model/Data';
import { LanguageModal } from '../../model/LangaugeModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {translation} from '../../routes/utils';



export function HomeScreen() {
  const navigation = useNavigation();
  const [langModalVisible, setLangModalVisible] = useState(false);
  const [selectedLang, setSelectedLang] = useState(0);

  const saveSelectedLang = async index => {
    await AsyncStorage.setItem('LANG', index + '');
  };
  // function handleNewOrder() {
  //   navigation.navigate("allAnotation", {
  //     id: 1, 
  //     name: "Sonhos"
  //   });
  // }

  function handleNavigateToTextAnotation(id, name) {
    navigation.navigate("allAnotation", {
      id: id,
      name: name,
    });
  }

  function handleNewNewOrder() {
    navigation.navigate("musicplayer");
  }

  function handleDrawer() {
    navigation.dispatch(DrawerActions.openDrawer());
  }

  return (

    <SafeAreaView >

   
    <ScrollView 
      marginBottom={10}
    >
      <VStack flex={1}
        bg="#180F34" /*23154F */
      >
        <HStack marginTop={5} paddingX={2} style={styles.title} >
          <IconButton  marginTop={-4}
            icon={<ListBullets color="#FFFFFF" size={25} />}
            onPress={handleDrawer}
            
          />
          <HStack>
          <Text 
            marginTop ={-1}
            fontFamily="nuvem"
            color={'#FFFFFF'}
            fontSize={20}>
            SleepyDeep
          </Text>

          <TouchableOpacity  onPress={handleNewNewOrder}> 
            <Image   style={styles.imageLogo} source={require('../../assets/images/moon1.png')} />
          </TouchableOpacity>
          
          </HStack>
       
          <VStack marginTop = {-4} marginRight = {-10} alignItems={'center'}>
            <IconButton
              marginBottom={-3}
              icon={<Globe color="#FFFFFF" size={25} />}
              onPress={() => {
                setLangModalVisible(!langModalVisible);
              }}
            />
            <Text fontSize={10} color={'#FFFFFF'}>Len</Text>
          </VStack>

          <LanguageModal
              langModalVisible={langModalVisible}
              setLangModalVisible={setLangModalVisible}   
               onSelectLang={x => {
                setSelectedLang(x);
                saveSelectedLang(x);
              }} />
        </HStack>

        <Text paddingX={5} marginTop={8} marginBottom={4} fontFamily={'robomedium'} style={styles.secondtitle}>
        {selectedLang == 0
          ? translation[0].English
          : selectedLang == 1
          ? translation[0].Portuguese
          : null}
          </Text>
        <HStack marginBottom={10}>
          <FlatList
            data={dataHome[0]}
            horizontal={true}
            keyExtractor={item => item.id}
            renderItem={({ item }) =>
              <CardMusic
                data={item}
              ></CardMusic>
            }
            contentContainerStyle={{ paddingBottom: 40 }}
          />

        </HStack>
        
        <HStack >

          <FlatList
            data={dataHome[1]}
            horizontal={true}
            keyExtractor={item => item.id}
            renderItem={({ item }) =>
              <CardMusic
                data={item}
              ></CardMusic>
            }
            contentContainerStyle={{ paddingBottom: 80 }}
          />

        </HStack>
        
        <Text paddingX={5} marginBottom={3} fontFamily={'robomedium'}  style={styles.secondtitle} >
        {selectedLang == 0
          ? translation[1].English
          : selectedLang == 1
          ? translation[1].Portuguese
          : null}
          </Text>
        <HStack >

          <FlatList
            data={dataHome[2]}
            horizontal={true}
            keyExtractor={item => item.id}
            renderItem={({ item }) =>
           

              <CardMusic
                data={item}
              ></CardMusic>
              
            }
            contentContainerStyle={{ paddingBottom: 80 }}
          />

        </HStack>
        <Text paddingX={5} marginBottom={3} fontFamily={'robomedium'}  style={styles.secondtitle}>
        {selectedLang == 0
          ? translation[2].English
          : selectedLang == 1
          ? translation[2].Portuguese
          : null}
          </Text>
        <HStack marginBottom={10}>
          <FlatList
            data={dataHome[3]}
            horizontal={true}
            keyExtractor={item => item.id}
            renderItem={({ item }) =>

         
               
              <HomeCardAnotation
                cor = {"#32206A"}
                data={item}
                navId={item.id}
                navName={item.text}
               
              ></HomeCardAnotation>
             
            }
            contentContainerStyle={{ paddingBottom: 40 }}
          />
        </HStack>

      </VStack>


    </ScrollView>
    </SafeAreaView>
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
    fontSize: 11,
    
  },
  container: {
    
    color: "#FFFFFF",
  },
  imageLogo: {
    width: 20,
    height: 20,
    marginRight: -2,
    marginLeft: 5,

  },
  
});

export default HomeScreen;