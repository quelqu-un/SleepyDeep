import { VStack, HStack, Text,  ScrollView, IconButton } from 'native-base';
import React from 'react';
import { FlatList, GestureResponderEvent, StyleSheet } from 'react-native';
import { CardAnotation } from '../../components/CardAnotation';
import { CardMusic } from '../../components/CardMusic';
import { Image,TouchableOpacity } from 'react-native';
import { Globe } from 'phosphor-react-native';
import { useNavigation } from '@react-navigation/native';

export function MusicScreen() {
  let data = [[{
    id: '0',
    text: 'Ouvidos recentes',
    recent: true
  },
  {
    id: '1',
    text: 'Chuva Forte',
    recent: true
  },
  {
    id: '2',
    text: 'Música Instrumental',
    recent: true
  },
  ], [
    {
      id: '3',
      text: 'Ondas Alphas',
      recent: true
    },
    {
      id: '4',
      text: 'Sons da Natureza',
      recent: true
    },
    {
      id: '5',
      text: 'ASMR',
      recent: true
    },
  ], [
    {
      id: '6',
      text: 'História 1',
      recent: true
    },
    {
      id: '7',
      text: 'História 2',
      recent: true
    },
    {
      id: '8',
      text: 'História 3',
      recent: true
    },
  ], [
    {
      id: '0',
      text: 'O que eu sonhei hoje',
      recent: true
    },
    {
      id: '1',
      text: 'Metas do dia',
      recent: true
    },
    {
      id: '2',
      text: 'Estresse do dia',
      recent: true
    },
  ],

  ];

  const navigation = useNavigation();

  function handleNewOrder() {
    navigation.navigate("home");
  }

    function onPress(event: GestureResponderEvent): void {
        throw new Error('Function not implemented.');
    }

  return (
    <ScrollView /*_contentContainerStyle={{
      
      h: "100%",
      w: "100%"
    }*/
      marginBottom={10}
    >
      <VStack flex={1}
        bg="#180F34" /*23154F */
      >
        <HStack marginTop={10} paddingX={4} style={styles.title} >
        <TouchableOpacity  onPress={handleNewOrder}>
          <Image   style={styles.imageLogo} source={require('../../assets/images/homeicon.png')} />
          </TouchableOpacity>
          <Text
                 marginBottom={5}
            fontFamily={'bold'} 
           
            color={'#FFFFFF'}
            fontSize={22}>
            Chuva
          </Text>
          
        
          < Image   style={styles.imageLogo} source={require('../../assets/images/moonalone.png')} />
      
          
        </HStack>

        <Text paddingX={5} marginTop={8} marginBottom={4} fontFamily={'medium'} style={styles.secondtitle} >Músicas</Text>
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
            contentContainerStyle={{ paddingBottom: 40 }}
          />

        </HStack>
        
        <HStack >

          <FlatList
            data={data[1]}
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
  data={data[1]}
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
  data={data[1]}
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
    width: 40,
    height: 40,

  },
});
