import { VStack, HStack, Text, ScrollView } from 'native-base';
import React from 'react';
import { FlatList, GestureResponderEvent, StyleSheet } from 'react-native';
import { CardMusic } from '../../components/CardMusic';
import { Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { dataHome } from '../../model/Data';

export function MusicScreen() {
  const navigation = useNavigation();

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

          <Text paddingX={5} marginTop={8} marginBottom={4} fontFamily={'medium'} style={styles.secondtitle} >Músicas</Text>

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
