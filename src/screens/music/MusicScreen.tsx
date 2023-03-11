import { VStack, HStack, Text, ScrollView } from 'native-base';
import React, { useContext, useEffect, useState } from 'react';
import { FlatList, GestureResponderEvent, StyleSheet } from 'react-native';
import { CardMusic } from '../../components/CardMusic';
import { CardindividualMusic } from '../../components/CardindividualMusic';
import { Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { dataHome } from '../../model/Data';
import { dataindividualHome } from '../../model/Data';
import {translation} from '../../routes/utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LangContext } from '../../contexts/langProvider';

export function MusicScreen(props) {
  const navigation = useNavigation();
  const context:any = useContext(LangContext);

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
              {props.route.params.title}
            </Text>


            < Image style={styles.imageLogo} source={require('../../assets/images/moonalone.png')} />


          </HStack>

          <HStack marginBottom={10}>
            <FlatList
              data={props.route.params.sounds[0]}
              horizontal={true}
              keyExtractor={item => item.id}
              renderItem={({ item }) =>
                <CardindividualMusic
                  data={item}
                  listSongs={props.route.params.sounds[2]}
                ></CardindividualMusic>
              }
              contentContainerStyle={{ paddingBottom: 40 }}
            />

          </HStack>
          <HStack marginBottom={10}>
            <FlatList
              data={props.route.params.sounds[1]}
              horizontal={true}
              keyExtractor={item => item.id}
              renderItem={({ item }) =>
                <CardindividualMusic
                  data={item}
                  listSongs={props.route.params.sounds[2]}
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
