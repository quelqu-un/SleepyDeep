import { VStack, HStack, Text } from 'native-base';
import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { CardMusic } from '../../components/CardMusic';

export function Home() {
  let data = [[{
    id: '0',
    text: 'aqui é Gabriel o cara',
    recent: true
  },
  {
    id: '1',
    text: 'Laura enjoadinha de vdd',
    recent: true
  },
  {
    id: '2',
    text: 'Gabriel',
    recent: true
  },
  ],[
    {
      id: '3',
      text: 'Laura',
      recent: true
    },
    {
      id: '4',
      text: 'É a cara',
      recent: true
    },
    {
      id: '5',
      text: 'musica de trovão',
      recent: true
    },
  ]]

  return (
    <VStack flex={1} 
    bg="#251751" 
    alignItems={'center'} 
    justifyContent={'center'} >
      <Text style={styles.container}>_______HOME_______</Text>
      <Text style={styles.container}>Gabriel é o cara</Text>
      <Text style={styles.container}>Gabriel é enjoadinho</Text>
      <Text style={styles.container}>Gabriel é enjoadinho</Text>
      <Text style={styles.container}>Laura é a cara</Text>
      <Text style={styles.container} marginBottom={20}>_______HOME_______</Text>

      <HStack marginBottom={10}>

        <FlatList
          data={data[0]}
          horizontal={true}
          keyExtractor={item => item.id}
          renderItem={({ item }) => 
            <CardMusic
              data={item}
            ></CardMusic>
          }
          contentContainerStyle={{ paddingBottom: 100 }}
        />

      </HStack>

      <HStack marginBottom={1}>

        <FlatList
          data={data[1]}
          horizontal={true}
          keyExtractor={item => item.id}
          renderItem={({ item }) => 
            <CardMusic
              data={item}
            ></CardMusic>
          }
          contentContainerStyle={{ paddingBottom: 100 }}
        />

      </HStack>

      {/* <HStack marginBottom={10}>

        <CardMusic
          data={data[0][0]}
        ></CardMusic>

      </HStack>

      <HStack marginBottom={10}>

        <CardMusic
          data={data[0][0]}
        ></CardMusic>

      </HStack> */}

    </VStack>
  );
}

const styles = StyleSheet.create({
  container: {
    color: "#FFFFFF"
  },
});